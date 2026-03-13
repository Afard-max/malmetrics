import i18n from '../i18n';

const BASE_URL = import.meta.env.DEV 
  ? '/api/mal' 
  : 'https://corsproxy.io/?https://api.myanimelist.net/v2';

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

  // LECTURA DINÁMICA: Esto DEBE ir aquí adentro. 
  // Así se asegura de leer la memoria en el instante exacto en que la app pide los datos.
  const clientId = localStorage.getItem('mal_client_id');

  if (!clientId) {
    throw new Error('Autenticación fallida: Client ID no encontrado en localStorage');
  }

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