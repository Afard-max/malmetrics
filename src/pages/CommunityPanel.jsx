import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Cell } from 'recharts';
import { Trophy, TrendingUp, Users } from 'lucide-react';
import { useUserStats } from '../hooks/useUserStats';
import { useTopAiring, useTopAllTime } from '../hooks/useRankings';
import { truncateText, formatNumber } from '../utils/formatters';
import { PanelGrid } from '../components/layout/PanelGrid';
import { Skeleton } from '../components/layout/Skeleton';
import { EmptyState } from '../components/layout/EmptyState';
import { useTheme } from '../hooks/useTheme';

export const CommunityPanel = () => {
  const { t } = useTranslation();
  const isDark = useTheme();
  
  const { data: animeList, isLoading: isLoadingUser } = useUserStats();
  const { data: topAiring, isLoading: isLoadingAiring } = useTopAiring();
  const { data: topAllTime, isLoading: isLoadingAllTime } = useTopAllTime();

  const isLoading = isLoadingUser || isLoadingAiring || isLoadingAllTime;

  const userStatusMap = useMemo(() => {
    const map = new Map();
    if (animeList) {
      animeList.forEach(({ node }) => {
        map.set(node.id, {
          status: node.my_list_status,
          score: node.user_score || 0
        });
      });
    }
    return map;
  }, [animeList]);

  const scatterData = useMemo(() => {
    if (!animeList) return [];
    
    const data = [];
    animeList.forEach(({ node }) => {
      const personalScore = node.user_score || 0;
      const communityScore = node.mean || 0;
      const isCompleted = node.my_list_status === 'completed';

      if (isCompleted && personalScore > 0 && communityScore > 0) {
        let fill = isDark ? '#94A3B8' : '#64748B'; 
        if (personalScore > communityScore) fill = '#22C55E'; 
        if (personalScore < communityScore) fill = '#EF4444'; 

        data.push({
          id: node.id,
          title: node.title,
          personalScore,
          communityScore,
          fill
        });
      }
    });
    return data;
  }, [animeList, isDark]);

  if (isLoading) {
    return (
      <PanelGrid>
        <Skeleton className="h-[400px] w-full col-span-12" />
        <Skeleton className="h-[600px] w-full col-span-12 lg:col-span-8" />
        <Skeleton className="h-[600px] w-full col-span-12 lg:col-span-4" />
      </PanelGrid>
    );
  }

  if (!topAiring || !topAllTime) return <PanelGrid><EmptyState /></PanelGrid>;

  // Constantes visuales para Recharts
  const gridStroke = isDark ? "#1E1E2E" : "#E2E8F0";
  const textFill = isDark ? "#94A3B8" : "#64748B";
  const tooltipBg = isDark ? "#1E1E2E" : "#FFFFFF";
  const tooltipBorder = isDark ? "#2D2D4E" : "#E2E8F0";
  const cursorStroke = isDark ? "#2D2D4E" : "#CBD5E1";

  return (
    <PanelGrid>
      
      {/* SECCIÓN B: Scatter Chart - Personal vs Comunidad */}
      <div className="col-span-12 rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-[#1E1E2E] dark:bg-[#12122A]">
        <div className="mb-4 flex items-center gap-2 border-b border-slate-100 pb-3 transition-colors duration-300 dark:border-[#1E1E2E]">
          <TrendingUp className="text-[#06B6D4]" />
          <h3 className="text-lg font-bold text-slate-800 transition-colors duration-300 dark:text-[#F1F5F9]">{t('community.discrepancy')}</h3>
        </div>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
              <XAxis 
                type="number" 
                dataKey="communityScore" 
                name={t('community.community')} 
                domain={[1, 10]} 
                stroke={textFill} 
                label={{ value: t('charts.community_score'), position: 'insideBottom', offset: -10, fill: textFill }} 
              />
              <YAxis 
                type="number" 
                dataKey="personalScore" 
                name={t('community.personal')} 
                domain={[1, 10]} 
                stroke={textFill} 
                label={{ value: t('charts.personal_score'), angle: -90, position: 'insideLeft', fill: textFill }} 
              />
              <ZAxis type="number" range={[40, 40]} /> 
              
              <Tooltip 
                cursor={{ strokeDasharray: '3 3', stroke: cursorStroke }}
                contentStyle={{ backgroundColor: tooltipBg, border: `1px solid ${tooltipBorder}`, borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                content={({ payload }) => {
                  if (payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="rounded border border-slate-200 bg-white p-3 text-sm shadow-xl transition-colors duration-300 dark:border-[#2D2D4E] dark:bg-[#1E1E2E]">
                        <p className="mb-1 max-w-[200px] truncate font-bold text-slate-800 transition-colors duration-300 dark:text-[#F1F5F9]">{data.title}</p>
                        <p className="text-[#06B6D4]">{t('community.personal')}: {data.personalScore}★</p>
                        <p className="text-slate-500 transition-colors duration-300 dark:text-[#94A3B8]">{t('community.community')}: {data.communityScore}★</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              
              <ReferenceLine segment={[{ x: 1, y: 1 }, { x: 10, y: 10 }]} stroke={textFill} strokeDasharray="3 3" />
              
              <Scatter data={scatterData} opacity={0.7}>
                {scatterData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* SECCIÓN A: Tabla Top 20 en Emisión */}
      <div className="col-span-12 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-colors duration-300 dark:border-[#1E1E2E] dark:bg-[#12122A] lg:col-span-8">
        <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 p-4 transition-colors duration-300 dark:border-[#1E1E2E] dark:bg-[#0D0D1A]">
          <Users className="text-[#7C3AED]" />
          <h3 className="font-bold text-slate-800 transition-colors duration-300 dark:text-[#F1F5F9]">{t('community.top_airing')}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-800 transition-colors duration-300 dark:text-[#F1F5F9]">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500 transition-colors duration-300 dark:bg-[#12122A] dark:text-[#94A3B8]">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">{t('table.anime')}</th>
                <th className="px-4 py-3">{t('charts.score')}</th>
                <th className="px-4 py-3">{t('table.members')}</th>
                <th className="px-4 py-3">{t('table.my_status')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 transition-colors duration-300 dark:divide-[#1E1E2E]">
              {topAiring.map((item, index) => {
                const node = item.node;
                const userState = userStatusMap.get(node.id);
                const isWatching = userState?.status === 'watching';
                
                return (
                  <tr key={node.id} className={`transition-colors hover:bg-slate-50 dark:hover:bg-[#1A1A2E] ${isWatching ? 'relative bg-slate-100 dark:bg-[#1E293B]' : ''}`}>
                    {isWatching && <td className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#06B6D4] to-[#7C3AED]"></td>}
                    <td className="px-4 py-3 font-bold text-slate-400 dark:text-[#94A3B8]">{index + 1}</td>
                    <td className="flex items-center gap-3 px-4 py-3">
                      <img src={node.main_picture?.medium} alt="cover" className="h-10 w-8 rounded object-cover" />
                      <span className="max-w-[200px] truncate font-medium text-slate-800 dark:text-[#F1F5F9]" title={node.title}>{truncateText(node.title, 25)}</span>
                    </td>
                    <td className="px-4 py-3 font-bold text-[#EAB308]">{node.mean} ★</td>
                    <td className="px-4 py-3 text-slate-500 dark:text-[#94A3B8]">{formatNumber(node.num_list_users)}</td>
                    <td className="px-4 py-3">
                      {userState?.status ? (
                        <span className={`rounded-full px-2 py-1 text-xs font-bold ${isWatching ? 'bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white' : 'bg-slate-200 text-slate-600 dark:bg-[#2D2D4E] dark:text-[#94A3B8]'}`}>
                          {t(`status.${userState.status}`)}
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400 dark:text-[#94A3B8]">{t('actions.missing_from_list')}</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECCIÓN C: Histórico Top 10 MAL - All Time */}
      <div className="col-span-12 flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition-colors duration-300 dark:border-[#1E1E2E] dark:bg-[#12122A] lg:col-span-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3 transition-colors duration-300 dark:border-[#1E1E2E]">
          <Trophy className="text-[#F59E0B]" />
          <h3 className="font-bold text-slate-800 transition-colors duration-300 dark:text-[#F1F5F9]">{t('community.top_all_time')}</h3>
        </div>
        
        <div className="flex flex-col gap-3 overflow-y-auto pr-2" style={{ maxHeight: '600px' }}>
          {topAllTime.map((item, index) => {
            const node = item.node;
            const isInList = userStatusMap.has(node.id);
            
            return (
              <div key={node.id} className="relative flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-3 transition-colors duration-300 dark:border-[#2D2D4E] dark:bg-gradient-to-r dark:from-[#1E1E2E] dark:to-[#12122A]">
                <span className="absolute -left-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-white text-xs font-bold text-[#06B6D4] transition-colors duration-300 dark:border-[#2D2D4E] dark:bg-[#0D0D1A]">
                  {index + 1}
                </span>
                
                <img src={node.main_picture?.medium} alt="cover" className="h-16 w-12 rounded border border-slate-100 object-cover transition-colors duration-300 dark:border-[#2D2D4E]" />
                
                <div className="flex flex-1 flex-col overflow-hidden">
                  <span className="truncate font-bold text-slate-800 transition-colors duration-300 dark:text-[#F1F5F9]" title={node.title}>{truncateText(node.title, 20)}</span>
                  <span className="text-sm font-semibold text-[#EAB308]">{node.mean} ★</span>
                  
                  {isInList && (
                    <span className="mt-1 w-max rounded bg-[#064E3B] px-2 py-0.5 text-[10px] font-bold text-[#34D399]">
                      {t('actions.in_my_list')}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PanelGrid>
  );
};