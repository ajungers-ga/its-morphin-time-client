import React from 'react';
import './CharacterDetail.css';

const Characters = () => {
    return (
      <div className="character-detail-container">
      <div className="character-info">
        <img src="https://via.placeholder.com/200" alt="Character Placeholder" className="character-image" />
        <h2>Tommy Oliver</h2>
        <p><strong>Ranger Color:</strong> Green (later White)</p>
        <p><strong>Season(s):</strong> Mighty Morphin Power Rangers, Power Rangers Zeo, Power Rangers Turbo, Power Rangers Wild Force, Power Rangers Dino Thunder, Power Rangers Super Megaforce</p>
        <p><strong>Zord(s):</strong> Dragonzord, Tigerzord, Falconzord, White Tigerzord, Dino Stegazord, Black Dino Stegozord, Super Dino Megazord, Legendary Megazord</p>
        <p><strong>Description:</strong> Tommy Oliver is arguably the most iconic Power Ranger of all time. Starting as the evil Green Ranger, he eventually becomes the leader of the Mighty Morphin team as the White Ranger. He appears in multiple seasons, showcasing his incredible fighting skills and unwavering heroism.</p>
      </div>
    </div>
    )
  };
  export default Characters;