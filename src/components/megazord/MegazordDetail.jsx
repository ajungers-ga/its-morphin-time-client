// src/components/megazord/MegazordDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import * as Services from '../services/services';
import MegazordForm from './MegazordForm';
import './MegazordDetail.css';

const MegazordDetail = ({ isFormOpen, handleFormView }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [megazordDetails, setMegazordDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDetails = async () => {
    try {
      const data = await Services.fetchMegazordDetails(id);
      if (data && !data.err) {
        setMegazordDetails(data);
      } else {
        setError(data?.err || 'Megazord not found.');
      }
    } catch {
      setError("Error fetching Megazord.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [id]);

  const handleDelete = async () => {
    const confirm = window.confirm("Delete this Megazord?");
    if (!confirm) return;

    await Services.deleteMegazord(id);
    navigate("/megazords");
  };

  const handleFormSubmit = () => {
    handleFormView();    // close form
    fetchDetails();      // refresh updated data
  };

  if (loading) return <div>Loading Megazord...</div>;
  if (error || !megazordDetails) return <div>{error || "No data found."}</div>;

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

        <p><strong>Combined Megazord:</strong> {megazordDetails.combinedMegazord || 'None'}</p>

        <p><strong>Season:</strong>{' '}
          {megazordDetails.firstAppearedInSeason ? (
            <Link to={`/seasons/${megazordDetails.firstAppearedInSeason._id}`}>
              {megazordDetails.firstAppearedInSeason.name || 'Unnamed Season'}
            </Link>
          ) : 'Unknown'}
        </p>

        <div>
          <strong>Piloted By:</strong>
          {megazordDetails.pilotedBy?.length > 0 ? (
            <ul>
              {megazordDetails.pilotedBy.map((ranger) => (
                <li key={ranger._id}>
                  <Link to={`/characters/${ranger._id}`}>{ranger.name}</Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>No pilot data.</p>
          )}
        </div>

        <Link to="/megazords">← Back to Megazords</Link>

        <button onClick={handleFormView}>
          {isFormOpen ? "Close Form" : "Edit Megazord"}
        </button>
        <button onClick={handleDelete} className="delete-button">
          Delete Megazord
        </button>
      </div>

      {isFormOpen && (
        <div className="megazord-form-wrapper">
          <MegazordForm existingData={megazordDetails} onSubmit={handleFormSubmit} />
        </div>
      )}
    </div>
  );
};

export default MegazordDetail;
