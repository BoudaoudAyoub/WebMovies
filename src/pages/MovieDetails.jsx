import React, { useEffect, useState } from "react";
import { ArrowLeft, Star, Calendar, Clock, Globe, Users, Award } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { tmdb, IMAGE_500, BACKDROP_1280 } from "../services/tmdb";
import { formatCurrency, formatDateLong, formatRuntime } from "../utils/format";

export default function MovieDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  const fetchMovieDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await tmdb.details(id);
      setMovie(data);
      setCast(data?.credits?.cast?.slice(0, 8) ?? []);
    } catch (e) {
      setError(e.message ?? "Error occurred while fetching movie details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4" />
          <p className="text-white text-lg">Loading movie details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center bg-gray-800 p-8 rounded-lg">
          <div className="text-red-400 text-6xl mb-4"></div>
          <h2 className="text-2xl font-bold text-white mb-2">Error</h2>
          <p className="text-gray-300 mb-4">{error}</p>
          <button
            onClick={fetchMovieDetails}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!movie) return null;

  const backdropStyle = movie.backdrop_path
    ? {
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.85)), url(${BACKDROP_1280}${movie.backdrop_path})`,
      }
    : { backgroundImage: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" };

  const poster = movie.poster_path
    ? `${IMAGE_500}${movie.poster_path}`
    : "https://via.placeholder.com/400x600/374151/9ca3af?text=Pas+d%27image";

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="relative h-screen bg-cover bg-center bg-no-repeat" style={backdropStyle}>
        <div className="absolute top-0 left-0 right-0 p-6 z-10">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center cursor-pointer space-x-2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg hover:bg-opacity-70 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black to-transparent">
          <div className="container mx-auto flex flex-col lg:flex-row items-end space-y-6 lg:space-y-0 lg:space-x-8">
            <div className="flex-shrink-0">
              <img src={poster} alt={movie.title} className="w-64 h-96 object-cover rounded-lg shadow-2xl" />
            </div>

            <div className="flex-1">
              <h1 className="text-5xl font-bold mb-2">{movie.title}</h1>
              {movie.tagline && <p className="text-xl text-gray-300 italic mb-4">{movie.tagline}</p>}

              <div className="flex flex-wrap items-center gap-6 mb-6">
                <div className="flex items-center space-x-2">
                  <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                  <span className="text-2xl font-bold">{movie.vote_average?.toFixed(1)}</span>
                  <span className="text-gray-400">({movie.vote_count} Votes)</span>
                </div>

                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <span>{formatDateLong(movie.release_date)}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <span>{formatRuntime(movie.runtime)}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {movie.genres?.map((genre) => (
                  <span key={genre.id} className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-8 py-12">
        <div className="flex space-x-8 mb-8 border-b border-gray-700">
          {["overview", "cast", "details"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 px-2 capitalize font-semibold transition-colors ${
                activeTab === tab ? "text-blue-400 border-b-2 border-blue-400" : "text-gray-400 hover:text-white"
              }`}
            >
              {tab === "overview" ? "Synopsis" : tab === "cast" ? "Distribution" : "Détails"}
            </button>
          ))}
        </div>

        {activeTab === "overview" && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Synopsis</h2>
              <p className="text-gray-300 text-lg leading-relaxed">{movie.overview || "No synopsis available."}</p>
            </div>
          </div>
        )}

        {activeTab === "cast" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Cast</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {cast.map((actor) => (
                <div key={actor.id} className="text-center">
                  <img
                    src={
                      actor.profile_path
                        ? `${IMAGE_500}${actor.profile_path}`
                        : "https://via.placeholder.com/200x300/374151/9ca3af?text=Pas+de+photo"
                    }
                    alt={actor.name}
                    className="w-full h-48 object-cover rounded-lg mb-2"
                  />
                  <h3 className="font-semibold text-sm">{actor.name}</h3>
                  <p className="text-gray-400 text-xs">{actor.character}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "details" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">Information</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Globe className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-300">Original Language:</span>
                  <span>{movie.original_language?.toUpperCase()}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-300">Popularity:</span>
                  <span>{Math.round(movie.popularity)}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Award className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-300">Status:</span>
                  <span>{movie.status}</span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6">Box Office</h2>
              <div className="space-y-4">
                <div>
                  <span className="text-gray-300">Budget:</span>
                  <p className="text-xl font-semibold">{formatCurrency(movie.budget)}</p>
                </div>
                <div>
                  <span className="text-gray-300">Revenue:</span>
                  <p className="text-xl font-semibold">{formatCurrency(movie.revenue)}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}