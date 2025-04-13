// src/components/megazord/MegazordPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as Services from '../services/services';
import './MegazordDetail.css'; // You can create this CSS file for styling

const MegazordPage = ({ megazords: initialMegazords }) => {
  const [megazords, setMegazords] = useState(initialMegazords);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!initialMegazords || initialMegazords.length === 0) {
      const fetchAllMegazords = async () => {
        setLoading(true);
        setError(null);
        const data = await Services.fetchMegazords();
        if (data && !data.err) {
          setMegazords(data);
        } else {
          setError(data ? data.err : 'Failed to load megazords.');
        }
        setLoading(false);
      };

      fetchAllMegazords();
    }
  }, [initialMegazords]);

  if (loading) {
    return <div>Loading megazords...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="megazords-page-container">
      <h1>Power Rangers Megazords</h1>
      {!megazords || megazords.length === 0 ? (
        <p>No megazords available.</p>
      ) : (
        <ul className="megazords-list">
          {megazords.map((megazord) => (
            <li key={megazord._id} className="megazord-item">
            {/* --- FIX SIMILAR TO CHARACTERS PAGE --- */}
            <Link to={`/megazords/${megazord._id}`}>{megazord.name}</Link>
            {/* ------------------------------------ */}
          </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MegazordPage;