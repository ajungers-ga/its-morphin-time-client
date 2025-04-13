import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import './Home.css';

const Home = ({ seasons, characters }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Helper to find the season a character belongs to
  const getSeasonNameById = (seasonId) => {
    const season = seasons.find((s) => s._id === seasonId);
    return season ? season.name : 'Unknown Season';
  };

  // Filtered characters and seasons
  const filteredCharacters = characters.filter((char) =>
    char.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSeasons = seasons.filter((season) =>
    season.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-container">
      <div className="welcome-content">
        <h1>Welcome, Power Rangers Fan!</h1>
        <p>Search for a Power Ranger or a Season to learn more!</p>

        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for a character or season..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {searchTerm && (
          <div className="search-results">
            <h2>Search Results:</h2>

            {/* Character Results */}
            {filteredCharacters.length > 0 && (
              <>
                <h3>Characters</h3>
                <ul>
                  {filteredCharacters.map((char) => (
                    <li key={char._id}>
                      <Link to={`/characters/${char._id}`} style={{ color: '#646CFF' }}>
                        {char.name}
                      </Link>{' '}
                      - {getSeasonNameById(char.seasonId)}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {/* Season Results */}
            {filteredSeasons.length > 0 && (
              <>
                <h3>Seasons</h3>
                <ul>
                  {filteredSeasons.map((season) => (
                    <li key={season._id}>
                      <Link to={`/seasons/${season._id}`} style={{ color: '#646CFF' }}>
                        {season.name}
                      </Link>{' '}
                      ({season.airingYear}) - {season.theme}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {filteredCharacters.length === 0 && filteredSeasons.length === 0 && (
              <p>No matches found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
