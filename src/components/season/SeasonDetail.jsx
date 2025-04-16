// src/components/season/SeasonDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import * as Services from '../services/services';
import SeasonForm from './SeasonForm';
import './SeasonDetail.css';

const SeasonDetail = ({ isFormOpen, handleFormView }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [seasonDetails, setSeasonDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSeason = async () => {
    try {
      const data = await Services.fetchSeasonDetails(id);
      setSeasonDetails(data);
    } catch {
      setError("Failed to fetch season.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSeason();
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this season?");
    if (!confirmDelete) return;

    await Services.deleteSeason(id);
    navigate("/seasons");
  };

  const handleFormSubmit = () => {
    handleFormView();
    fetchSeason();
  };

  if (loading) return <div>Loading...</div>;
  if (error || !seasonDetails) return <div>{error || "No data found."}</div>;

  return (
    <div className="season-detail-container">
      <div className="season-info">
        <h1>{seasonDetails.name} (Season {seasonDetails.seasonNumber})</h1>
        <img src={seasonDetails.img} alt={seasonDetails.name} className="character-image" />

        <p><strong>Theme:</strong> {seasonDetails.theme}</p>
        <p><strong>Producer:</strong> {seasonDetails.producer}</p>
        <p><strong>Episodes:</strong> {seasonDetails.numberOfEpisodes}</p>
        <p><strong>First Episode:</strong> {seasonDetails.firstEpisode}</p>
        <p><strong>Last Episode:</strong> {seasonDetails.lastEpisode}</p>

        <Link to="/seasons">← Back to Seasons</Link>

        <button onClick={handleFormView}>{isFormOpen ? 'Close Form' : 'Edit Season'}</button>
        <button onClick={handleDelete} className="delete-button">Delete Season</button>
      </div>

      {isFormOpen && (
        <div className="season-form-wrapper">
          <SeasonForm existingData={seasonDetails} onSubmit={handleFormSubmit} />
        </div>
      )}
    </div>
  );
};

export default SeasonDetail;
