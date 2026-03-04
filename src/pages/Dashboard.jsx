import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { CheckCircle2, Clock, Play, PauseCircle, XCircle } from 'lucide-react';
import { useUserStats } from '../hooks/useUserStats';
import { formatNumber } from '../utils/formatters';
import { getSeasonOrder } from '../utils/seasonHelpers';
import { PanelGrid } from '../components/layout/PanelGrid';
import { KpiCard } from '../components/cards/KpiCard';
import { Skeleton } from '../components/layout/Skeleton';
import { EmptyState } from '../components/layout/EmptyState';
import { useTheme } from '../hooks/useTheme'; // <--- Importamos el hook

const STATUS_CONFIG = {
  completed: { icon: CheckCircle2, color: 'text-[#22C55E]', hex: '#22C55E' },
  plan_to_watch: { icon: Clock, color: 'text-[#3B82F6]', hex: '#3B82F6' },
  watching: { icon: Play, color: 'text-[#06B6D4]', hex: '#06B6D4' },
  on_hold: { icon: PauseCircle, color: 'text-[#EAB308]', hex: '#EAB308' },
  dropped: { icon: XCircle, color: 'text-[#EF4444]', hex: '#EF4444' }
};

export const Dashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isDark = useTheme(); // <--- Detectamos el tema actual en milisegundos
  const { data: animeList, isLoading, isError } = useUserStats();

  const stats = useMemo(() => {
    if (!animeList || animeList.length === 0) return null;

    let totalEpisodes = 0;
    let totalScore = 0;
    let scoredCount = 0;
    const genreFrequencies = {};
    const studioFrequencies = {};
    const statusCounts = { completed: 0, plan_to_watch: 0, watching: 0, on_hold: 0, dropped: 0 };
    const seasonDataMap = new Map();

    animeList.forEach(({ node }) => {
      if (statusCounts[node.my_list_status] !== undefined) {
        statusCounts[node.my_list_status]++;
      }

      totalEpisodes += node.num_episodes || 0;
      if (node.mean > 0 && node.my_list_status === 'completed') {
        totalScore += node.mean;
        scoredCount++;
      }

      if (node.my_list_status === 'completed' || node.my_list_status === 'watching') {
        node.genres?.forEach(g => genreFrequencies[g.name] = (genreFrequencies[g.name] || 0) + 1);
        node.studios?.forEach(s => studioFrequencies[s.name] = (studioFrequencies[s.name] || 0) + 1);
      }

      if (node.my_list_status === 'completed' && node.start_season) {
        const seasonKey = `${node.start_season.year} ${t(`seasons.${node.start_season.season}`)}`;
        const rawKey = `${node.start_season.year}-${node.start_season.season}`;
        
        if (!seasonDataMap.has(rawKey)) {
          seasonDataMap.set(rawKey, { name: seasonKey, count: 0, year: node.start_season.year, season: node.start_season.season });
        }
        seasonDataMap.get(rawKey).count++;
      }
    });

    const topGenre = Object.entries(genreFrequencies).sort((a, b) => b[1] - a[1])[0]?.[0] || t('common.na');
    const topStudio = Object.entries(studioFrequencies).sort((a, b) => b[1] - a[1])[0]?.[0] || t('common.na');
    
    let seasonsArray = Array.from(seasonDataMap.values()).sort((a, b) => {
      if (a.year !== b.year) return a.year - b.year;
      return getSeasonOrder(a.season) - getSeasonOrder(b.season);
    });

    const counts = seasonsArray.map(s => s.count);
    const maxCount = Math.max(...counts, 0);
    const minCount = Math.min(...counts.filter(c => c > 0), Infinity);
    const avgSeasonCount = counts.length ? counts.reduce((a, b) => a + b, 0) / counts.length : 0;

    seasonsArray = seasonsArray.map(s => ({
      ...s,
      fill: s.count === maxCount ? 'url(#colorMax)' : s.count === minCount ? 'url(#colorMin)' : (isDark ? '#2D2D4E' : '#CBD5E1')
    }));

    return {
      total: animeList.length,
      statusCounts,
      totalEpisodes,
      avgScore: scoredCount ? (totalScore / scoredCount).toFixed(2) : 0,
      topGenre,
      topStudio,
      totalDays: (totalEpisodes * 24 / 60 / 24).toFixed(1), 
      seasonsArray,
      avgSeasonCount
    };
  }, [animeList, t, isDark]); // isDark añadido a dependencias para redibujar barras neutras

  if (isLoading) {
    return (
      <PanelGrid>
        {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-[130px] w-full col-span-12 sm:col-span-6 lg:col-span-2" />)}
        <Skeleton className="h-[360px] w-full col-span-12 lg:col-span-8" />
        <Skeleton className="h-[360px] w-full col-span-12 lg:col-span-4" />
        <Skeleton className="h-[420px] w-full col-span-12" />
      </PanelGrid>
    );
  }

  if (isError || !stats) return <PanelGrid><EmptyState /></PanelGrid>;

  const pieData = Object.keys(stats.statusCounts)
    .filter(key => stats.statusCounts[key] > 0)
    .map(key => ({
      name: t(`status.${key}`),
      value: stats.statusCounts[key],
      color: STATUS_CONFIG[key].hex,
      rawKey: key
    }));

  // Variables calculadas en base al tema
  const gridStroke = isDark ? "#1E1E2E" : "#E2E8F0";
  const textFill = isDark ? "#94A3B8" : "#64748B";
  const tooltipBg = isDark ? "#1E1E2E" : "#FFFFFF";
  const tooltipText = isDark ? "#F1F5F9" : "#0F172A";

  return (
    <PanelGrid>
      <div className="col-span-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {Object.keys(STATUS_CONFIG).map((status) => (
          <KpiCard
            key={status}
            title={t(`status.${status}`)}
            value={formatNumber(stats.statusCounts[status])}
            percentage={`${((stats.statusCounts[status] / stats.total) * 100).toFixed(1)}%`}
            Icon={STATUS_CONFIG[status].icon}
            iconColor={STATUS_CONFIG[status].color}
          />
        ))}
      </div>

      <div className="col-span-12 flex flex-col gap-6 lg:col-span-8 lg:flex-row rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-[#1E1E2E] dark:bg-[#12122A]">
        <div className="h-[360px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%" cy="50%" innerRadius={90} outerRadius={120}
                paddingAngle={5} dataKey="value" stroke="none"
                onClick={(data) => navigate(data.rawKey === 'completed' ? '/scores' : '/')}
                style={{ cursor: 'pointer' }}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: tooltipBg, border: 'none', borderRadius: '8px', color: tooltipText, boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                itemStyle={{ color: tooltipText }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="col-span-12 flex flex-col justify-center gap-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-[#1E1E2E] dark:bg-[#12122A] lg:col-span-4 h-[360px] sm:h-auto">
        <div className="flex justify-between border-b border-slate-100 pb-3 transition-colors duration-300 dark:border-[#1E1E2E]">
          <span className="text-slate-500 transition-colors duration-300 dark:text-[#94A3B8]">{t('kpi.total_episodes')}</span>
          <span className="font-bold text-slate-800 transition-colors duration-300 dark:text-[#F1F5F9]">{formatNumber(stats.totalEpisodes)}</span>
        </div>
        <div className="flex justify-between border-b border-slate-100 pb-3 transition-colors duration-300 dark:border-[#1E1E2E]">
          <span className="text-slate-500 transition-colors duration-300 dark:text-[#94A3B8]">{t('kpi.avg_score')}</span>
          <span className="font-bold text-slate-800 transition-colors duration-300 dark:text-[#F1F5F9]">{stats.avgScore}</span>
        </div>
        <div className="flex justify-between border-b border-slate-100 pb-3 transition-colors duration-300 dark:border-[#1E1E2E]">
          <span className="text-slate-500 transition-colors duration-300 dark:text-[#94A3B8]">{t('kpi.top_genre')}</span>
          <span className="font-bold text-[#06B6D4]">{stats.topGenre}</span>
        </div>
        <div className="flex justify-between border-b border-slate-100 pb-3 transition-colors duration-300 dark:border-[#1E1E2E]">
          <span className="text-slate-500 transition-colors duration-300 dark:text-[#94A3B8]">{t('kpi.top_studio')}</span>
          <span className="font-bold text-[#7C3AED]">{stats.topStudio}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500 transition-colors duration-300 dark:text-[#94A3B8]">{t('kpi.total_days')}</span>
          <span className="font-bold text-slate-800 transition-colors duration-300 dark:text-[#F1F5F9]">{stats.totalDays}</span>
        </div>
      </div>

      <div className="col-span-12 rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-[#1E1E2E] dark:bg-[#12122A] h-[420px]">
        <h3 className="mb-4 text-lg font-bold text-slate-800 transition-colors duration-300 dark:text-[#F1F5F9]">{t('nav.seasons')}</h3>
        <ResponsiveContainer width="100%" height="90%">
          <BarChart data={stats.seasonsArray} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
            <defs>
              <linearGradient id="colorMax" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#7C3AED" />
                <stop offset="100%" stopColor="#A855F7" />
              </linearGradient>
              <linearGradient id="colorMin" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#F97316" />
                <stop offset="100%" stopColor="#FB923C" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} horizontal={false} />
            <XAxis type="number" stroke={textFill} />
            <YAxis dataKey="name" type="category" stroke={textFill} width={80} tick={{ fontSize: 12 }} />
            <Tooltip 
              cursor={{ fill: isDark ? '#1A1A2E' : '#F8FAFC' }}
              contentStyle={{ backgroundColor: tooltipBg, border: 'none', borderRadius: '8px', color: tooltipText, boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              formatter={(value) => [value, t('charts.animes')]}
            />
            <ReferenceLine x={stats.avgSeasonCount} stroke="#06B6D4" strokeDasharray="3 3" label={{ position: 'top', value: t('charts.average'), fill: '#06B6D4', fontSize: 12 }} />
            <Bar dataKey="count" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </PanelGrid>
  );
};