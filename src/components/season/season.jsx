import React from 'react';
import './SeasonDetail.css';

const Season = ({selected}) => {
  if (!selected) {
    return (
      <div>
        <h1>NO DETAILS</h1>
      </div>
    );
  }
    return (<>
    <div className="season-detail-container">
      <div className="season-info">
        <h1>Mighty Morphin Power Rangers (Season 1)</h1>
        <img src="https://via.placeholder.com/300x150" alt="Season Placeholder" className="season-image" />
        <p><strong>First Aired:</strong> August 28, 1993</p>
        <p><strong>Number of Episodes:</strong> 60</p>
        <p><strong>Synopsis:</strong> When the evil witch Rita Repulsa is freed from her prison on the Moon, the wise sage Zordon recruits five teenagers with attitude - Jason Lee Scott, Kimberly Hart, Billy Cranston, Trini Kwan, and Zack Taylor - and gives them the power to morph into the Mighty Morphin Power Rangers to protect Earth.</p>
        <p><strong>Key Characters:</strong> Red Ranger (Jason), Pink Ranger (Kimberly), Blue Ranger (Billy), Yellow Ranger (Trini), Black Ranger (Zack), Green Ranger (Tommy)</p>
      </div>
      <div>
      <p><strong>Name:</strong> {selected.name}</p>
      <p><strong>Sentai Name:</strong> {selected.sentaiName}</p>
      <p><strong>Airing Year:</strong> {selected.airingYear}</p>
      <p><strong>Season Number:</strong> {selected.seasonNumber}</p>
      <p><strong>Number of Episodes:</strong> {selected.numberOfEpisodes}</p>
      <p><strong>First Episode:</strong> {selected.firstEpisode}</p>
      <p><strong>Last Episode:</strong> {selected.lastEpisode}</p>
      <p><strong>Theme:</strong> {selected.theme}</p>
      <p><strong>Producer:</strong> {selected.producer}</p>
      <p><strong>Rangers:</strong> {selected.rangers.join(', ')}</p>
    </div>
    </div>
    </>)
  };
  export default Season;