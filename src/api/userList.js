import { malFetch } from './malClient';

export const fetchUserAnimeList = async (username) => {
  const limit = 1000;
  let offset = 0;
  let allAnime = [];
  let hasNextPage = true;

  // Solicitamos explícitamente list_status
  const fields = 'id,title,main_picture,mean,list_status,num_episodes,start_season,related_anime,genres,studios,broadcast';

  while (hasNextPage) {
    const endpoint = `/users/${username}/animelist?fields=${fields}&limit=${limit}&offset=${offset}&nsfw=true`;
    const data = await malFetch(endpoint);
    
    if (data.data) {
      // Normalización geométrica: subimos el status y el score personal al nivel del nodo 
      // para que todos los paneles los lean correctamente.
      const normalized = data.data.map(item => ({
        node: {
          ...item.node,
          my_list_status: item.list_status?.status,
          user_score: item.list_status?.score
        }
      }));
      allAnime = allAnime.concat(normalized);
    }

    if (data.paging && data.paging.next) {
      offset += limit;
      // Retraso para mitigar bloqueos al procesar grandes volúmenes de datos (>7000)
      await new Promise(resolve => setTimeout(resolve, 300));
    } else {
      hasNextPage = false;
    }
  }

  return allAnime;
};