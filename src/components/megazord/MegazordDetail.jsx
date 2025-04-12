// src/components/megazord/MegazordDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as Services from '../services/services';
import './MegazordDetail.css'; // Create this CSS file

const MegazordDetail = () => {
  const { id } = useParams();
  const [megazordDetails, setMegazordDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      const data = await Services.fetchMegazordDetails(id);
      if (data && !data.err) {
        setMegazordDetails(data);
      } else {
        setError(data ? data.err : 'Failed to load megazord details.');
      }
      setLoading(false);
    };

    fetchDetails();
  }, [id]);

  if (loading) {
    return <div>Loading megazord details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!megazordDetails) {
    return <div>No megazord details found.</div>;
  }

  return (
    <div className="megazord-detail-container">
      <h1>{megazordDetails.name}</h1>
      {/* Display other megazord details based on your backend response */}
      <p><strong>Season:</strong> {megazordDetails.season}</p>
      {/* Add image logic if available */}
    </div>
  );
};

export default MegazordDetail;