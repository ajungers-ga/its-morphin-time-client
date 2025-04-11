import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/navbar/navbar';
import Home from './components/home/home';
import Season from './components/season/season';
import Characters from './components/characters/characters';
import Megazord from './components/megazord/megazord';
import Services from './services/powerRagerService';
import Footer from './components/footer/footer';

function App() {
  return (
    <> 
     <NavBar />
     <Footer />
    
    </>
    
     
  
  );
}

export default App;
