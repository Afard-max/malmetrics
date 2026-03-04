import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { Filter, Info } from 'lucide-react';
import { useUserStats } from '../hooks/useUserStats';
import { PanelGrid } from '../components/layout/PanelGrid';
import { Skeleton } from '../components/layout/Skeleton';
import { EmptyState } from '../components/layout/EmptyState';
import { useTheme } from '../hooks/useTheme';

const calculateStats = (scores) => {
  if (!scores || scores.length === 0) return { mean: 0, median: 0, mode: 0, std_dev: 0, min: 0, max: 0 };
  const sum = scores.reduce((a, b) => a + b, 0);
  const mean = sum / scores.length;
  const sorted = [...scores].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  const median = sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
  const counts = {};
  let maxFreq = 0, mode = sorted[0];
  sorted.forEach(val => {
    counts[val] = (counts[val] || 0) + 1;
    if (counts[val] > maxFreq) { maxFreq = counts[val]; mode = val; }
  });
  const variance = scores.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / scores.length;
  return { mean: mean.toFixed(2), median, mode, std_dev: Math.sqrt(variance).toFixed(2), min: sorted[0], max: sorted[sorted.length - 1] };
};

export const ScoresPanel = () => {
  const { t } = useTranslation();
  const isDark = useTheme();
  const { data: animeList, isLoading, isError } = useUserStats();
  const [activeFilter, setActiveFilter] = useState('all');
  const [isLogScale, setIsLogScale] = useState(false);

  const { chartData, tableStats } = useMemo(() => {
    if (!animeList) return { chartData: [], tableStats: {} };

    const scoresAll = [], scoresCompleted = [], scoresWatching = [];

    animeList.forEach(({ node }) => {
      const score = node.user_score || 0;
      if (score > 0) {
        scoresAll.push(score);
        if (node.my_list_status === 'completed') scoresCompleted.push(score);
        if (node.my_list_status === 'watching') scoresWatching.push(score);
      }
    });

    const tableStats = {
      completed: calculateStats(scoresCompleted),
      watching: calculateStats(scoresWatching),
      all: calculateStats(scoresAll)
    };

    let activeScores = scoresAll;
    if (activeFilter === 'completed_only') activeScores = scoresCompleted;
    if (activeFilter === 'watching_only') activeScores = scoresWatching;

    const frequencies = Array(10).fill(0);
    activeScores.forEach(score => {
      const bucket = Math.round(score);
      if (bucket >= 1 && bucket <= 10) frequencies[bucket - 1]++;
    });

    const localMaxCount = Math.max(...frequencies, 0);

    const chartData = frequencies.map((count, index) => {
      const scoreValue = index + 1;
      let fillId = 'color-1-4';
      if (scoreValue >= 5 && scoreValue <= 6) fillId = 'color-5-6';
      if (scoreValue >= 7 && scoreValue <= 8) fillId = 'color-7-8';
      if (scoreValue >= 9 && scoreValue <= 10) fillId = 'color-9-10';
      return { score: scoreValue, count, logCount: count > 0 ? Math.log10(count + 1) : 0, fillId, isMode: count === localMaxCount && count > 0 };
    });

    return { chartData, tableStats };
  }, [animeList, activeFilter]);

  if (isLoading) return <PanelGrid><Skeleton className="h-[500px] w-full col-span-12" /><Skeleton className="h-[300px] w-full col-span-12" /></PanelGrid>;
  if (isError || chartData.length === 0) return <PanelGrid><EmptyState /></PanelGrid>;

  // Variables calculadas en base al tema
  const gridStroke = isDark ? "#1E1E2E" : "#E2E8F0";
  const textFill = isDark ? "#94A3B8" : "#64748B";
  const tooltipBg = isDark ? "#1E1E2E" : "#FFFFFF";
  const tooltipBorder = isDark ? "#2D2D4E" : "#E2E8F0";
  const tooltipText = isDark ? "#F1F5F9" : "#0F172A";
  const cursorFill = isDark ? "#1A1A2E" : "#F8FAFC";
  const labelBg = isDark ? "#1A1A2E" : "#F8FAFC";

  const renderCustomLabel = (props) => {
    const { x, y, width, isMode } = props;
    if (!isMode) return null;
    return (
      <g>
        <rect x={x + width / 2 - 50} y={y - 30} width="100" height="24" rx="12" fill={labelBg} stroke="#06B6D4" strokeWidth="1" />
        <text x={x + width / 2} y={y - 14} fill="#06B6D4" textAnchor="middle" fontSize="11" fontWeight="bold">{t('charts.most_frequent')}</text>
      </g>
    );
  };

  return (
    <PanelGrid>
      <div className="col-span-12 flex flex-col rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-[#1E1E2E] dark:bg-[#12122A]">
        <div className="mb-6 flex flex-col gap-4 border-b border-slate-100 pb-4 transition-colors duration-300 dark:border-[#1E1E2E] sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Filter size={20} className="text-[#06B6D4]" />
            <select 
              value={activeFilter} 
              onChange={(e) => setActiveFilter(e.target.value)} 
              className="rounded border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-800 transition-colors duration-300 focus:border-[#06B6D4] focus:outline-none dark:border-[#1E1E2E] dark:bg-[#0D0D1A] dark:text-[#F1F5F9]"
            >
              <option value="all">{t('filters.all')}</option>
              <option value="completed_only">{t('filters.completed_only')}</option>
              <option value="watching_only">{t('filters.watching_only')}</option>
            </select>
          </div>
          <div className="flex rounded-lg bg-slate-100 p-1 transition-colors duration-300 dark:bg-[#0D0D1A]">
            <button 
              onClick={() => setIsLogScale(false)} 
              className={`rounded-md px-4 py-1.5 text-sm font-medium transition-all ${!isLogScale ? 'bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white shadow-sm' : 'text-slate-500 hover:text-slate-800 dark:text-[#94A3B8] dark:hover:text-[#F1F5F9]'}`}
            >
              {t('charts.linear_scale')}
            </button>
            <button 
              onClick={() => setIsLogScale(true)} 
              className={`rounded-md px-4 py-1.5 text-sm font-medium transition-all ${isLogScale ? 'bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white shadow-sm' : 'text-slate-500 hover:text-slate-800 dark:text-[#94A3B8] dark:hover:text-[#F1F5F9]'}`}
            >
              {t('charts.log_scale')}
            </button>
          </div>
        </div>

        <div className="relative h-[400px] w-full overflow-hidden">
          {isLogScale && (
            <div className="absolute right-4 top-0 z-10 flex items-center gap-1 text-xs text-slate-500 transition-colors duration-300 dark:text-[#94A3B8]">
              <Info size={14} />{t('charts.log_scale_note')}
            </div>
          )}
          <AnimatePresence mode="wait">
            <motion.div key={isLogScale ? 'log' : 'linear'} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="h-full w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 40, right: 10, left: 0, bottom: 20 }}>
                  <defs>
                    <linearGradient id="color-1-4" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#EF4444" /><stop offset="100%" stopColor="#F87171" /></linearGradient>
                    <linearGradient id="color-5-6" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#EAB308" /><stop offset="100%" stopColor="#FDE047" /></linearGradient>
                    <linearGradient id="color-7-8" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#22D3EE" /><stop offset="100%" stopColor="#67E8F9" /></linearGradient>
                    <linearGradient id="color-9-10" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#22C55E" /><stop offset="100%" stopColor="#86EFAC" /></linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} vertical={false} />
                  <XAxis dataKey="score" stroke={textFill} tickLine={false} axisLine={false} />
                  <YAxis stroke={textFill} tickLine={false} axisLine={false} tickFormatter={(val) => isLogScale ? val.toFixed(1) : val} />
                  
                  <Tooltip 
                    cursor={{ fill: cursorFill }}
                    contentStyle={{ backgroundColor: tooltipBg, border: `1px solid ${tooltipBorder}`, borderRadius: '8px', color: tooltipText, boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    itemStyle={{ color: tooltipText }}
                    formatter={(value, name, props) => [props.payload.count, t('charts.quantity')]}
                    labelFormatter={(label) => `${t('charts.score')}: ${label}`}
                  />
                  
                  <Bar dataKey={isLogScale ? "logCount" : "count"} radius={[4, 4, 0, 0]}>
                    {chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={`url(#${entry.fillId})`} />)}
                    <LabelList dataKey={isLogScale ? "logCount" : "count"} content={(props) => renderCustomLabel({ ...props, isMode: chartData[props.index].isMode })} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="col-span-12 overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm transition-colors duration-300 dark:border-[#1E1E2E] dark:bg-[#12122A]">
        <table className="w-full text-left text-sm text-slate-800 transition-colors duration-300 dark:text-[#F1F5F9]">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500 transition-colors duration-300 dark:bg-[#0D0D1A] dark:text-[#94A3B8]">
            <tr>
              <th className="px-6 py-4 font-medium">{t('nav.overview')} / {t('stats.metrics')}</th>
              <th className="px-6 py-4 font-medium">{t('filters.completed_only')}</th>
              <th className="px-6 py-4 font-medium">{t('filters.watching_only')}</th>
              <th className="px-6 py-4 font-medium">{t('filters.all')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 transition-colors duration-300 dark:divide-[#1E1E2E]">
            {Object.keys(tableStats.all).map((statKey) => (
              <tr key={statKey} className="transition-colors duration-300 hover:bg-slate-50 dark:hover:bg-[#1A1A2E]">
                <td className="px-6 py-4 font-medium text-[#06B6D4]">{t(`stats.${statKey}`)}</td>
                <td className="px-6 py-4">{tableStats.completed[statKey]}</td>
                <td className="px-6 py-4">{tableStats.watching[statKey]}</td>
                <td className="px-6 py-4">{tableStats.all[statKey]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PanelGrid>
  );
};