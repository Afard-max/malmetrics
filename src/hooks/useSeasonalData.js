import { useQuery } from '@tanstack/react-query';
import { fetchCurrentSeason } from '../api/seasonal';

const STALE_TIME = 15 * 60 * 1000;

export const useSeasonalData = () => {
  return useQuery({
    queryKey: ['currentSeason'],
    queryFn: fetchCurrentSeason,
    staleTime: STALE_TIME,
    refetchOnWindowFocus: false
  });
};