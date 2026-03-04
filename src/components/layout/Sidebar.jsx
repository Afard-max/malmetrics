import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { LayoutDashboard, Calendar, Star, Users, GitBranch, User, LogOut } from 'lucide-react';
import { AnimatedRefreshButton } from '../ui/AnimatedRefreshButton';

export const Sidebar = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [profilePic, setProfilePic] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false); 
  
  const username = localStorage.getItem('mal_username');

  useEffect(() => {
    const fetchProfilePic = async () => {
      try {
        const res = await fetch(`https://api.jikan.moe/v4/users/${username}`);
        if (!res.ok) throw new Error('Error en Jikan API');
        const json = await res.json();
        if (json.data?.images?.jpg?.image_url) {
          setProfilePic(json.data.images.jpg.image_url);
        }
      } catch (error) {
        console.error("No se pudo cargar la foto de perfil:", error);
      }
    };
    if (username) fetchProfilePic();
  }, [username]);

  const handleRefresh = async () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    await queryClient.invalidateQueries();
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const handleLogout = () => {
    localStorage.removeItem('mal_username');
    localStorage.removeItem('mal_client_id');
    window.location.reload(); 
  };

  const navItems = [
    { to: '/', icon: LayoutDashboard, label: t('nav.overview') },
    { to: '/seasons', icon: Calendar, label: t('nav.seasons') },
    { to: '/scores', icon: Star, label: t('nav.scores') },
    { to: '/community', icon: Users, label: t('nav.community') },
    { to: '/franchises', icon: GitBranch, label: t('nav.franchises') }
  ];

  return (
    <aside className="z-50 flex w-full flex-row items-center justify-around bg-white p-2 transition-colors duration-300 dark:bg-[#12122A] max-md:fixed max-md:bottom-0 max-md:border-t max-md:border-slate-200 dark:max-md:border-[#1E1E2E] md:relative md:my-6 md:ml-6 md:w-[260px] md:flex-col md:justify-start md:overflow-hidden md:rounded-xl md:border md:border-slate-200 md:shadow-sm dark:md:border-[#2D2D4E]">
      
      {/* Perfil — padding reducido de p-6 a p-4 para ganar espacio vertical */}
      <div className="hidden w-full flex-col items-center border-b border-slate-200 p-4 dark:border-[#1E1E2E] md:flex">
        <div className="mb-2 flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border-2 border-[#7C3AED] bg-slate-100 dark:bg-[#0D0D1A]">
          {profilePic ? (
            <img src={profilePic} alt="Avatar" className="h-full w-full object-cover" />
          ) : (
            <User size={28} className="text-slate-400 dark:text-[#94A3B8]" />
          )}
        </div>
        
        <div className="mt-1 flex w-full flex-col items-center justify-center gap-1">
          <h2 className="truncate text-lg font-bold text-slate-800 dark:text-[#F1F5F9]">
            {username || 'Usuario'}
          </h2>
          <button 
            onClick={handleLogout}
            title="Cerrar Sesión" 
            className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold text-slate-500 transition-colors hover:bg-slate-100 hover:text-[#EF4444] dark:text-[#94A3B8] dark:hover:bg-[#1A1A2E] dark:hover:text-[#EF4444]"
          >
            <LogOut size={14} />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </div>

      {/* Nav — mt reducido de mt-6 a mt-4 */}
      <nav className="flex w-full flex-row justify-around md:mt-4 md:flex-col md:gap-1">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 transition-colors duration-200 md:mx-4 md:rounded-lg md:px-4 md:py-3 ${
                isActive
                  ? 'bg-slate-100 text-[#06B6D4] dark:bg-[#1E1E2E]'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800 dark:text-[#94A3B8] dark:hover:bg-[#1A1A2E] dark:hover:text-[#F1F5F9]'
              }`
            }
          >
            <Icon size={24} />
            <span className="hidden font-medium md:block">{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Botón refresh — padding reducido de p-6 a p-4 */}
      <div className="mt-auto hidden w-full p-4 md:block">
        <AnimatedRefreshButton 
          onClick={handleRefresh} 
          isRefreshing={isRefreshing} 
          text={t('actions.refresh')} 
        />
      </div>
    </aside>
  );
};