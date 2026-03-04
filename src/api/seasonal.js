import { malFetch } from './malClient';

const getCurrentSeason = () => {
  const month = new Date().getMonth(); // 0-11
  const year = new Date().getFullYear();

  let season = '';
  if (month >= 0 && month <= 2) season = 'winter';
  else if (month >= 3 && month <= 5) season = 'spring';
  else if (month >= 6 && month <= 8) season = 'summer';
  else season = 'fall';

  return { year, season };
};

export const fetchCurrentSeason = async () => {
  const { year, season } = getCurrentSeason();
  const fields = 'id,title,mean,num_list_users,broadcast,main_picture,genres';
  // Límite amplio para capturar la temporada completa
  const endpoint = `/anime/season/${year}/${season}?fields=${fields}&limit=500`;
  
  const data = await malFetch(endpoint);
  return data.data;
};