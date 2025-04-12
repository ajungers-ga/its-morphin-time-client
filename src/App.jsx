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

const App = ()=> {
  const [seasons, setSeasons] = useState([]);
  // src/App.jsx

  const [selected, setSelected] = useState(null);

  const handleSelect =(selected) =>{
    setSelected(selected)

  }


  useEffect(() => {
    const fetchSeasons = async () => {
      try {
        const fetchedSeasons = await Services.fetchSeasons(); // Assuming you have a 'fetchSeasons' function in your services
        if (fetchedSeasons && fetchedSeasons.err) {
          throw new Error(fetchedSeasons.err);
        }
        setSeasons(fetchedSeasons || []);
      } catch (err) {
        console.error("Error fetching seasons:", err);
      }
    };

    fetchSeasons();
  }, []);

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home seasons={seasons} handleSelect={handleSelect}/>} />
        <Route path="/season" element={<Season handleSelect={handleSelect} />} />
        <Route path="/characters" element={<Characters handleSelect={handleSelect}/>} />
        <Route path="/megazord" element={<Megazord handleSelect={handleSelect}/>} />
        <Route path="/services" element={<Services handleSelect={handleSelect}/>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;