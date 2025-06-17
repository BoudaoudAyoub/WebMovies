import React, { useState } from 'react';
import { Plus, Check, AlertCircle, Calendar, FileText, Film, Save, ArrowLeft } from 'lucide-react';

const AjouterFilm = () => {
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    dateSortie: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.titre.trim()) {
      newErrors.titre = 'Le titre est obligatoire';
    } else if (formData.titre.trim().length < 2) {
      newErrors.titre = 'Le titre doit contenir au moins 2 caractères';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'La description est obligatoire';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'La description doit contenir au moins 10 caractères';
    } else if (formData.description.trim().length > 1000) {
      newErrors.description = 'La description ne peut pas dépasser 1000 caractères';
    }

    if (formData.dateSortie) {
      const selectedDate = new Date(formData.dateSortie);
      const currentDate = new Date();
      const minDate = new Date('1888-01-01'); // Premier film de l'histoire

      if (selectedDate > currentDate) {
        newErrors.dateSortie = 'La date de sortie ne peut pas être dans le futur';
      } else if (selectedDate < minDate) {
        newErrors.dateSortie = 'La date de sortie semble incorrecte';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const newMovie = {
        id: Date.now(),
        titre: formData.titre.trim(),
        description: formData.description.trim(),
        dateSortie: formData.dateSortie || null,
        dateAjout: new Date().toISOString()
      };

      setSavedMovies(prev => [newMovie, ...prev]);

      setSubmitSuccess(true);

      setTimeout(() => {
        setFormData({
          titre: '',
          description: '',
          dateSortie: ''
        });
        setSubmitSuccess(false);
      }, 2000);

    } catch (error) {
      setErrors({ submit: 'Une erreur est survenue lors de la sauvegarde' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      titre: '',
      description: '',
      dateSortie: ''
    });
    setErrors({});
    setSubmitSuccess(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-4 mb-4">
            <button 
              onClick={() => window.history.back()}
              className="flex items-center space-x-2  bg-opacity-20  px-4 py-2 rounded-lg hover:bg-opacity-30 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Retour</span>
            </button>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Plus className="w-10 h-10" />
              <Film className="w-10 h-10" />
            </div>
            <h1 className="text-4xl font-bold mb-2">Ajouter un Nouveau Film</h1>
            <p className="text-xl opacity-90">Partagez vos découvertes cinématographiques</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {submitSuccess && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8 animate-fade-in">
              <div className="flex items-center space-x-3">
                <div className="bg-green-500 rounded-full p-1">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-green-800">Film ajouté avec succès !</h3>
                  <p className="text-green-600">Le film "{formData.titre}" a été sauvegardé dans votre collection.</p>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="titre" className="block text-sm font-semibold text-gray-700 mb-2">
                  <span className="flex items-center space-x-2">
                    <Film className="w-4 h-4" />
                    <span>Titre du film</span>
                    <span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  id="titre"
                  name="titre"
                  value={formData.titre}
                  onChange={handleInputChange}
                  placeholder="Ex: Inception, The Matrix, Pulp Fiction..."
                  className={`w-full px-4 py-3 border-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.titre 
                      ? 'border-red-300 bg-red-50 focus:border-red-500' 
                      : 'border-gray-200 focus:border-blue-500'
                  }`}
                />
                {errors.titre && (
                  <div className="flex items-center space-x-2 mt-2 text-red-600">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm">{errors.titre}</span>
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                  <span className="flex items-center space-x-2">
                    <FileText className="w-4 h-4" />
                    <span>Description</span>
                    <span className="text-red-500">*</span>
                  </span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="6"
                  placeholder="Décrivez l'histoire, les thèmes, votre avis... (minimum 10 caractères)"
                  className={`w-full px-4 py-3 border-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical ${
                    errors.description 
                      ? 'border-red-300 bg-red-50 focus:border-red-500' 
                      : 'border-gray-200 focus:border-blue-500'
                  }`}
                />
                <div className="flex justify-between items-center mt-2">
                  {errors.description ? (
                    <div className="flex items-center space-x-2 text-red-600">
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-sm">{errors.description}</span>
                    </div>
                  ) : (
                    <div></div>
                  )}
                  <span className={`text-sm ${
                    formData.description.length > 1000 ? 'text-red-500' : 'text-gray-500'
                  }`}>
                    {formData.description.length}/1000
                  </span>
                </div>
              </div>

              <div>
                <label htmlFor="dateSortie" className="block text-sm font-semibold text-gray-700 mb-2">
                  <span className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>Date de sortie</span>
                    <span className="text-gray-500 text-xs">(optionnel)</span>
                  </span>
                </label>
                <input
                  type="date"
                  id="dateSortie"
                  name="dateSortie"
                  value={formData.dateSortie}
                  onChange={handleInputChange}
                  max={new Date().toISOString().split('T')[0]}
                  className={`w-full px-4 py-3 border-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.dateSortie 
                      ? 'border-red-300 bg-red-50 focus:border-red-500' 
                      : 'border-gray-200 focus:border-blue-500'
                  }`}
                />
                {errors.dateSortie && (
                  <div className="flex items-center space-x-2 mt-2 text-red-600">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm">{errors.dateSortie}</span>
                  </div>
                )}
              </div>

              {errors.submit && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 text-red-600">
                    <AlertCircle className="w-5 h-5" />
                    <span>{errors.submit}</span>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-6 rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Sauvegarde...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      <span>Ajouter le film</span>
                    </>
                  )}
                </button>
                
                <button
                  type="button"
                  onClick={handleReset}
                  disabled={isSubmitting}
                  className="flex-1 sm:flex-none bg-gray-200 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Réinitialiser
                </button>
              </div>
            </form>
          </div>

          {savedMovies.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
                <Film className="w-6 h-6" />
                <span>Films ajoutés récemment ({savedMovies.length})</span>
              </h2>
              
              <div className="space-y-4">
                {savedMovies.map((movie) => (
                  <div key={movie.id} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">{movie.titre}</h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{movie.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          {movie.dateSortie && (
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>Sortie: {new Date(movie.dateSortie).toLocaleDateString('fr-FR')}</span>
                            </div>
                          )}
                          <div className="flex items-center space-x-1">
                            <Plus className="w-4 h-4" />
                            <span>Ajouté: {new Date(movie.dateAjout).toLocaleDateString('fr-FR')}</span>
                          </div>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                          Nouveau
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AjouterFilm;