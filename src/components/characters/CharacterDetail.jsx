// src/components/characters/CharacterDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as Services from '../services/services';
import './CharacterDetail.css'; // Ensure this CSS file exists and styles your component

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
      <p>
        <strong>Color:</strong> {characterDetails.color || "Unknown Color"}
      </p>
      <p>
        <strong>Role:</strong> {characterDetails.role || "Unknown Role"}
      </p>
      <p>
        <strong>Season:</strong>{" "}
        {characterDetails.season?.name || characterDetails.season || "Unknown Season"}
      </p>
      {/* Add more fields or image logic if needed */}
    </div>
  );
};

export default CharacterDetail;
