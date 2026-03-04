import React, { useEffect, useMemo, useState } from "react";
import { Search, X, Loader, TrendingUp, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { tmdb } from "../services/tmdb";
import MovieCard from "../components/MovieCard";

export default function SearchPage() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [filters, setFilters] = useState({ year: "" });

  useEffect(() => {
    const run = async () => {
      try {
        const trend = await tmdb.trendingWeek();
        setTrendingMovies(trend?.results?.slice(0, 6) ?? []);
      } catch (e) {
        setError(e.message ?? "Error fetching trending movies");
      }
    };
    run();
  }, []);

  // debounce search
  useEffect(() => {
    if (!searchTerm.trim()) {
      setMovies([]);
      setCurrentPage(1);
      setTotalPages(0);
      setError(null);
      return;
    }

    const t = setTimeout(() => {
      searchMovies(searchTerm, 1);
    }, 500);

    return () => clearTimeout(t);
  }, [searchTerm, filters.year]);

  const searchMovies = async (query, page = 1, append = false) => {
    if (!query.trim()) return;

    try {
      setLoading(true);
      setError(null);

      const data = await tmdb.search(query, page, filters.year || undefined);
      const results = data?.results ?? [];

      setMovies((prev) => (append ? [...prev, ...results] : results));
      setCurrentPage(data?.page ?? 1);
      setTotalPages(data?.total_pages ?? 0);
    } catch (e) {
      setError(e.message ?? "Search error occurred");
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (loading) return;
    if (currentPage >= totalPages) return;
    searchMovies(searchTerm, currentPage + 1, true);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setMovies([]);
    setCurrentPage(1);
    setTotalPages(0);
    setError(null);
  };

  const hasResults = movies.length > 0;
  const showEmpty = searchTerm.trim() && !loading && !error && movies.length === 0;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-gradient-to-r from-[#002E50] to-[#1A1A1A] text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-8">Search a movie</h1>

          <div className="flex items-center space-x-4 mb-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center cursor-pointer space-x-2 bg-white/20 px-4 py-2 rounded-lg hover:bg-white/30 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
          </div>

          <div className="max-w-2xl mx-auto relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Type movie name..."
                className="w-full pl-12 pr-12 py-4 text-gray-800 bg-white rounded-full shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300 text-lg"
              />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {loading && movies.length === 0 && (
          <div className="text-center py-12">
            <Loader className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">Searching...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <div className="text-red-500 text-6xl mb-4"></div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => searchMovies(searchTerm, 1, false)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {hasResults && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Result for "{searchTerm}" ({movies.length})
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onDetailsClick={() => navigate(ROUTES.DETAILS(movie.id))}
                  showPopularity={false}
                />
              ))}
            </div>

            {currentPage < totalPages && (
              <div className="text-center">
                <button
                  onClick={handleLoadMore}
                  disabled={loading}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 mx-auto"
                >
                  {loading ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin" />
                      <span>Loading...</span>
                    </>
                  ) : (
                    <span>Load More Results</span>
                  )}
                </button>
              </div>
            )}
          </div>
        )}

        {showEmpty && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4"></div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No Results Found</h2>
            <p className="text-gray-600">
              No movies found for "{searchTerm}". Try different keywords.
            </p>
          </div>
        )}

        {!searchTerm && trendingMovies.length > 0 && (
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <TrendingUp className="w-6 h-6 text-orange-500" />
              <h2 className="text-2xl font-bold text-gray-800">Trending This Week</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onDetailsClick={() => navigate(ROUTES.DETAILS(movie.id))}
                  showPopularity={false}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}