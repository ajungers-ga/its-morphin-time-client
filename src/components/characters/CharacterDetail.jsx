// src/components/characters/CharacterDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import * as Services from '../services/services';
import CharacterForm from './CharacterForm';
import './CharacterDetail.css';

const CharacterDetail = ({ isFormOpen, handleFormView }) => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCharacter = async () => {
    setLoading(true);
    try {
      const data = await Services.fetchCharacterDetails(id);
      if (data && !data.err) {
        setCharacter(data);
      } else {
        setError(data ? data.err : 'Failed to load character details.');
      }
    } catch (err) {
      setError('Something went wrong.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCharacter();
  }, [id]);

  const handleFormSubmit = () => {
    handleFormView();     // Close form
    fetchCharacter();     // Refresh data
  };

  if (loading) return <div>Loading character...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!character) return <div>No character found.</div>;

  return (
    <div className="character-detail-container">
      <div className="character-info">
        <h1>{character.name}</h1>

        {character.img && (
          <img
            src={character.img}
            alt={character.name}
            className="character-image"
          />
        )}

        {character.fullName && (
          <p><strong>Full Name:</strong> {character.fullName}</p>
        )}

        <p><strong>Color:</strong> {character.color}</p>
        <p><strong>Gender:</strong> {character.gender}</p>
        <p>
          <strong>Zords:</strong>{" "}
          {character.zord?.length ? character.zord.join(', ') : "N/A"}
        </p>
        <p><strong>Homeworld:</strong> {character.homeworld}</p>
        <p><strong>First Appearance:</strong> {character.firstAp}</p>
        <p><strong>Last Appearance:</strong> {character.lastAp}</p>
        <p><strong>Number of Appearances:</strong> {character.numberOfAp}</p>
        <p><strong>Actor:</strong> {character.actor}</p>

        <p>
          <strong>Season:</strong>{" "}
          {character.season ? (
            <Link to={`/seasons/${character.season._id || character.season}`}>
              {character.season.name || character.season}
            </Link>
          ) : (
            "Unknown Season"
          )}
        </p>

        <Link to="/characters">← Back to Characters</Link>

        <button onClick={handleFormView}>
          {isFormOpen ? "Close Form" : "Edit Character"}
        </button>
      </div>

      {isFormOpen && (
        <div className="character-form-wrapper">
          <CharacterForm
            existingData={character}
            onSubmit={handleFormSubmit}
          />
        </div>
      )}
    </div>
  );
};

export default CharacterDetail;
