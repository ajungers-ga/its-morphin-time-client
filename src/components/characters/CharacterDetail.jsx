// src/components/characters/CharactersPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as Services from '../services/services';
// Import the correct CSS for the characters list page.
// (Ensure you have a CharactersPage.css file; if not, create one or remove this import.)
import './CharacterDetail.css';

const CharactersPage = ({ characters }) => {
  const [charList, setCharList] = useState(characters || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!characters || characters.length === 0) {
      const fetchAllCharacters = async () => {
        setLoading(true);
        const data = await Services.fetchCharacters();
        if (data && !data.err) {
          setCharList(data);
        } else {
          setError(data ? data.err : 'Failed to load characters.');
        }
        setLoading(false);
      };
      fetchAllCharacters();
    }
  }, [characters]);

  if (loading) return <div>Loading characters...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="characters-page-container">
      <h1>Power Rangers Characters</h1>
      <ul className="characters-list">
        {charList.map((character) => (
          <li key={character._id} className="character-item">
            {/* Use template literals (backticks) to build the dynamic path */}
            <Link to={`/characters/${character._id}`}>{character.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CharactersPage;
