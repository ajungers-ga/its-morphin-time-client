// src/components/characters/CharactersPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as Services from '../services/services'
import { getAllRangers } from '../../services/rangerService';
import { getAllMegazords } from '../../services/megazordService';
import './CharacterDetail.css'; // Ensure this CSS file exists

const CharacterDetail = ({ characters }) => {
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
      {/* Assuming you want to display the first character as details */}
      {charList.length > 0 && (
        <div className="character-detail-container">
          <h1>{charList[0].name}</h1>
          {charList[0].fullName && (
            <p>
              <strong>Full Name:</strong> {charList[0].fullName}
            </p>
          )}
          <p>
            <strong>Color:</strong> {charList[0].color || "Unknown Color"}
          </p>
          <p>
            <strong>Gender:</strong> {charList[0].gender || "N/A"}
          </p>
          <p>
            <strong>Zords:</strong>{" "}
            {charList[0].zord && charList[0].zord.length > 0
              ? charList[0].zord.join(', ')
              : "N/A"}
          </p>
          <p>
            <strong>Homeworld:</strong> {charList[0].homeworld || "N/A"}
          </p>
          <p>
            <strong>First Appearance:</strong> {charList[0].firstAp || "N/A"}
          </p>
          <p>
            <strong>Last Appearance:</strong> {charList[0].lastAp || "N/A"}
          </p>
          <p>
            <strong>Number of Appearances:</strong> {charList[0].numberOfAp || "N/A"}
          </p>
          <p>
            <strong>Actor:</strong> {charList[0].actor || "N/A"}
          </p>
          <p>
            <strong>Season:</strong>{" "}
            {charList[0].season ? (
              // Link to the SeasonDetail page using the populated season object
              <Link to={`/seasons/${charList[0].season._id || charList[0].season}`}>
                {charList[0].season.name || charList[0].season}
              </Link>
            ) : (
              "Unknown Season"
            )}
          </p>
        </div>
      )}

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

export default CharacterDetail;
