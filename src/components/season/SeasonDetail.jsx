// src/components/season/SeasonDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import * as Services from '../services/services';
import SeasonForm from './SeasonForm';
import './SeasonDetail.css';

const SeasonDetail = ({ isFormOpen, handleFormView }) => {
  const { id } = useParams();
  const [seasonDetails, setSeasonDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSeason = async () => {
    setLoading(true);
    try {
      const data = await Services.fetchSeasonDetails(id);
      setSeasonDetails(data);
    } catch (err) {
      setError('Failed to load season details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSeason();
  }, [id]);

  const handleFormSubmit = () => {
    handleFormView();      // Close the form
    fetchSeason();         // Refresh data after update
  };

  if (loading) return <div>Loading season details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!seasonDetails) return <div>No season details found.</div>;

  return (
    <div className="season-detail-container">
      <div className="season-info">
        <h1>
          {seasonDetails.name} (Season {seasonDetails.seasonNumber})
        </h1>
        <img src={seasonDetails.img} alt={seasonDetails.name} className="character-image" />

        <p><strong>Sentai Name:</strong> {seasonDetails.sentaiName}</p>
        <p><strong>Airing Year:</strong> {seasonDetails.airingYear}</p>
        <p><strong>Number of Episodes:</strong> {seasonDetails.numberOfEpisodes}</p>
        <p><strong>First Episode:</strong> {seasonDetails.firstEpisode}</p>
        <p><strong>Last Episode:</strong> {seasonDetails.lastEpisode}</p>
        <p><strong>Theme:</strong> {seasonDetails.theme}</p>
        <p><strong>Producer:</strong> {seasonDetails.producer}</p>
        <p><strong>Comment:</strong> {seasonDetails.comment}</p>

        {/* Megazords */}
        {seasonDetails.magozord && seasonDetails.magozord.length > 0 && (
          <div>
            <strong>Megazords:</strong>
            <ul>
              {seasonDetails.magozord.map((m) => (
                <li key={m._id}>
                  <Link to={`/megazords/${m._id}`}>{m.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Rangers */}
        {seasonDetails.rangers && seasonDetails.rangers.length > 0 ? (
          <div>
            <h3>Rangers in this Season:</h3>
            <ul>
              {seasonDetails.rangers.map((r) => (
                <li key={r._id}>
                  <Link to={`/characters/${r._id}`}>{r.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No rangers listed for this season.</p>
        )}

        <Link to="/seasons" className="back-link">← Back to Seasons</Link>

        <button onClick={handleFormView}>
          {isFormOpen ? 'Close Form' : 'Edit Season'}
        </button>
      </div>

      {isFormOpen && (
        <div className="season-form-wrapper">
          <SeasonForm
            existingData={seasonDetails}
            onSubmit={handleFormSubmit}
          />
        </div>
      )}
    </div>
  );
};

export default SeasonDetail;
