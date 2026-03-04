/**
 * @file SeasonalPanel.jsx
 * @description Panel de análisis estacional del historial de anime del usuario.
 * Incluye un gráfico de evolución de puntuación media por temporada,
 * tarjetas comparativas (temporada más/menos activa) y una tabla
 * de los animes en emisión durante la temporada actual.
 */

import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, Trophy, TrendingDown, ArrowUpDown } from 'lucide-react';
import { useUserStats } from '../hooks/useUserStats';
import { useSeasonalData } from '../hooks/useSeasonalData';
import { extractUniqueSeasons, getSeasonOrder } from '../utils/seasonHelpers';
import { truncateText, formatNumber } from '../utils/formatters';
import { PanelGrid } from '../components/layout/PanelGrid';
import { Skeleton } from '../components/layout/Skeleton';
import { EmptyState } from '../components/layout/EmptyState';
import { useTheme } from '../hooks/useTheme';

export const SeasonalPanel = () => {
  const { t } = useTranslation();
  const isDark = useTheme();

  // ─── Fuentes de datos ────────────────────────────────────────────────────────
  const { data: animeList, isLoading: isUserLoading } = useUserStats();
  const { data: currentSeasonData, isLoading: isSeasonLoading } = useSeasonalData();

  // ─── Estado local ────────────────────────────────────────────────────────────
  /** Temporada seleccionada en el filtro del gráfico; 'all' muestra todas. */
  const [selectedSeason, setSelectedSeason] = useState('all');

  /** Configuración de ordenamiento para la tabla de temporada actual. */
  const [sortConfig, setSortConfig] = useState({ key: 'num_list_users', direction: 'desc' });

  // ─── 1. Procesamiento del historial de temporadas ────────────────────────────
  const { historicalData, mostProductive, leastActive, allSeasonsKeys } = useMemo(() => {
    if (!animeList) return { historicalData: [], mostProductive: null, leastActive: null, allSeasonsKeys: [] };

    const seasonMap = new Map();
    const availableSeasons = new Set();

    animeList.forEach(({ node }) => {
      if (node.my_list_status === 'completed' && node.start_season) {
        const { year, season } = node.start_season;
        const rawKey = `${year}-${season}`;
        availableSeasons.add(rawKey);

        if (!seasonMap.has(rawKey)) {
          seasonMap.set(rawKey, {
            year,
            season,
            rawKey,
            count: 0,
            totalScore: 0,
            scoredCount: 0,
            bestAnime: null,
            worstAnime: null,
          });
        }

        const sData = seasonMap.get(rawKey);
        sData.count += 1;

        if (node.mean > 0) {
          sData.totalScore += node.mean;
          sData.scoredCount += 1;

          if (!sData.bestAnime || node.mean > sData.bestAnime.score) {
            sData.bestAnime = { title: node.title, score: node.mean, pic: node.main_picture?.medium };
          }
          if (!sData.worstAnime || node.mean < sData.worstAnime.score) {
            sData.worstAnime = { title: node.title, score: node.mean, pic: node.main_picture?.medium };
          }
        }
      }
    });

    let seasonsArray = Array.from(seasonMap.values()).sort((a, b) => {
      if (a.year !== b.year) return a.year - b.year;
      return getSeasonOrder(a.season) - getSeasonOrder(b.season);
    });

    seasonsArray = seasonsArray.map(s => ({
      ...s,
      avgScore: s.scoredCount > 0 ? Number((s.totalScore / s.scoredCount).toFixed(2)) : 0,
    }));

    let maxCount = -1;
    let minCount = Infinity;
    let prod = null;
    let inact = null;

    seasonsArray.forEach(s => {
      if (s.count > maxCount) { maxCount = s.count; prod = s; }
      if (s.count < minCount && s.count > 0) { minCount = s.count; inact = s; }
    });

    const sortedKeys = Array.from(availableSeasons).sort((a, b) => {
      const [yA, sA] = a.split('-');
      const [yB, sB] = b.split('-');
      if (yA !== yB) return parseInt(yB) - parseInt(yA);
      return getSeasonOrder(sB) - getSeasonOrder(sA);
    });

    return { historicalData: seasonsArray, mostProductive: prod, leastActive: inact, allSeasonsKeys: sortedKeys };
  }, [animeList]);

  // ─── 2. Procesamiento y ordenamiento de la temporada actual ─────────────────
  const currentSeasonTable = useMemo(() => {
    if (!currentSeasonData || !animeList) return [];

    const userStatusMap = new Map();
    animeList.forEach(({ node }) => userStatusMap.set(node.id, node.my_list_status));

    let mappedData = currentSeasonData.map(node => ({
      id: node.node.id,
      title: node.node.title,
      pic: node.node.main_picture?.medium,
      score: node.node.mean || 0,
      members: node.node.num_list_users || 0,
      myStatus: userStatusMap.get(node.node.id) || null,
    }));

    mappedData.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return mappedData;
  }, [currentSeasonData, animeList, sortConfig]);

  // ─── Handlers ────────────────────────────────────────────────────────────────
  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc',
    }));
  };

  // ─── Datos filtrados para el gráfico ─────────────────────────────────────────
  const filteredChartData = useMemo(() => {
    if (selectedSeason === 'all') return historicalData;
    const [y, s] = selectedSeason.split('-');
    return historicalData.filter(d => d.year === parseInt(y) && d.season === s);
  }, [historicalData, selectedSeason]);

  // ─── Estado de carga ──────────────────────────────────────────────────────────
  if (isUserLoading || isSeasonLoading) {
    return (
      <PanelGrid>
        <Skeleton className="h-[400px] w-full col-span-12" />
        <Skeleton className="h-[150px] w-full col-span-12 md:col-span-6" />
        <Skeleton className="h-[150px] w-full col-span-12 md:col-span-6" />
        <Skeleton className="h-[500px] w-full col-span-12" />
      </PanelGrid>
    );
  }

  // ─── Variables SVG según el tema ─────────────────────────────────────────────
  const gridStroke = isDark ? "#1E1E2E" : "#E2E8F0";
  const textFill = isDark ? "#94A3B8" : "#64748B";
  const tooltipBg = isDark ? "#1E1E2E" : "#FFFFFF";
  const tooltipBorder = isDark ? "#2D2D4E" : "#E2E8F0";
  const tooltipText = isDark ? "#F1F5F9" : "#0F172A";

  // ─── Render ───────────────────────────────────────────────────────────────────
  return (
    <PanelGrid>

      {/* ── SECCIÓN A + B: Selector de temporada y gráfico de evolución ────────── */}
      <div className="col-span-12 rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-[#1E1E2E] dark:bg-[#12122A]">
        <div className="mb-6 flex flex-col items-start justify-between border-b border-slate-100 pb-4 transition-colors duration-300 dark:border-[#1E1E2E] sm:flex-row sm:items-center">
          <h3 className="mb-4 text-lg font-bold text-slate-800 transition-colors duration-300 dark:text-[#F1F5F9] sm:mb-0">
            {t('nav.seasons')} - {t('seasons.evolution')}
          </h3>

          <div className="flex items-center gap-3">
            <Calendar size={20} className="text-[#06B6D4]" />
            <select
              value={selectedSeason}
              onChange={(e) => setSelectedSeason(e.target.value)}
              className="rounded border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-800 transition-colors duration-300 focus:border-[#06B6D4] focus:outline-none dark:border-[#1E1E2E] dark:bg-[#0D0D1A] dark:text-[#F1F5F9]"
            >
              <option value="all">{t('filters.all')}</option>
              {allSeasonsKeys.map(key => {
                const [y, s] = key.split('-');
                return <option key={key} value={key}>{`${y} ${t(`seasons.${s}`)}`}</option>;
              })}
            </select>
          </div>
        </div>

        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={filteredChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#7C3AED" />
                  <stop offset="100%" stopColor="#06B6D4" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} vertical={false} />
              <XAxis
                dataKey="rawKey"
                stroke={textFill}
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => {
                  const [y, s] = value.split('-');
                  return `${y} ${t(`seasons.${s}`)}`;
                }}
              />
              <YAxis domain={['auto', 'auto']} stroke={textFill} tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: tooltipBg, border: `1px solid ${tooltipBorder}`, borderRadius: '8px', color: tooltipText, boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                itemStyle={{ color: '#06B6D4' }}
                formatter={(value, name, props) => [
                  `${value} ★`,
                  `${props.payload.count} ${t('charts.animes')}`,
                ]}
              />
              <Line
                type="monotone"
                dataKey="avgScore"
                stroke="url(#lineGradient)"
                strokeWidth={3}
                dot={{ fill: '#06B6D4', strokeWidth: 0, r: 4 }}
                activeDot={{ r: 6, fill: '#7C3AED' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── SECCIÓN C: Tarjetas comparativas de temporadas extremas ─────────────── */}

      {mostProductive && (
        <div className="col-span-12 flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-[#2D2D4E] dark:bg-gradient-to-br dark:from-[#1E1E2E] dark:to-[#12122A] md:col-span-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3 transition-colors duration-300 dark:border-[#2D2D4E]">
            <Trophy className="text-[#06B6D4]" size={24} />
            <h4 className="font-bold text-slate-800 transition-colors duration-300 dark:text-[#F1F5F9]">{t('seasons.most_productive')}</h4>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] bg-clip-text text-2xl font-black text-transparent">
                {`${mostProductive.year} ${t(`seasons.${mostProductive.season}`)}`}
              </p>
              <p className="text-sm text-slate-500 transition-colors duration-300 dark:text-[#94A3B8]">{mostProductive.count} {t('seasons.completed_animes')}</p>
            </div>

            {mostProductive.bestAnime && (
              <div className="flex items-center gap-3 text-right">
                <div className="flex flex-col">
                  <span className="text-xs text-slate-500 transition-colors duration-300 dark:text-[#94A3B8]">
                    {t('seasons.best_scored')} ({mostProductive.bestAnime.score}★)
                  </span>
                  <span
                    className="max-w-[120px] truncate text-sm font-semibold text-slate-800 transition-colors duration-300 dark:text-[#F1F5F9]"
                    title={mostProductive.bestAnime.title}
                  >
                    {truncateText(mostProductive.bestAnime.title, 18)}
                  </span>
                </div>
                <img
                  src={mostProductive.bestAnime.pic}
                  alt="thumbnail"
                  className="h-12 w-12 rounded border border-[#06B6D4] object-cover"
                />
              </div>
            )}
          </div>
        </div>
      )}

      {leastActive && (
        <div className="col-span-12 flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-[#2D2D4E] dark:bg-gradient-to-br dark:from-[#1E1E2E] dark:to-[#12122A] md:col-span-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3 transition-colors duration-300 dark:border-[#2D2D4E]">
            <TrendingDown className="text-[#F97316]" size={24} />
            <h4 className="font-bold text-slate-800 transition-colors duration-300 dark:text-[#F1F5F9]">{t('seasons.least_active')}</h4>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="bg-gradient-to-r from-[#EC4899] to-[#F97316] bg-clip-text text-2xl font-black text-transparent">
                {`${leastActive.year} ${t(`seasons.${leastActive.season}`)}`}
              </p>
              <p className="text-sm text-slate-500 transition-colors duration-300 dark:text-[#94A3B8]">{leastActive.count} {t('seasons.completed_animes')}</p>
            </div>

            {leastActive.worstAnime && (
              <div className="flex items-center gap-3 text-right">
                <div className="flex flex-col">
                  <span className="text-xs text-slate-500 transition-colors duration-300 dark:text-[#94A3B8]">
                    {t('seasons.worst_scored')} ({leastActive.worstAnime.score}★)
                  </span>
                  <span
                    className="max-w-[120px] truncate text-sm font-semibold text-slate-800 transition-colors duration-300 dark:text-[#F1F5F9]"
                    title={leastActive.worstAnime.title}
                  >
                    {truncateText(leastActive.worstAnime.title, 18)}
                  </span>
                </div>
                <img
                  src={leastActive.worstAnime.pic}
                  alt="thumbnail"
                  className="h-12 w-12 rounded border border-[#F97316] object-cover"
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── SECCIÓN D: Tabla de animes en emisión (temporada actual) ─────────────── */}
      <div className="col-span-12 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-colors duration-300 dark:border-[#1E1E2E] dark:bg-[#12122A]">
        <div className="border-b border-slate-200 bg-slate-50 p-4 transition-colors duration-300 dark:border-[#1E1E2E] dark:bg-[#0D0D1A]">
          <h3 className="font-bold text-slate-800 transition-colors duration-300 dark:text-[#F1F5F9]">{t('seasons.current_airing')}</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-800 transition-colors duration-300 dark:text-[#F1F5F9]">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500 transition-colors duration-300 dark:bg-[#12122A] dark:text-[#94A3B8]">
              <tr>
                <th className="px-6 py-4">{t('table.cover')}</th>
                <th className="cursor-pointer px-6 py-4 hover:text-[#06B6D4]" onClick={() => handleSort('title')}>
                  <div className="flex items-center gap-1">{t('table.title')} <ArrowUpDown size={12} /></div>
                </th>
                <th className="cursor-pointer px-6 py-4 hover:text-[#06B6D4]" onClick={() => handleSort('score')}>
                  <div className="flex items-center gap-1">{t('table.mal_score')} <ArrowUpDown size={12} /></div>
                </th>
                <th className="cursor-pointer px-6 py-4 hover:text-[#06B6D4]" onClick={() => handleSort('members')}>
                  <div className="flex items-center gap-1">{t('table.members')} <ArrowUpDown size={12} /></div>
                </th>
                <th className="px-6 py-4">{t('table.list_status')}</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 transition-colors duration-300 dark:divide-[#1E1E2E]">
              {currentSeasonTable.map((anime) => {
                const isWatching = anime.myStatus === 'watching';
                return (
                  <tr
                    key={anime.id}
                    className={`transition-colors hover:bg-slate-50 dark:hover:bg-[#1A1A2E] ${
                      isWatching
                        ? 'border-l-2 border-l-[#06B6D4] bg-slate-100 dark:bg-[#1E293B]'
                        : 'border-l-2 border-l-transparent'
                    }`}
                  >
                    <td className="px-6 py-2">
                      <img src={anime.pic} alt="cover" className="h-12 w-10 rounded object-cover" />
                    </td>
                    <td className="px-6 py-4 font-medium" title={anime.title}>
                      {truncateText(anime.title, 35)}
                    </td>
                    <td className="px-6 py-4 font-bold text-[#EAB308]">{anime.score} ★</td>
                    <td className="px-6 py-4 text-slate-500 transition-colors duration-300 dark:text-[#94A3B8]">{formatNumber(anime.members)}</td>
                    <td className="px-6 py-4">
                      {anime.myStatus ? (
                        <span className={`rounded-full px-2 py-1 text-xs font-bold ${
                          isWatching
                            ? 'bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white'
                            : 'bg-slate-200 text-slate-600 dark:bg-[#2D2D4E] dark:text-[#94A3B8]'
                        }`}>
                          {t(`status.${anime.myStatus}`)}
                        </span>
                      ) : (
                        <span className="text-slate-400 transition-colors duration-300 dark:text-[#94A3B8]">-</span>
                      )}
                    </td>
                  </tr>
                );
              })}

              {currentSeasonTable.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-slate-400 transition-colors duration-300 dark:text-[#94A3B8]">
                    {t('empty.no_anime')}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </PanelGrid>
  );
};