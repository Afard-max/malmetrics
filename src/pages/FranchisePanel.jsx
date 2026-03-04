import { useEffect, useRef, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import * as d3 from 'd3';
import { Search, X, Info, Tv, Star, Users, Network, Loader2, Camera, Printer, Download } from 'lucide-react';
import { useUserStats } from '../hooks/useUserStats';
import { fetchAnimeDetails } from '../api/animeDetails';
import { truncateText } from '../utils/formatters';
import { PanelGrid } from '../components/layout/PanelGrid';
import { Skeleton } from '../components/layout/Skeleton';
import { useTheme } from '../hooks/useTheme';

export const FranchisePanel = () => {
  const { t } = useTranslation();
  const isDark = useTheme(); // <-- Sensor termodinámico inyectado
  const { data: animeList, isLoading } = useUserStats();
  const svgRef = useRef(null);
  const containerRef = useRef(null);

  const [selectedNode, setSelectedNode] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [treeData, setTreeData] = useState(null);
  const [isBuilding, setIsBuilding] = useState(false);
  const [exportingFormat, setExportingFormat] = useState(null);

  const userStatusMap = useMemo(() => {
    const map = new Map();
    if (animeList) {
      animeList.forEach(({ node }) => {
        map.set(node.id, {
          status: node.my_list_status,
          score: node.user_score
        });
      });
    }
    return map;
  }, [animeList]);

  const suggestions = useMemo(() => {
    if (!animeList) return [];
    let filtered = animeList.filter(a => ['completed', 'watching'].includes(a.node.my_list_status));
    
    if (searchQuery.length > 2) {
      filtered = filtered.filter(a => a.node.title.toLowerCase().includes(searchQuery.toLowerCase()));
      return filtered.slice(0, 12);
    } 
    
    const shuffled = [...filtered].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 12);
  }, [animeList, searchQuery]);

  const buildFranchiseTree = async (startId) => {
    setIsBuilding(true);
    setTreeData(null);
    setSelectedNode(null);

    const nodesMap = new Map();
    const rawLinks = [];
    const queue = [startId];
    const visited = new Set();
    let safeCounter = 0;

    try {
      while (queue.length > 0 && safeCounter < 30) {
        const currentId = queue.shift();
        if (visited.has(currentId)) continue;
        visited.add(currentId);
        safeCounter++;

        const details = await fetchAnimeDetails(currentId);
        const uStatus = userStatusMap.get(details.id);

        nodesMap.set(details.id, {
          id: details.id,
          name: details.title,
          image: details.main_picture?.medium,
          status: uStatus?.status || 'not_in_list',
          score: uStatus?.score || 0,
          malScore: details.mean,
          episodes: details.num_episodes,
          genres: details.genres?.map(g => g.name).join(', ') || 'N/A'
        });

        if (details.related_anime) {
          details.related_anime.forEach(rel => {
            if (['sequel', 'prequel', 'parent_story', 'side_story'].includes(rel.relation_type)) {
              if (!visited.has(rel.node.id) && !queue.includes(rel.node.id)) queue.push(rel.node.id);
              if (rel.relation_type === 'sequel' || rel.relation_type === 'side_story') {
                rawLinks.push({ source: details.id, target: rel.node.id });
              } else {
                rawLinks.push({ source: rel.node.id, target: details.id });
              }
            }
          });
        }
        await new Promise(r => setTimeout(r, 400));
      }

      if (nodesMap.size <= 1) {
        alert(t('franchise.no_relations'));
        setIsBuilding(false);
        return;
      }

      const uniqueLinks = [];
      const seenLinks = new Set();
      rawLinks.forEach(l => {
        const linkKey = `${l.source}-${l.target}`;
        if (!seenLinks.has(linkKey)) {
          seenLinks.add(linkKey);
          uniqueLinks.push(l);
        }
      });

      const targets = new Set(uniqueLinks.map(l => l.target));
      let rootId = null;
      for (const id of nodesMap.keys()) {
        if (!targets.has(id)) { rootId = id; break; }
      }
      if (!rootId) rootId = startId; 

      const buildHierarchy = (parentId, currentPath = new Set()) => {
        currentPath.add(parentId);
        const childrenLinks = uniqueLinks.filter(l => l.source === parentId && !currentPath.has(l.target));
        const nodeData = nodesMap.get(parentId) || { id: parentId, name: t('franchise.unknown'), status: 'not_in_list' };

        return {
          ...nodeData,
          isRoot: parentId === rootId,
          children: childrenLinks.map(l => buildHierarchy(l.target, new Set(currentPath)))
        };
      };

      setTreeData(buildHierarchy(rootId));

    } catch (error) {
      console.error("Fallo algorítmico:", error);
    } finally {
      setIsBuilding(false);
    }
  };

  const generateExportableSVG = async () => {
    const svgElement = svgRef.current;
    const clonedSvg = svgElement.cloneNode(true);
    const clonedG = clonedSvg.querySelector('g');

    clonedG.removeAttribute('transform');
    const bbox = svgElement.querySelector('g').getBBox();
    const padding = 60;
    const width = bbox.width + padding * 2;
    const height = bbox.height + padding * 2;

    clonedSvg.setAttribute('viewBox', `${bbox.x - padding} ${bbox.y - padding} ${width} ${height}`);
    clonedSvg.setAttribute('width', width);
    clonedSvg.setAttribute('height', height);

    const images = clonedSvg.querySelectorAll('image');
    for (let img of images) {
      const href = img.getAttribute('href');
      if (href && href.startsWith('http')) {
        try {
          const response = await fetch(`https://corsproxy.io/?${encodeURIComponent(href)}`);
          const blob = await response.blob();
          const base64 = await new Promise(resolve => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(blob);
          });
          img.setAttribute('href', base64);
        } catch (e) {
          img.remove(); 
        }
      }
    }

    const serializer = new XMLSerializer();
    let svgString = serializer.serializeToString(clonedSvg);
    if (!svgString.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
        svgString = svgString.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
    }

    return { svgString, width, height };
  };

  const handleExportPNG = async () => {
    if (!svgRef.current || !treeData) return;
    setExportingFormat('png');
    try {
      const { svgString, width, height } = await generateExportableSVG();
      const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);

      const scaleFactor = 3; 
      const canvas = document.createElement('canvas');
      canvas.width = width * scaleFactor;
      canvas.height = height * scaleFactor;
      const ctx = canvas.getContext('2d');
      ctx.scale(scaleFactor, scaleFactor);
      
      // FIX: El PNG exportado respetará si estabas en Modo Claro u Oscuro al descargarlo
      ctx.fillStyle = isDark ? '#0D0D1A' : '#F8FAFC'; 
      ctx.fillRect(0, 0, width, height); 

      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, width, height);
        const link = document.createElement('a');
        link.download = `${treeData.name.replace(/\s+/g, '_')}_Grafo.png`;
        link.href = canvas.toDataURL('image/png', 1.0);
        link.click();
        URL.revokeObjectURL(url);
        setExportingFormat(null);
      };
      img.src = url;
    } catch (error) {
      console.error(error);
      setExportingFormat(null);
    }
  };

  const handleExportSVG = async () => {
    if (!svgRef.current || !treeData) return;
    setExportingFormat('svg');
    try {
      const { svgString } = await generateExportableSVG();
      const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = `${treeData.name.replace(/\s+/g, '_')}_Topologia.svg`;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
    } finally {
      setExportingFormat(null);
    }
  };

  const handlePrintPDF = () => {
    if (!svgRef.current || !treeData) return;

    const svgElement = svgRef.current;
    const gElement = svgElement.querySelector('g');

    const originalViewBox = svgElement.getAttribute('viewBox');
    const originalTransform = gElement.getAttribute('transform');

    gElement.removeAttribute('transform'); 
    const bbox = gElement.getBBox();
    const padding = 60;

    svgElement.setAttribute('viewBox', `${bbox.x - padding} ${bbox.y - padding} ${bbox.width + padding * 2} ${bbox.height + padding * 2}`);

    setTimeout(() => {
      window.print();
      svgElement.setAttribute('viewBox', originalViewBox);
      gElement.setAttribute('transform', originalTransform);
    }, 100);
  };

  useEffect(() => {
    if (svgRef.current) d3.select(svgRef.current).selectAll("*").remove();
    if (!treeData || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight || 800;

    const root = d3.hierarchy(treeData);
    const treeLayout = d3.tree().nodeSize([80, 260]).separation((a, b) => a.parent === b.parent ? 1.2 : 1.5);
    treeLayout(root);

    const svg = d3.select(svgRef.current)
      .attr("viewBox", [0, 0, width, height])
      .style("width", "100%")
      .style("height", "100%")
      .style("user-select", "none");

    const g = svg.append("g");
    const zoom = d3.zoom().scaleExtent([0.1, 4]).on("zoom", (event) => g.attr("transform", event.transform));
    svg.call(zoom);
    svg.call(zoom.transform, d3.zoomIdentity.translate(width / 5, height / 2).scale(0.85));

    // Colores calculados según el tema actual (Light/Dark)
    const linkColor = isDark ? "#2D2D4E" : "#CBD5E1";
    const textColorMain = isDark ? "#F1F5F9" : "#0F172A";
    const defaultStroke = isDark ? "#2D2D4E" : "#CBD5E1";

    g.append("g").attr("fill", "none").attr("stroke", linkColor).attr("stroke-width", 2)
      .selectAll("path").data(root.links()).join("path")
      .attr("d", d3.linkHorizontal().x(d => d.y).y(d => d.x));

    const node = g.append("g").selectAll("g").data(root.descendants()).join("g")
      .attr("transform", d => `translate(${d.y},${d.x})`)
      .style("cursor", "pointer")
      .on("click", (event, d) => setSelectedNode(d.data));

    const getBgColor = (status) => {
      if (isDark) {
        if (status === 'completed') return '#064E3B';
        if (status === 'watching') return '#1E3A5F';
        if (status === 'not_in_list') return '#1F1F1F';
        return '#374151';
      } else {
        if (status === 'completed') return '#D1FAE5'; // Verde pastel
        if (status === 'watching') return '#E0F2FE'; // Azul pastel
        if (status === 'not_in_list') return '#F8FAFC'; // Gris muy claro
        return '#F1F5F9';
      }
    };

    node.append("rect").attr("x", -24).attr("y", -24).attr("width", 230).attr("height", 48).attr("rx", 6)
      .attr("fill", d => getBgColor(d.data.status))
      .attr("stroke", d => d.data.isRoot ? '#F59E0B' : (d.data.status === 'not_in_list' ? '#EF4444' : defaultStroke))
      .attr("stroke-width", d => d.data.isRoot ? 2 : 1)
      .attr("stroke-dasharray", d => d.data.status === 'not_in_list' ? "4 4" : "none");

    node.append("image").attr("href", d => d.data.image).attr("x", -20).attr("y", -20).attr("width", 40).attr("height", 40).attr("clip-path", "inset(0 round 4px)");
    
    node.append("text").attr("dy", "-0.1em").attr("x", 28).attr("fill", textColorMain).style("font-size", "12px").style("font-weight", "bold").text(d => truncateText(d.data.name, 22));
    node.append("text").attr("dy", "1.4em").attr("x", 28).attr("fill", d => d.data.status === 'not_in_list' ? "#EF4444" : "#06B6D4").style("font-size", "11px").text(d => d.data.status === 'not_in_list' ? t('actions.missing_from_list') : `${d.data.score} ★ ${t('franchise.personal')}`);

  }, [treeData, t, isDark]); // IMPORTANTE: isDark gatillará el re-renderizado de D3

  if (isLoading) return <PanelGrid><Skeleton className="h-[800px] w-full col-span-12" /></PanelGrid>;

  return (
    <div className="relative flex h-full w-full flex-col">
      <style>{`
        .hide-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        @media print {
          body * { visibility: hidden !important; }
          .print-canvas, .print-canvas * { visibility: visible !important; }
          .print-canvas { 
            position: absolute !important; 
            left: 0 !important; 
            top: 0 !important; 
            width: 100vw !important; 
            height: 100vh !important; 
            border: none !important; 
            box-shadow: none !important; 
            background: ${isDark ? '#0D0D1A' : '#F8FAFC'} !important; 
          }
          .no-print { display: none !important; }
          @page { margin: 0; size: landscape; }
        }
      `}</style>

      {/* Menú Flotante Superior (Buscador y Botones) */}
      <div className="absolute left-6 top-6 z-50 flex w-[auto] max-w-[600px] items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-2xl no-print transition-colors duration-300 dark:border-[#1E1E2E] dark:bg-[#12122A]">
        <Search size={18} className="min-w-[18px] text-[#06B6D4]" />
        <input
          type="text"
          placeholder={t('actions.search_placeholder')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-48 bg-transparent text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none dark:text-[#F1F5F9] dark:placeholder:text-[#475569]"
        />
        
        {treeData && (
          <div className="flex items-center gap-2 border-l border-slate-200 pl-3 transition-colors duration-300 dark:border-[#2D2D4E]">
            <button 
              onClick={handleExportPNG} 
              disabled={exportingFormat !== null}
              title={t('franchise.download_png')}
              className="text-slate-400 transition-colors hover:text-[#06B6D4] disabled:opacity-50 dark:text-[#94A3B8] dark:hover:text-[#06B6D4]"
            >
              {exportingFormat === 'png' ? <Loader2 size={18} className="animate-spin" /> : <Camera size={18} />}
            </button>
            <button 
              onClick={handleExportSVG} 
              disabled={exportingFormat !== null}
              title={t('franchise.download_svg')}
              className="text-slate-400 transition-colors hover:text-[#06B6D4] disabled:opacity-50 dark:text-[#94A3B8] dark:hover:text-[#06B6D4]"
            >
              {exportingFormat === 'svg' ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
            </button>
            <button 
              onClick={handlePrintPDF} 
              title={t('franchise.export_pdf')}
              className="text-slate-400 transition-colors hover:text-[#06B6D4] dark:text-[#94A3B8] dark:hover:text-[#06B6D4]"
            >
              <Printer size={18} />
            </button>
            <button 
              onClick={() => setTreeData(null)} 
              title={t('franchise.close_graph')}
              className="ml-2 text-slate-400 transition-colors hover:text-[#EF4444] dark:text-[#94A3B8] dark:hover:text-[#EF4444]"
            >
              <X size={18} />
            </button>
          </div>
        )}
      </div>

      {/* Contenedor del Grafo SVG */}
      <div ref={containerRef} className="print-canvas relative z-0 h-[80vh] w-full cursor-move overflow-hidden rounded-lg border border-slate-200 bg-slate-50 shadow-[inset_0_0_50px_rgba(0,0,0,0.05)] transition-colors duration-300 dark:border-[#1E1E2E] dark:bg-[#0D0D1A] dark:shadow-[inset_0_0_50px_rgba(0,0,0,0.5)]">
        
        {isBuilding && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm no-print transition-colors duration-300 dark:bg-[#0D0D1A]/90">
            <Loader2 size={48} className="mb-4 animate-spin text-[#06B6D4]" />
            <span className="text-lg font-bold text-slate-800 dark:text-[#F1F5F9]">{t('franchise.mapping_connections')}</span>
            <span className="mt-2 text-sm text-slate-500 dark:text-[#94A3B8]">{t('franchise.querying_api')}</span>
          </div>
        )}

        {!treeData && !isBuilding && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-start overflow-y-auto p-6 pt-24 no-print hide-scrollbar">
            <Network size={56} className="mb-6 text-slate-300 dark:text-[#94A3B8] dark:opacity-50" />
            <h3 className="mb-8 text-2xl font-bold text-slate-800 dark:text-[#F1F5F9]">{t('franchise.select_seed')}</h3>
            <div className="grid w-full max-w-6xl grid-cols-1 gap-4 pb-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {suggestions.map(anime => (
                <button
                  key={anime.node.id}
                  onClick={() => buildFranchiseTree(anime.node.id)}
                  className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-3 text-left shadow-sm transition-all hover:border-[#06B6D4] hover:bg-slate-50 dark:border-[#2D2D4E] dark:bg-[#1E1E2E] dark:hover:border-[#06B6D4] dark:hover:bg-[#1A1A2E]"
                >
                  <img src={anime.node.main_picture?.medium} alt="cover" className="h-16 w-12 rounded object-cover" />
                  <div className="flex flex-col overflow-hidden">
                    <span className="truncate font-bold text-slate-800 dark:text-[#F1F5F9]" title={anime.node.title}>{anime.node.title}</span>
                    <span className="mt-1 text-xs text-[#06B6D4]">{anime.node.user_score || 0} ★</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        <svg ref={svgRef}></svg>
      </div>

      {/* Panel Lateral de Detalles */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="no-print absolute right-0 top-0 z-50 h-[80vh] w-[320px] rounded-l-2xl border-l border-y border-slate-200 bg-white shadow-2xl transition-colors duration-300 dark:border-[#1E1E2E] dark:bg-gradient-to-b dark:from-[#12122A] dark:to-[#1A0A2E]"
          >
            <div className="relative h-48 w-full">
              <img src={selectedNode.image} alt="cover" className="h-full w-full rounded-tl-2xl object-cover opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent dark:from-[#12122A]"></div>
              <button onClick={() => setSelectedNode(null)} className="absolute right-4 top-4 rounded-full bg-white/80 p-2 text-slate-500 transition-colors hover:text-slate-800 dark:bg-[#0D0D1A]/80 dark:text-[#94A3B8] dark:hover:text-white">
                <X size={18} />
              </button>
            </div>
            <div className="relative z-10 -mt-8 p-6">
              <h3 className="mb-4 leading-tight text-lg font-bold text-slate-800 dark:text-[#F1F5F9]">{selectedNode.name}</h3>
              <div className="mb-6 grid grid-cols-2 gap-4">
                <div className="flex flex-col rounded border border-slate-200 bg-slate-50 p-3 shadow-inner transition-colors duration-300 dark:border-[#1E1E2E] dark:bg-[#0D0D1A]">
                  <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-[#94A3B8]"><Star size={12}/> {t('franchise.personal')}</span>
                  <span className="text-lg font-bold text-[#06B6D4]">{selectedNode.score || '-'} ★</span>
                </div>
                <div className="flex flex-col rounded border border-slate-200 bg-slate-50 p-3 shadow-inner transition-colors duration-300 dark:border-[#1E1E2E] dark:bg-[#0D0D1A]">
                  <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-[#94A3B8]"><Users size={12}/> {t('franchise.global')}</span>
                  <span className="text-lg font-bold text-[#EAB308]">{selectedNode.malScore || '-'} ★</span>
                </div>
              </div>
              <div className="space-y-3 border-t border-slate-200 pt-4 transition-colors duration-300 dark:border-[#1E1E2E]">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500 dark:text-[#94A3B8]">{t('franchise.status')}</span>
                  <span className={`px-2 py-1 rounded text-xs font-bold ${selectedNode.status === 'not_in_list' ? 'border border-[#EF4444]/30 bg-[#EF4444]/10 text-[#EF4444] dark:bg-[#EF4444]/20' : 'border border-[#06B6D4]/30 bg-[#06B6D4]/10 text-[#06B6D4] dark:bg-[#06B6D4]/20'}`}>
                    {selectedNode.status === 'not_in_list' ? t('actions.missing_from_list') : t(`status.${selectedNode.status}`)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-sm text-slate-500 dark:text-[#94A3B8]"><Tv size={14}/> {t('franchise.episodes')}</span>
                  <span className="text-sm font-semibold text-slate-800 dark:text-[#F1F5F9]">{selectedNode.episodes || '?'}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};