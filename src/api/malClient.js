import i18n from '../i18n';

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const dispatchApiError = (messageKey) => {
  window.dispatchEvent(new CustomEvent('mal-api-error', { 
    detail: i18n.t(`errors.${messageKey}`) 
  }));
};

export const malFetch = async (endpoint, options = {}, retries = 0) => {
  if (!navigator.onLine) {
    dispatchApiError('no_internet');
    throw new Error('Network offline');
  }

  const clientId = localStorage.getItem('mal_client_id');

  if (!clientId) {
    throw new Error('Autenticación fallida: Client ID no encontrado en localStorage');
  }

  // 1. Bifurcación de entorno y definición del vector base
  const BASE_URL = import.meta.env.DEV 
    ? '/api/mal' // Proxy local de Vite
    : 'https://malmetrics-proxy.af-alexander-rd.workers.dev'; // Nodo proxy Serverless

  // 2. Ensamblaje estricto de la URL (sin codificación URI)
  const url = endpoint.startsWith('http') ? endpoint : `${BASE_URL}${endpoint}`;

  const headers = {
    'X-MAL-CLIENT-ID': clientId,
    ...options.headers
  };

  try {
    const response = await fetch(url, { ...options, headers });

    if (!response.ok) {
      if (response.status === 429 && retries < 3) {
        dispatchApiError('rate_limit');
        await wait(Math.pow(2, retries) * 1000);
        return malFetch(endpoint, options, retries + 1);
      }
      throw new Error(`HTTP Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};