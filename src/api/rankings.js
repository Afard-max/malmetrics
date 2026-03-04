import { malFetch } from './malClient';

export const fetchTopAllTime = async () => {
  const endpoint = `/anime/ranking?ranking_type=all&limit=10`;
  const data = await malFetch(endpoint);
  return data.data;
};

export const fetchTopAiring = async () => {
  const endpoint = `/anime/ranking?ranking_type=airing&limit=20`;
  const data = await malFetch(endpoint);
  return data.data;
};