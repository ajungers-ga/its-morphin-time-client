import React from 'react';
import './MegazordDetail.css';


const Megazord = () => {
    return (
      <div className="megazord-detail-container">
      <div className="megazord-info">
        <h1>Mighty Morphin Megazord</h1>
        <img src="https://via.placeholder.com/400x200" alt="Megazord Placeholder" className="megazord-image" />
        <p><strong>Pilot(s):</strong> Mighty Morphin Power Rangers</p>
        <p><strong>Zords:</strong> Tyrannosaurus Dinozord (Red Ranger), Pterodactyl Dinozord (Pink Ranger), Triceratops Dinozord (Blue Ranger), Sabertooth Tiger Dinozord (Yellow Ranger), Mastodon Dinozord (Black Ranger)</p>
        <p><strong>Description:</strong> The Mighty Morphin Megazord is the first and arguably most iconic Megazord in the Power Rangers franchise. Formed by the combination of the five Dinozords, it represents the ultimate fighting force against Rita Repulsa's monsters.</p>
        <p><strong>Special Attacks:</strong> Power Sword</p>
      </div>
    </div>
    )
  };
  export default Megazord;