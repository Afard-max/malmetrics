import { useState, useEffect } from 'react';

export const ApiStatus = () => {
  const [status, setStatus] = useState('online');

  useEffect(() => {
    const handleOffline = () => setStatus('offline');
    const handleOnline = () => setStatus('online');
    const handleApiError = () => {
      setStatus('error');
      setTimeout(() => setStatus('online'), 5000); 
    };

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);
    window.addEventListener('mal-api-error', handleApiError);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('mal-api-error', handleApiError);
    };
  }, []);

  return (
    <div className="flex items-center gap-2 rounded border border-slate-200 bg-slate-100 px-3 py-[5px] transition-colors duration-300 dark:border-[#1E1E2E] dark:bg-[#12122A]" title={`Estado: ${status}`}>
      <span className="hidden text-sm font-medium text-slate-500 dark:text-[#94A3B8] sm:block">API Status</span>
      <div className="relative flex h-3 w-3 items-center justify-center">
        {status === 'online' && (
          <>
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500"></span>
          </>
        )}
        {status === 'offline' && <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-gray-500"></span>}
        {status === 'error' && <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500 shadow-[0_0_8px_#EF4444]"></span>}
      </div>
    </div>
  );
};