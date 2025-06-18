import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Accueil from "./pages/Accueil";
import Recherche from "./pages/Recherche";
import AjouterFilm from "./pages/AjouterFilm";
import Movie from './pages/movie';

function App() {
  return (
    <Router>
      <div className="App">        
        <Routes>
          <Route path="Film" element={<Accueil />} />
          <Route path="Film/recherche" element={<Recherche />} />
          <Route path="Film/ajouter" element={<AjouterFilm />} />
          <Route path="Film/movie" element={<Movie />} />
          {/* <Route path="Film/movie" element={<DetailsFilm />} /> */}
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;