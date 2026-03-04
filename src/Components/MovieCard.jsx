import { Star, Calendar, Eye } from "lucide-react";
import { IMAGE_500 } from "../services/tmdb";
import { formatDateLong, truncateText } from "../utils/format";

export default function MovieCard({ movie, onDetailsClick, showPopularity = true }) {
  const poster = movie.poster_path
    ? `${IMAGE_500}${movie.poster_path}`
    : "https://via.placeholder.com/500x750/e5e7eb/9ca3af?text=Pas+d%27image";

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
      <div className="relative overflow-hidden">
        <img
          src={poster}
          alt={movie.title}
          className="w-full h-80 object-cover hover:scale-105 transition-transform duration-300"
        />

        <div className="absolute top-4 right-4 bg-black bg-opacity-75 text-white px-3 py-1 rounded-full flex items-center space-x-1">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-semibold">
            {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="h-[150px]">
          <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
            {movie.title}
          </h3>

          <p className="text-gray-600 text-sm mb-4 leading-relaxed">
            {truncateText(movie.overview, 100) || "Aucune description disponible."}
          </p>

          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{formatDateLong(movie.release_date)}</span>
            </div>

            {showPopularity && (
              <div className="flex items-center space-x-1">
                <Eye className="w-4 h-4" />
                <span>{movie.popularity ? Math.round(movie.popularity) : 0}</span>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={onDetailsClick}
          className="cursor-pointer block w-full bg-gradient-to-r from-[#002E50] to-[#1A1A1A] text-white text-center py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold transform hover:scale-105"
        >
          View Details
        </button>
      </div>
    </div>
  );
}