import { useState, useEffect, Suspense, lazy } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/layout/Sidebar';
import { TopBar } from './components/layout/TopBar';
import { Login } from './pages/Login'; // Importación estática preservada

// Resolución algorítmica para compatibilidad de React.lazy con exportaciones nombradas
const Dashboard = lazy(() => import('./pages/Dashboard').then(module => ({ default: module.Dashboard })));
const ScoresPanel = lazy(() => import('./pages/ScoresPanel').then(module => ({ default: module.ScoresPanel })));
const SeasonalPanel = lazy(() => import('./pages/SeasonalPanel').then(module => ({ default: module.SeasonalPanel })));
const CommunityPanel = lazy(() => import('./pages/CommunityPanel').then(module => ({ default: module.CommunityPanel })));
const FranchisePanel = lazy(() => import('./pages/FranchisePanel').then(module => ({ default: module.FranchisePanel })));

export const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('mal_username');
    const token = localStorage.getItem('mal_client_id');
    if (user && token) setIsAuthenticated(true);
  }, []);

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <HashRouter>
      <div className="flex h-screen w-full flex-col overflow-hidden bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-gradient-to-br dark:from-[#0D0D1A] dark:to-[#1A0A2E] dark:text-[#F1F5F9]">
        <TopBar />
        <div className="relative flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-y-auto p-4 pb-24 md:p-6 md:pb-6">
            <Suspense fallback={<div className="flex h-full w-full items-center justify-center p-8 font-mono text-sm opacity-70">Cargando módulo...</div>}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/seasons" element={<SeasonalPanel />} />
                <Route path="/scores" element={<ScoresPanel />} />
                <Route path="/community" element={<CommunityPanel />} />
                <Route path="/franchises" element={<FranchisePanel />} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </div>
    </HashRouter>
  );
};