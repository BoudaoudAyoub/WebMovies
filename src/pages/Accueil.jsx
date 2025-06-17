import React, { useState, useEffect, use } from 'react';
import { Star, Calendar, Eye, Plus, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Accueil = () => {
  const navigate = useNavigate()
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1)
  const API_KEY = '98eb4553eb509073548e11adac1efc53';
  const BASE_URL = 'https://api.themoviedb.org/3';
  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  const fetchPopularMovies = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=fr-FR&page=${page}`
      );
      
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des films');
      }
      
      const data = await response.json();
      setMovies(data.results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Date inconnue';
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const truncateText = (text, maxLength = 150) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Chargement des films populaires...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Erreur</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={fetchPopularMovies}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }


  const handleNavigation = (endPoint) => {
    navigate(endPoint)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-center space-x-8 mb-8">
          <button 
          onClick={() => navigate('/ajouter')}
          className="flex items-center space-x-2 px-6 py-3 bg-white/20 rounded-lg hover:bg-white/30 transition-all duration-200">
            <Plus size={20} />
            <span className="font-medium">Ajouter</span>
          </button>
          <button
            onClick={() => navigate('/recherche')}
          className="flex items-center space-x-2 px-6 py-3 bg-white/20 rounded-lg hover:bg-white/30 transition-all duration-200">
            <Search size={20} />
            <span className="font-medium">Rechercher</span>
          </button>
        </div>
        
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">Films Populaires</h1>
          <p className="text-xl opacity-90">Découvrez les films les plus regardés du moment</p>
        </div>
      </div>
    </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {movies.map((movie) => (
            <div 
              key={movie.id} 
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={movie.poster_path 
                    ? `${IMAGE_BASE_URL}${movie.poster_path}` 
                    : 'https://via.placeholder.com/500x750/e5e7eb/9ca3af?text=Pas+d%27image'
                  }
                  alt={movie.title}
                  className="w-full h-80 object-cover hover:scale-105 transition-transform duration-300"
                />
                
                <div className="absolute top-4 right-4 bg-black bg-opacity-75 text-white px-3 py-1 rounded-full flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-semibold">
                    {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                  {movie.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {truncateText(movie.overview)}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(movie.release_date)}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{movie.popularity ? Math.round(movie.popularity) : 0}</span>
                  </div>
                </div>

                <button 
                  onClick={() => window.location.href = `/film/${movie.id}`}
                  className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold transform hover:scale-105"
                >
                  Voir les détails
                </button>
              </div>
            </div>
          ))}
        </div>

        {movies.length > 0 && (
          <div className="text-center mt-12">
            <button 
              onClick={() => {
                setPage((page) => page + 1)
                fetchPopularMovies()
            }}
              className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300 font-semibold"
            >
              Charger plus de films
            </button>
          </div>
        )}
      </div>

      <div className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg">
            <span className="font-bold text-blue-400">{movies.length}</span> films populaires affichés
          </p>
        </div>
      </div>
    </div>
  );
};

export default Accueil;