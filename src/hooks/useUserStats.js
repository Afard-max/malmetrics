import { useQuery } from '@tanstack/react-query';
import { fetchUserAnimeList } from '../api/userList';

const STALE_TIME = 15 * 60 * 1000;

export const useUserStats = () => {
  const username = localStorage.getItem('mal_username');
  
  return useQuery({
    queryKey: ['userAnimeList', username],
    queryFn: () => fetchUserAnimeList(username),
    staleTime: STALE_TIME,
    refetchOnWindowFocus: false
  });
};