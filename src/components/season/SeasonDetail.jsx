// src/components/season/SeasonDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import * as Services from '../services/services';
import './SeasonDetail.css';

const SeasonDetail = () => {
  const { id } = useParams();
  const [seasonDetails, setSeasonDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await Services.fetchSeasonDetails(id);
        console.log("Fetched season details:", data);
        if (data && !data.err) {
          setSeasonDetails(data);
        } else {
          setError(data ? data.err : 'Failed to load season details.');
        }
      } catch (err) {
        console.error("Error fetching season details:", err);
        setError("An error occurred while fetching details.");
      }
      setLoading(false);
    };

    fetchDetails();
  }, [id]);

  if (loading) return <div>Loading season details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!seasonDetails) return <div>No season details found.</div>;

  return (
    <div className="season-detail-container">
      <div className="season-info">
        <h1>
          {seasonDetails.name} (Season {seasonDetails.seasonNumber})
        </h1>
        <p><strong>Sentai Name:</strong> {seasonDetails.sentaiName}</p>
        <p><strong>Airing Year:</strong> {seasonDetails.airingYear}</p>
        <p><strong>Number of Episodes:</strong> {seasonDetails.numberOfEpisodes}</p>
        <p><strong>First Episode:</strong> {seasonDetails.firstEpisode}</p>
        <p><strong>Last Episode:</strong> {seasonDetails.lastEpisode}</p>
        <p><strong>Theme:</strong> {seasonDetails.theme}</p>
        <p><strong>Producer:</strong> {seasonDetails.producer}</p>
        
        {/* Display Characters (Rangers) if available */}
        {seasonDetails.rangers && seasonDetails.rangers.length > 0 ? (
          <div className="season-characters">
            <h2>Characters in this Season</h2>
            <ul>
              {seasonDetails.rangers.map((ranger) => (
                <li key={ranger._id}>
                  <Link to={`/characters/${ranger._id}`}>
                    {ranger.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p><strong>Characters:</strong> No characters available</p>
        )}

        <Link to="/seasons" className="back-link">← Back to Seasons</Link>
      </div>
    </div>
  );
};

export default SeasonDetail;
