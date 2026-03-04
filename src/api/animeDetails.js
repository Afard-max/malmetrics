import { malFetch } from './malClient';

export const fetchAnimeDetails = async (animeId) => {
  // Aquí sí solicitamos las relaciones explícitamente para el grafo
  const fields = 'id,title,main_picture,mean,num_episodes,related_anime,genres';
  return await malFetch(`/anime/${animeId}?fields=${fields}`);
};