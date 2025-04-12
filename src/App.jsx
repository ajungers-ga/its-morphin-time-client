// src/App.jsx
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/navbar/navbar';
import Home from './components/home/home';
import Season from './components/season/season';
import SeasonList from './components/season/SeasonList';
import CharactersPage from './components/characters/CharactersPage'; // Rename if needed
import CharacterDetail from './components/characters/CharacterDetail'; // Create this component
import MegazordPage from './components/megazord/MegazordPage'; // Rename if needed
import MegazordDetail from './components/megazord/MegazordDetail'; // Create this component
import * as Services from './components/services/services';
import Footer from './components/footer/footer';

const App = () => {
  const [seasons, setSeasons] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [megazords, setMegazords] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const fetchedSeasons = await Services.fetchSeasons();
      if (!fetchedSeasons.err) setSeasons(fetchedSeasons);
      const fetchedCharacters = await Services.fetchCharacters();
      if (!fetchedCharacters.err) setCharacters(fetchedCharacters);
      const fetchedMegazords = await Services.fetchMegazords();
      if (!fetchedMegazords.err) setMegazords(fetchedMegazords);
    };

    loadData();
  }, []);

  const handleSelect = (item) => {
    setSelected(item);
  };

  return (
    
    <Router>
    <NavBar />
    <Routes>
      <Route
        path="/"
        element={<Home seasons={seasons} characters={characters} megazords={megazords} />}
      />
      <Route path="/season" element={<SeasonList />} />
      <Route path="/season/:id" element={<Season />} />
      <Route path="/character/:id" element={<CharacterDetail />} />
      <Route path="/characters" element={<CharactersPage characters={characters} />} />
      <Route path="/megazords" element={<MegazordPage megazords={megazords} />} />
      <Route path="/megazord/:id" element={<MegazordDetail />} />
    </Routes>
    <Footer />
  </Router>
  
  );
};

export default App;