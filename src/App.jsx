// src/App.jsx
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/navbar/navbar';
import Home from './components/home/home';
import Season from './components/season/season';
import Characters from './components/characters/characters';
import Megazord from './components/megazord/megazord';
import * as Services from './components/services/services';
import Footer from './components/footer/footer';
import { getAllRangers } from './services/rangerService'; // added by AJ, updating connection to backend

const App = ()=> {
  const [seasons, setSeasons] = useState([]);
  const [rangers, setRangers] = useState([]); // added by AJ, updating connection to backend

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

    // BELOW = added by AJ, updating connection to backend
    const fetchRangers = async () => {
      try {
        const fetchedRangers = await getAllRangers();
        setRangers(fetchedRangers || []);
      } catch (err) {
        console.error("Error fetching rangers:", err);
      }
    };

    fetchSeasons();
    fetchRangers(); // added by AJ, updating connection to backend
  }, []);

  const handleSelect = (selector) => {
    setSelected(selector);
    // Close the form if it's open when a new pet is selected.
    setIsFormOpen(false);
  };

  const handleFormView = () => {
    setIsFormOpen(!isFormOpen);
  };

  return (
  <>
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home seasons={seasons}  handleSelect={handleSelect}/>} />
        <Route path="/season" element={<Season />} />
        <Route path="/characters" element={<Characters rangers={rangers} />} />
        <Route path="/megazord" element={<Megazord />} />
        {/* <Route path="/services" element={<Services />} /> */}
      </Routes>
      <Footer />
    </Router>
     <Season  />
     </>
  );
}

export default App;