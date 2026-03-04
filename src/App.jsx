import { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/layout/Sidebar';
import { TopBar } from './components/layout/TopBar';
import { Dashboard } from './pages/Dashboard';
import { ScoresPanel } from './pages/ScoresPanel';
import { SeasonalPanel } from './pages/SeasonalPanel';
import { CommunityPanel } from './pages/CommunityPanel';
import { FranchisePanel } from './pages/FranchisePanel';
import { Login } from './pages/Login'; // <-- Importamos el Login

export const App = () => {
  // Estado que verifica si existen credenciales en el navegador
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('mal_username');
    const token = localStorage.getItem('mal_client_id');
    if (user && token) setIsAuthenticated(true);
  }, []);

  // Si no está autenticado, renderiza exclusivamente el Login
  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  // Si está autenticado, renderiza el Dashboard normal
  return (
    <HashRouter>
      <div className="flex h-screen w-full flex-col overflow-hidden bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-gradient-to-br dark:from-[#0D0D1A] dark:to-[#1A0A2E] dark:text-[#F1F5F9]">
        <TopBar />
        <div className="relative flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-y-auto p-4 pb-24 md:p-6 md:pb-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/seasons" element={<SeasonalPanel />} />
              <Route path="/scores" element={<ScoresPanel />} />
              <Route path="/community" element={<CommunityPanel />} />
              <Route path="/franchises" element={<FranchisePanel />} />
            </Routes>
          </main>
        </div>
      </div>
    </HashRouter>
  );
};