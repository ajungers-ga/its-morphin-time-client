// src/components/megazord/MegazordDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; // Import Link from react-router-dom
import * as Services from '../services/services';
import './MegazordDetail.css'; // Ensure this CSS file exists and styles your component

const MegazordDetail = () => {
  const { id } = useParams();
  const [megazordDetails, setMegazordDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await Services.fetchMegazordDetails(id);
        if (data && !data.err) {
          setMegazordDetails(data);
        } else {
          setError(data ? data.err : 'Failed to load megazord details.');
        }
      } catch (err) {
        setError("An error occurred while fetching details.");
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
      <img
        src={megazordDetails.pictureLink}
        alt={megazordDetails.name}
        className="megazord-image"
      />
      <p>
        <strong>First Appeared In Season:</strong>{' '}
        {megazordDetails.firstAppearedInSeason?.name ||
          megazordDetails.firstAppearedInSeason ||
          'Unknown Season'}
      </p>
      <p>
        <strong>Combined Megazord:</strong> {megazordDetails.combinedMegazord}
      </p>
      <div>
        <strong>Piloted By:</strong>
        <ul>
          {megazordDetails.pilotedBy &&
            megazordDetails.pilotedBy.map((ranger) => (
              <li key={ranger._id}>
                {/* Link to the character's detail page */}
                <Link to={`/characters/${ranger._id}`}>{ranger.name}</Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default MegazordDetail;
