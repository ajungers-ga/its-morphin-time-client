import React from 'react';
import './SeasonDetail.css';

const Season = ({ selected }) => {
  if (!selected) {
    return (
      <div>
        <h1>NO DETAILS</h1>
      </div>
    );
  }
  return (
    <div className="season-detail-container">
      <div className="season-info">
        <h1>{selected.name} (Season {selected.seasonNumber})</h1>
        <img src="https://via.placeholder.com/300x150" alt={selected.name} className="season-image" />
        <p><strong>First Aired:</strong> {selected.firstEpisode}</p>
        <p><strong>Number of Episodes:</strong> {selected.numberOfEpisodes}</p>
        <p><strong>Synopsis:</strong> {selected.theme}</p> {/* Assuming 'theme' can act as a synopsis */}
        <p><strong>Key Characters:</strong> {/* You might need a way to access character data here */}
          {selected.rangers && selected.rangers.length > 0 ? selected.rangers.join(', ') : 'No rangers listed'}
        </p>
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
  );
};

export default Season;