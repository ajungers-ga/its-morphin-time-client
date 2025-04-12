import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/navbar/navbar';
import Home from './components/home/home';
import Season from './components/season/season';
import Characters from './components/characters/characters';
import Megazord from './components/megazord/megazord';
import * as Services from './components/services/services';
import Footer from './components/footer/footer';
import { getAllRangers } from './services/rangerService';
import { getAllMegazords } from './services/megazordService';

const App = () => {
  const [seasons, setSeasons] = useState([]);
  const [rangers, setRangers] = useState([]);
  const [megazords, setMegazords] = useState([]);
  const [selected, setSelected] = useState(null);

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

  const handleSelect = (selected) => {
    setSelected(selected);
  };

  const handleFormView = () => {
    setIsFormOpen(!isFormOpen);
  };

  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home seasons={seasons} handleSelect={handleSelect} />} />
          <Route path="/season" element={<Season selected={selected} />} />
          <Route path="/characters" element={<Characters rangers={rangers} />} />
          <Route path="/megazord" element={<Megazord megazords={megazords} />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default App;
