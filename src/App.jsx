import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import NavBar from './components/navbar/navbar';
import Home from './components/home/home';
import SeasonList from './components/season/SeasonList';
import SeasonDetail from './components/season/SeasonDetail';
import SeasonForm from './components/season/SeasonForm';
import CharactersPage from './components/characters/CharactersPage';
import CharacterDetail from './components/characters/CharacterDetail';
import MegazordPage from './components/megazord/MegazordPage';
import MegazordDetail from './components/megazord/MegazordDetail';
import Footer from './components/footer/footer';


import * as Services from './components/services/services';
import { getAllRangers } from './services/rangerService';
import { getAllMegazords } from './services/megazordService';


const App = () => {
  const [seasons, setSeasons] = useState([]);
  const [rangers, setRangers] = useState([]);
  const [megazords, setMegazords] = useState([]);

  useEffect(() => {
    const fetchSeasons = async () => {
      try {
        const fetchedSeasons = await Services.fetchSeasons();
        if (fetchedSeasons && fetchedSeasons.err) {
          throw new Error(fetchedSeasons.err);
        }
        setSeasons(fetchedSeasons || []);
      } catch (err) {
        console.error("Error fetching seasons:", err);
      }
    };

    const fetchRangers = async () => {
      try {
        const fetchedRangers = await getAllRangers();
        setRangers(fetchedRangers || []);
      } catch (err) {
        console.error("Error fetching rangers:", err);
      }
    };

    const fetchMegazords = async () => {
      try {
        const fetchedMegazords = await getAllMegazords();
        setMegazords(fetchedMegazords || []);
      } catch (err) {
        console.error("Error fetching megazords:", err);
      }
    };

    fetchSeasons();
    fetchRangers();
    fetchMegazords();
  }, []);

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home seasons={seasons} characters={rangers} megazords={megazords} />} />
        {/* Using plural routes for consistency */}
        <Route path="/seasons" element={<SeasonList />} />
        <Route path="/seasons/:id" element={<SeasonDetail />} />
        <Route path="/seasonsForm" element={<SeasonForm />} />
        <Route path="/characters" element={<CharactersPage characters={rangers} />} />
        <Route path="/characters/:id" element={<CharacterDetail />} />
        <Route path="/megazords" element={<MegazordPage megazords={megazords} />} />
        <Route path="/megazords/:id" element={<MegazordDetail />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
