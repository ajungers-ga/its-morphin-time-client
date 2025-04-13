// src/components/characters/CharacterDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; // Import Link for navigation
import * as Services from '../services/services';
import './CharacterDetail.css'; // Ensure this CSS file exists

const CharacterDetail = () => {
  const { id } = useParams();
  const [characterDetails, setCharacterDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await Services.fetchCharacterDetails(id);
        if (data && !data.err) {
          setCharacterDetails(data);
        } else {
          setError(data ? data.err : 'Failed to load character details.');
        }
      } catch (err) {
        setError("An error occurred while fetching details.");
      }
      setLoading(false);
    };

    fetchDetails();
  }, [id]);

  if (loading) {
    return <div>Loading character details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!characterDetails) {
    return <div>No character details found.</div>;
  }

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
    </div>
  );
};

export default CharacterDetail;
