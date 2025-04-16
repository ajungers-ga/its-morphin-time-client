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
      if (data && !data.err) {
        setSeasonDetails(data);
      } else {
        setError(data?.err || 'Failed to load season.');
      }
    } catch (err) {
      setError('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSeason();
  }, [id]);

  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete this season?");
    if (!confirm) return;

    await Services.deleteSeason(id);
    navigate("/seasons");
  };

  const handleFormSubmit = () => {
    handleFormView(); // close form
    fetchSeason();    // refresh data
  };

  if (loading) return <div>Loading season...</div>;
  if (error || !seasonDetails) return <div>{error || "No data found."}</div>;

  return (
    <div className="season-detail-container">
      <div className="season-info">
        <h1>{seasonDetails.name} (Season {seasonDetails.seasonNumber})</h1>

        {seasonDetails.img && (
          <img
            src={seasonDetails.img}
            alt={seasonDetails.name}
            className="character-image"
          />
        )}

        <p><strong>Sentai Name:</strong> {seasonDetails.sentaiName}</p>
        <p><strong>Airing Year:</strong> {seasonDetails.airingYear}</p>
        <p><strong>Number of Episodes:</strong> {seasonDetails.numberOfEpisodes}</p>
        <p><strong>First Episode:</strong> {seasonDetails.firstEpisode}</p>
        <p><strong>Last Episode:</strong> {seasonDetails.lastEpisode}</p>
        <p><strong>Theme:</strong> {seasonDetails.theme}</p>
        <p><strong>Producer:</strong> {seasonDetails.producer}</p>
        <p><strong>Comment:</strong> {seasonDetails.comment || 'None'}</p>

        {/* Megazords */}
        {seasonDetails.magozord && seasonDetails.magozord.length > 0 ? (
          <>
            <h3>Megazords</h3>
            <ul>
              {seasonDetails.magozord.map((zord) => (
                <li key={zord._id}>
                  <Link to={`/megazords/${zord._id}`}>{zord.name}</Link>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p><strong>Megazords:</strong> None listed</p>
        )}

        {/* Rangers */}
        {seasonDetails.rangers && seasonDetails.rangers.length > 0 ? (
          <>
            <h3>Rangers</h3>
            <ul>
              {seasonDetails.rangers.map((ranger) => (
                <li key={ranger._id}>
                  <Link to={`/characters/${ranger._id}`}>{ranger.name}</Link>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p><strong>Rangers:</strong> None listed</p>
        )}

        <Link to="/seasons">← Back to Seasons</Link>

        <button onClick={handleFormView}>
          {isFormOpen ? 'Close Form' : 'Edit Season'}
        </button>
        <button onClick={handleDelete} className="delete-button">
          Delete Season
        </button>
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
