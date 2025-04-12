// src/components/characters/CharacterDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as Services from '../services/services';
import './CharacterDetail.css'; // Create this CSS file

const CharacterDetail = () => {
  const { id } = useParams();
  const [characterDetails, setCharacterDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      const data = await Services.fetchCharacterDetails(id);
      if (data && !data.err) {
        setCharacterDetails(data);
      } else {
        setError(data ? data.err : 'Failed to load character details.');
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
      {/* Display other character details based on your backend response */}
      <p><strong>Color:</strong> {characterDetails.color}</p>
      <p><strong>Role:</strong> {characterDetails.role}</p>
      <p><strong>Season:</strong> {characterDetails.season}</p>
      {/* Add image logic if available */}
    </div>
  );
};

export default CharacterDetail;