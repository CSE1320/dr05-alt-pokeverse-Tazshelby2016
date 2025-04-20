import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./pages/Layout";
import Home from './pages/Home';
import PokemonCardPage from './pages/PokemonCard';
import Pokedex from "./pages/Pokedex";
import GPSViewer from "./pages/GPSViewer";

import './App.scss';
import 'semantic-ui-css/semantic.min.css'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="/" element={<Home />} />
          <Route path="/card" element={<PokemonCardPage />} />
          <Route path="gps" element={<GPSViewer />} />
          <Route path="pokedex" element={<Pokedex />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
