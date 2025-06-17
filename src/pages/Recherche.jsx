import React, { useState, useEffect } from 'react';
import { Search, Filter, X, Star, Calendar, Loader, TrendingUp, ArrowLeft } from 'lucide-react';

const Recherche = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    year: '',
    genre: '',
    sortBy: 'popularity.desc'
  });
  const [genres, setGenres] = useState([]);

  const API_KEY = '98eb4553eb509073548e11adac1efc53';
  const BASE_URL = 'https://api.themoviedb.org/3';
  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

  useEffect(() => {
    fetchGenres();
    fetchTrendingMovies();
  }, []);

  useEffect(() => {
    if (searchTerm.trim()) {
      const delayedSearch = setTimeout(() => {
        searchMovies(searchTerm, 1);
      }, 500);

      return () => clearTimeout(delayedSearch);
    } else {
      setMovies([]);
      setCurrentPage(1);
      setTotalPages(0);
    }
  }, [searchTerm]);

  const fetchGenres = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=fr-FR`
      );
      const data = await response.json();
      setGenres(data.genres || []);
    } catch (err) {
      console.error('Erreur lors du chargement des genres:', err);
    }
  };

  const fetchTrendingMovies = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=fr-FR`
      );
      const data = await response.json();
      setTrendingMovies(data.results?.slice(0, 6) || []);
    } catch (err) {
      console.error('Erreur lors du chargement des tendances:', err);
    }
  };

  const searchMovies = async (query, page = 1) => {
    if (!query.trim()) return;

    try {
      setLoading(true);
      setError(null);

      let url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=fr-FR&query=${encodeURIComponent(query)}&page=${page}`;
      
      if (filters.year) {
        url += `&year=${filters.year}`;
      }

      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Erreur lors de la recherche');
      }

      const data = await response.json();
      
      if (page === 1) {
        setMovies(data.results || []);
      } else {
        setMovies(prev => [...prev, ...(data.results || [])]);
      }
      
      setCurrentPage(data.page || 1);
      setTotalPages(data.total_pages || 0);
      
    } catch (err) {
      setError(err.message);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (currentPage < totalPages && !loading) {
      searchMovies(searchTerm, currentPage + 1);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setMovies([]);
    setCurrentPage(1);
    setTotalPages(0);
    setError(null);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Date inconnue';
    return new Date(dateString).getFullYear();
  };

  const truncateText = (text, maxLength = 120) => {
    if (!text) return 'Aucune description disponible.';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const MovieCard = ({ movie }) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
      <div className="relative">
        <img 
          src={movie.poster_path 
            ? `${IMAGE_BASE_URL}${movie.poster_path}` 
            : 'https://via.placeholder.com/500x750/e5e7eb/9ca3af?text=Pas+d%27image'
          }
          alt={movie.title}
          className="w-full h-80 object-cover"
        />
        
        <div className="absolute top-3 right-3 bg-black bg-opacity-75 text-white px-2 py-1 rounded-full flex items-center space-x-1">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-semibold">
            {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
          {movie.title}
        </h3>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(movie.release_date)}</span>
          </div>
          <span className="text-xs bg-gray-100 px-2 py-1 rounded">
            {movie.original_language?.toUpperCase()}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          {truncateText(movie.overview)}
        </p>

        <button 
          onClick={() => window.location.href = `details/${movie.id}`}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Voir les détails
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-8">Rechercher des Films</h1>
          <div className="flex items-center space-x-4 mb-4">
            <button 
              onClick={() => window.history.back()}
              className="flex items-center space-x-2  bg-opacity-20  px-4 py-2 rounded-lg hover:bg-opacity-30 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Retour</span>
            </button>
          </div>
          <div className="max-w-2xl mx-auto relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher un film (titre, réalisateur, acteur...)"
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
            <p className="text-gray-600">Recherche en cours...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Erreur</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button 
              onClick={() => searchMovies(searchTerm, 1)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Réessayer
            </button>
          </div>
        )}

        {movies.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Résultats pour "{searchTerm}" ({movies.length} films)
              </h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {movies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
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
                      <span>Chargement...</span>
                    </>
                  ) : (
                    <span>Charger plus de résultats</span>
                  )}
                </button>
              </div>
            )}
          </div>
        )}

        {searchTerm && movies.length === 0 && !loading && !error && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🎬</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Aucun résultat</h2>
            <p className="text-gray-600">
              Aucun film trouvé pour "{searchTerm}". Essayez avec d'autres mots-clés.
            </p>
          </div>
        )}

        {!searchTerm && trendingMovies.length > 0 && (
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <TrendingUp className="w-6 h-6 text-orange-500" />
              <h2 className="text-2xl font-bold text-gray-800">Tendances de la semaine</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingMovies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recherche;