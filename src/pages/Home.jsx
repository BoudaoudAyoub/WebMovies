import React, { useEffect, useState } from "react";
import { Plus, Search as SearchIcon, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { tmdb } from "../services/tmdb";
import MovieCard from "../components/MovieCard";

export default function Home() {
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);

  const fetchPopular = async (pageToLoad, append = false) => {
    try {
      setError(null);
      if (append) setLoadingMore(true);
      else setLoading(true);

      const data = await tmdb.popular(pageToLoad);
      const results = data?.results ?? [];

      setMovies((prev) => (append ? [...prev, ...results] : results));
    } catch (e) {
      setError(e.message ?? "Error occurred while fetching movies");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchPopular(1, false);
  }, []);

  const handleLoadMore = async () => {
    const next = page + 1;
    setPage(next);
    await fetchPopular(next, true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading popular movies...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-md">
          <div className="text-red-500 text-6xl mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Erreur</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => fetchPopular(1, false)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-gradient-to-r from-[#002E50] to-[#1A1A1A] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-8 text-[#FEDC9C]">POPCORN</h1>
            <p className="text-md opacity-90 w-1/3 mx-auto">Explore the most popular and trending movies right now, updated in real-time from global audiences.</p>
          </div>
        </div>
      </div>

      <div className="group">
        <button
          onClick={() => navigate(ROUTES.SEARCH)}
          className="absolute right-10 top-1/2 flex items-center justify-center p-4 rounded-full bg-white/20 backdrop-blur-md shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300 border border-gray-200 cursor-pointer"
        >
          <SearchIcon size={22} />
        </button>
        <span className="absolute right-9 top-115 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 bg-black text-white text-sm px-3 py-1 rounded-lg shadow-md whitespace-nowrap">
          Search
        </span>
      </div>

      <div className="group">
        <button
          onClick={() => navigate(ROUTES.ADD)}
          className="absolute right-10 bottom-1/3 flex items-center justify-center p-4 rounded-full bg-white/20 backdrop-blur-md shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300 border border-gray-200 cursor-pointer"
        >
          <Plus size={22} />
        </button>
        <span className="absolute right-6 bottom-90 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 bg-black text-white text-sm px-3 py-1 rounded-lg shadow-md whitespace-nowrap">
          Add movie
        </span>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onDetailsClick={() => navigate(ROUTES.DETAILS(movie.id))}
            />
          ))}
        </div>

        {movies.length > 0 && (
          <div className="text-center mt-12">
            <button
              onClick={handleLoadMore}
              disabled={loadingMore}
              className="bg-white cursor-pointer text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
            >
              {loadingMore ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  Loading...
                </>
              ) : (
                "Load More Movies"
              )}
            </button>
          </div>
        )}
      </div>

      <div className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg">
            <span className="font-bold text-blue-400">{movies.length}</span> popular movies displayed
          </p>
        </div>
      </div>
    </div>
  );
}