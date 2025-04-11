import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/navbar/navbar';
import Home from './components/home/home';
import Season from './components/season/season';
import Characters from './components/characters/characters';
import Megazord from './components/megazord/megazord';
import Services from './services/powerRagerService';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/season" element={<Season />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/megazord" element={<Megazord />} />
        <Route path="/services" element={<Services />} />
      </Routes>
    </Router>
  );
}

export default App;
