import { useQuery } from '@tanstack/react-query';
import { fetchTopAllTime, fetchTopAiring } from '../api/rankings';

const STALE_TIME = 15 * 60 * 1000;

export const useTopAllTime = () => {
  return useQuery({
    queryKey: ['topAllTime'],
    queryFn: fetchTopAllTime,
    staleTime: STALE_TIME,
    refetchOnWindowFocus: false
  });
};

export const useTopAiring = () => {
  return useQuery({
    queryKey: ['topAiring'],
    queryFn: fetchTopAiring,
    staleTime: STALE_TIME,
    refetchOnWindowFocus: false
  });
};