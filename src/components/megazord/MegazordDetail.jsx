// src/components/megazord/MegazordDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import * as Services from '../services/services';
import MegazordForm from './MegazordForm';
import './MegazordDetail.css';

const MegazordDetail = ({ isFormOpen, handleFormView }) => {
  const { id } = useParams();
  const [megazordDetails, setMegazordDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDetails = async () => {
    setLoading(true);
    try {
      const data = await Services.fetchMegazordDetails(id);
      setMegazordDetails(data);
    } catch (err) {
      setError('Error loading Megazord details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [id]);

  const handleFormSubmit = () => {
    handleFormView();    // close form
    fetchDetails();      // refresh data
  };

  if (loading) return <div>Loading Megazord details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!megazordDetails) return <div>No Megazord details found.</div>;

  return (
    <div className="megazord-detail-container">
      <div className="megazord-info">
        <h1>{megazordDetails.name}</h1>

        {megazordDetails.pictureLink && (
          <img
            src={megazordDetails.pictureLink}
            alt={megazordDetails.name}
            className="megazord-image"
          />
        )}

        <p>
          <strong>First Appeared In Season:</strong>{' '}
          {megazordDetails.firstAppearedInSeason ? (
            <Link to={`/seasons/${megazordDetails.firstAppearedInSeason._id}`}>
              {megazordDetails.firstAppearedInSeason.name || 'Unknown'}
            </Link>
          ) : (
            'N/A'
          )}
        </p>

        <p>
          <strong>Combined Megazord:</strong>{' '}
          {megazordDetails.combinedMegazord || 'None'}
        </p>

        <div>
          <strong>Piloted By:</strong>
          {megazordDetails.pilotedBy && megazordDetails.pilotedBy.length > 0 ? (
            <ul>
              {megazordDetails.pilotedBy.map((ranger) => (
                <li key={ranger._id}>
                  <Link to={`/characters/${ranger._id}`}>
                    {ranger.name || 'Unnamed Ranger'}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>No pilot information available.</p>
          )}
        </div>

        <Link to="/megazords">← Back to Megazords</Link>

        <button onClick={handleFormView}>
          {isFormOpen ? 'Close Form' : 'Edit Megazord'}
        </button>
      </div>

      {isFormOpen && (
        <div className="megazord-form-wrapper">
          <MegazordForm
            existingData={megazordDetails}
            onSubmit={handleFormSubmit}
          />
        </div>
      )}
    </div>
  );
};

export default MegazordDetail;
