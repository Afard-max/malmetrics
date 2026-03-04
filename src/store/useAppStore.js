import { create } from 'zustand';

export const useAppStore = create((set) => ({
  activeLanguage: localStorage.getItem('mal_dashboard_lang') || 'es',
  setLanguage: (lang) => {
    localStorage.setItem('mal_dashboard_lang', lang);
    set({ activeLanguage: lang });
  },
  isOffline: !navigator.onLine,
  setOfflineStatus: (status) => set({ isOffline: status }),
}));