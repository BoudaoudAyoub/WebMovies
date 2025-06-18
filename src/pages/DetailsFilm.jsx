import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star, Calendar, Clock, Globe, Users, Award, Play, Heart, Bookmark } from 'lucide-react';
import { useLocation, useParams } from 'react-router-dom';

const DetailsFilm = () => { 

return (<div className='text-lg w-full p-5'>Hello World...</div>)

  // const movieId = "1087891";
  // console.info(movieId);
  // const [movie, setMovie] = useState(null);
  // const [cast, setCast] = useState([]);
  // const [videos, setVideos] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  // const [activeTab, setActiveTab] = useState('overview');


  // // Clé API TMDb - Remplacez par votre propre clé
  // const API_KEY = '98eb4553eb509073548e11adac1efc53';
  // const BASE_URL = 'https://api.themoviedb.org/3';
  // const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
  // const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/w1280';

  // useEffect(() => {
  //   fetchMovieDetails();
  // }, [movieId]);

  // const fetchMovieDetails = async () => {
  //   try {
  //     setLoading(true);
      
  //     const movieResponse = await fetch(
  //       `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=fr-FR&append_to_response=credits,videos`
  //     );
      
  //     if (!movieResponse.ok) {
  //       throw new Error('Film non trouvé');
  //     }
      
  //     const movieData = await movieResponse.json();
  //     setMovie(movieData);
  //     setCast(movieData.credits.cast.slice(0, 8));
  //     setVideos(movieData.videos.results.filter(video => video.type === 'Trailer').slice(0, 3));
      
  //   } catch (err) {
  //     setError(err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const formatRuntime = (minutes) => {
  //   if (!minutes) return 'Durée inconnue';
  //   const hours = Math.floor(minutes / 60);
  //   const mins = minutes % 60;
  //   return `${hours}h ${mins}min`;
  // };

  // const formatDate = (dateString) => {
  //   if (!dateString) return 'Date inconnue';
  //   return new Date(dateString).toLocaleDateString('fr-FR', {
  //     year: 'numeric',
  //     month: 'long',
  //     day: 'numeric'
  //   });
  // };

  // const formatCurrency = (amount) => {
  //   if (!amount) return 'Non disponible';
  //   return new Intl.NumberFormat('fr-FR', {
  //     style: 'currency',
  //     currency: 'USD',
  //     minimumFractionDigits: 0
  //   }).format(amount);
  // };

  // if (loading) {
  //   return (
  //     <div className="min-h-screen bg-gray-900 flex items-center justify-center">
  //       <div className="text-center">
  //         <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
  //         <p className="text-white text-lg">Chargement des détails...</p>
  //       </div>
  //     </div>
  //   );
  // }

  // if (error) {
  //   return (
  //     <div className="min-h-screen bg-gray-900 flex items-center justify-center">
  //       <div className="text-center bg-gray-800 p-8 rounded-lg">
  //         <div className="text-red-400 text-6xl mb-4">⚠️</div>
  //         <h2 className="text-2xl font-bold text-white mb-2">Erreur</h2>
  //         <p className="text-gray-300 mb-4">{error}</p>
  //         <button 
  //           onClick={fetchMovieDetails}
  //           className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
  //         >
  //           Réessayer
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }

  // if (!movie) return null;

  // return (
  //   <div className="min-h-screen bg-gray-900 text-white">
  //     <div 
  //       className="relative h-screen bg-cover bg-center bg-no-repeat"
  //       style={{
  //         backgroundImage: movie.backdrop_path 
  //           ? `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.8)), url(${BACKDROP_BASE_URL}${movie.backdrop_path})`
  //           : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  //       }}
  //     >
  //       <div className="absolute top-0 left-0 right-0 p-6 z-10">
  //         <button 
  //           onClick={() => window.history.back()}
  //           className="flex items-center space-x-2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg hover:bg-opacity-70 transition-all"
  //         >
  //           <ArrowLeft className="w-5 h-5" />
  //           <span>Retour</span>
  //         </button>
  //       </div>

  //       <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black to-transparent">
  //         <div className="container mx-auto flex flex-col lg:flex-row items-end space-y-6 lg:space-y-0 lg:space-x-8">
  //           <div className="flex-shrink-0">
  //             <img 
  //               src={movie.poster_path 
  //                 ? `${IMAGE_BASE_URL}${movie.poster_path}` 
  //                 : 'https://via.placeholder.com/400x600/374151/9ca3af?text=Pas+d%27image'
  //               }
  //               alt={movie.title}
  //               className="w-64 h-96 object-cover rounded-lg shadow-2xl"
  //             />
  //           </div>

  //           <div className="flex-1">
  //             <h1 className="text-5xl font-bold mb-2">{movie.title}</h1>
  //             {movie.tagline && (
  //               <p className="text-xl text-gray-300 italic mb-4">{movie.tagline}</p>
  //             )}
              
  //             <div className="flex flex-wrap items-center space-x-6 mb-6">
  //               <div className="flex items-center space-x-2">
  //                 <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
  //                 <span className="text-2xl font-bold">{movie.vote_average?.toFixed(1)}</span>
  //                 <span className="text-gray-400">({movie.vote_count} votes)</span>
  //               </div>
                
  //               <div className="flex items-center space-x-2">
  //                 <Calendar className="w-5 h-5 text-gray-400" />
  //                 <span>{formatDate(movie.release_date)}</span>
  //               </div>
                
  //               <div className="flex items-center space-x-2">
  //                 <Clock className="w-5 h-5 text-gray-400" />
  //                 <span>{formatRuntime(movie.runtime)}</span>
  //               </div>
  //             </div>

  //             <div className="flex flex-wrap gap-2 mb-6">
  //               {movie.genres?.map(genre => (
  //                 <span 
  //                   key={genre.id}
  //                   className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm"
  //                 >
  //                   {genre.name}
  //                 </span>
  //               ))}
  //             </div>

  //           </div>
  //         </div>
  //       </div>
  //     </div>

  //     <div className="container mx-auto px-8 py-12">
  //       <div className="flex space-x-8 mb-8 border-b border-gray-700">
  //         {['overview', 'cast', 'details'].map(tab => (
  //           <button
  //             key={tab}
  //             onClick={() => setActiveTab(tab)}
  //             className={`pb-4 px-2 capitalize font-semibold transition-colors ${
  //               activeTab === tab 
  //                 ? 'text-blue-400 border-b-2 border-blue-400' 
  //                 : 'text-gray-400 hover:text-white'
  //             }`}
  //           >
  //             {tab === 'overview' ? 'Synopsis' : tab === 'cast' ? 'Distribution' : 'Détails'}
  //           </button>
  //         ))}
  //       </div>

  //       {activeTab === 'overview' && (
  //         <div className="space-y-8">
  //           <div>
  //             <h2 className="text-2xl font-bold mb-4">Synopsis</h2>
  //             <p className="text-gray-300 text-lg leading-relaxed">
  //               {movie.overview || 'Aucun synopsis disponible.'}
  //             </p>
  //           </div>
  //         </div>
  //       )}

  //       {activeTab === 'cast' && (
  //         <div>
  //           <h2 className="text-2xl font-bold mb-6">Distribution principale</h2>
  //           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
  //             {cast.map(actor => (
  //               <div key={actor.id} className="text-center">
  //                 <img 
  //                   src={actor.profile_path 
  //                     ? `${IMAGE_BASE_URL}${actor.profile_path}` 
  //                     : 'https://via.placeholder.com/200x300/374151/9ca3af?text=Pas+de+photo'
  //                   }
  //                   alt={actor.name}
  //                   className="w-full h-48 object-cover rounded-lg mb-2"
  //                 />
  //                 <h3 className="font-semibold text-sm">{actor.name}</h3>
  //                 <p className="text-gray-400 text-xs">{actor.character}</p>
  //               </div>
  //             ))}
  //           </div>
  //         </div>
  //       )}

  //       {activeTab === 'details' && (
  //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
  //           <div>
  //             <h2 className="text-2xl font-bold mb-6">Informations</h2>
  //             <div className="space-y-4">
  //               <div className="flex items-center space-x-3">
  //                 <Globe className="w-5 h-5 text-gray-400" />
  //                 <span className="text-gray-300">Langue originale:</span>
  //                 <span>{movie.original_language?.toUpperCase()}</span>
  //               </div>
  //               <div className="flex items-center space-x-3">
  //                 <Users className="w-5 h-5 text-gray-400" />
  //                 <span className="text-gray-300">Popularité:</span>
  //                 <span>{Math.round(movie.popularity)}</span>
  //               </div>
  //               <div className="flex items-center space-x-3">
  //                 <Award className="w-5 h-5 text-gray-400" />
  //                 <span className="text-gray-300">Statut:</span>
  //                 <span>{movie.status}</span>
  //               </div>
  //             </div>
  //           </div>

  //           <div>
  //             <h2 className="text-2xl font-bold mb-6">Box Office</h2>
  //             <div className="space-y-4">
  //               <div>
  //                 <span className="text-gray-300">Budget:</span>
  //                 <p className="text-xl font-semibold">{formatCurrency(movie.budget)}</p>
  //               </div>
  //               <div>
  //                 <span className="text-gray-300">Recettes:</span>
  //                 <p className="text-xl font-semibold">{formatCurrency(movie.revenue)}</p>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       )}
  //     </div>
  //   </div>
  // );
};

export default DetailsFilm;