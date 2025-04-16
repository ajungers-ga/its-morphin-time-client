// src/components/characters/CharacterDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import * as Services from '../services/services';
import './CharacterDetail.css';

const CharacterDetail = () => {

  const { id } = useParams(); // Get the character ID from the URL
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      setLoading(true);
      // Use the dedicated fetch for character details rather than fetching the whole list
      const data = await Services.fetchCharacterDetails(id);
      if (data && !data.err) {
        setCharacter(data);
      } else {
        setError(data ? data.err : 'Failed to load character details.');

      }
      setLoading(false);
    };


    fetchCharacter();
  }, [id]);

  if (loading) return <div>Loading character...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!character) return <div>No character found.</div>;

  return (
    // <div className="character-detail-container">
       <div className="character-info">
      <h1>{character.name}</h1>
      <img
          src={character.img}
          alt={character.name}
          className="character-image"
        />

      {character.fullName && (
        <p>
          <strong>Full Name:</strong> {character.fullName}
        </p>
      )}
      <p>
        <strong>Color:</strong> {character.color || "Unknown Color"}
      </p>
      <p>
        <strong>Gender:</strong> {character.gender || "N/A"}
      </p>
      <p>
        <strong>Zords:</strong>{" "}
        {character.zord && character.zord.length > 0
          ? character.zord.join(', ')
          : "N/A"}
      </p>
      <p>
        <strong>Homeworld:</strong> {character.homeworld || "N/A"}
      </p>
      <p>
        <strong>First Appearance:</strong> {character.firstAp || "N/A"}
      </p>
      <p>
        <strong>Last Appearance:</strong> {character.lastAp || "N/A"}
      </p>
      <p>
        <strong>Number of Appearances:</strong> {character.numberOfAp || "N/A"}
      </p>
      <p>
        <strong>Actor:</strong> {character.actor || "N/A"}
      </p>
     
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
      </div>
     

    // </div>
  );
};

export default CharacterDetail;
