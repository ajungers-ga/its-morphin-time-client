// src/components/characters/CharactersPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as Services from '../services/services';
// Import the CSS for the list page if you have one, e.g., './CharactersPage.css'
// Using './CharacterDetail.css' here might be a typo unless the list shares styles.
// Let's assume you might have a './CharactersPage.css' or similar
import './CharacterDetail'; // Or './CharacterDetail.css' if intentional

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
            {/* --- FIX HERE --- */}
            {/* Use template literals (backticks) to build the dynamic path */}
            <Link to={`/characters/${character._id}`}>{character.name}</Link>
            {/* ---------------- */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CharactersPage;