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
    <div className="character-detail-container">
      <h1>{characterDetails.name}</h1>
      {characterDetails.fullName && (
        <p>
          <strong>Full Name:</strong> {characterDetails.fullName}
        </p>
      )}
      <p>
        <strong>Color:</strong> {characterDetails.color || "Unknown Color"}
      </p>
      <p>
        <strong>Gender:</strong> {characterDetails.gender || "N/A"}
      </p>
      <p>
        <strong>Zords:</strong>{" "}
        {characterDetails.zord && characterDetails.zord.length > 0
          ? characterDetails.zord.join(', ')
          : "N/A"}
      </p>
      <p>
        <strong>Homeworld:</strong> {characterDetails.homeworld || "N/A"}
      </p>
      <p>
        <strong>First Appearance:</strong> {characterDetails.firstAp || "N/A"}
      </p>
      <p>
        <strong>Last Appearance:</strong> {characterDetails.lastAp || "N/A"}
      </p>
      <p>
        <strong>Number of Appearances:</strong> {characterDetails.numberOfAp || "N/A"}
      </p>
      <p>
        <strong>Actor:</strong> {characterDetails.actor || "N/A"}
      </p>
      <p>
        <strong>Season:</strong>{" "}
        {characterDetails.season ? (
          // Link to the SeasonDetail page using the populated season object
          <Link to={`/seasons/${characterDetails.season._id || characterDetails.season}`}>
            {characterDetails.season.name || characterDetails.season}
          </Link>
        ) : (
          "Unknown Season"
        )}
      </p>
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
