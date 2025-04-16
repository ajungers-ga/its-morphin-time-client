// src/components/characters/CharactersPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as Services from '../services/services';
// IMPORTANT: Make sure to import the dedicated CSS for this list page.
import './CharactersPage.css'; 


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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const prepared = {
      ...formData,
      zord: formData.zord.split(',').map(z => z.trim()),
    };
  
    if (existingData) {
      await Services.updateCharacter(existingData._id, prepared);
    } else {
      await Services.createCharacter(prepared);
    }
  
    if (onSubmit) onSubmit();
  };
  

  return (
    <div className="characters-page-container">
      <h1>Power Rangers Characters</h1>
      <Link to="/characters/new">+ Add New Character</Link>
      <ul className="characters-list">
        {charList.map((character) => (
          <li key={character._id} className="character-item">
            <Link to={`/characters/${character._id}`}>
              {character.name}
            </Link>
          </li>
        ))}
      </ul>
      

    </div>
  );
};

export default CharactersPage;
