// src/components/characters/CharactersPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as Services from '../services/services';
import './CharacterDetail.css'; // You can create this CSS file for styling

const CharactersPage = ({ characters: initialCharacters }) => {
  const [characters, setCharacters] = useState(initialCharacters);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!initialCharacters || initialCharacters.length === 0) {
      const fetchAllCharacters = async () => {
        setLoading(true);
        setError(null);
        const data = await Services.fetchCharacters();
        if (data && !data.err) {
          setCharacters(data);
        } else {
          setError(data ? data.err : 'Failed to load characters.');
        }
        setLoading(false);
      };

      fetchAllCharacters();
    }
  }, [initialCharacters]);

  if (loading) {
    return <div>Loading characters...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="characters-page-container">
      <h1>Power Rangers Characters</h1>
      {!characters || characters.length === 0 ? (
        <p>No characters available.</p>
      ) : (
        <ul className="characters-list">
          {characters.map((character) => (
            <li key={character._id} className="character-item">
              <Link to={`/character/${character._id}`} className="character-link">
                {character.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CharactersPage;