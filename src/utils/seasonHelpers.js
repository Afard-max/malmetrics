export const getSeasonOrder = (seasonStr) => {
  const order = { winter: 1, spring: 2, summer: 3, fall: 4 };
  return order[seasonStr?.toLowerCase()] || 0;
};

export const extractUniqueSeasons = (animeList) => {
  if (!animeList || !Array.isArray(animeList)) return [];
  
  const seasons = new Set();
  animeList.forEach(anime => {
    if (anime.node?.start_season) {
      const { year, season } = anime.node.start_season;
      if (year && season) {
        seasons.add(`${year}-${season}`);
      }
    }
  });
  
  return Array.from(seasons).sort((a, b) => {
    const [yearA, seasonA] = a.split('-');
    const [yearB, seasonB] = b.split('-');
    
    if (yearA !== yearB) return parseInt(yearB) - parseInt(yearA);
    return getSeasonOrder(seasonB) - getSeasonOrder(seasonA);
  });
};