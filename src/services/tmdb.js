const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const IMAGE_500 = "https://image.tmdb.org/t/p/w500";
export const BACKDROP_1280 = "https://image.tmdb.org/t/p/w1280";

async function request(path) {
  const res = await fetch(`${BASE_URL}${path}${path.includes("?") ? "&" : "?"}api_key=${API_KEY}&language=fr-FR`);
  if (!res.ok) throw new Error("Erreur API TMDB");
  return res.json();
}

export const tmdb = {
  popular: (page = 1) => request(`/movie/popular?page=${page}`),
  details: (id) => request(`/movie/${id}?append_to_response=credits,videos`),
  search: (query, page = 1, year) =>
    request(`/search/movie?query=${encodeURIComponent(query)}&page=${page}${year ? `&year=${year}` : ""}`),
  trendingWeek: () => request(`/trending/movie/week`),
  genres: () => request(`/genre/movie/list`),
};