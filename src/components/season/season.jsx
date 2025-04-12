
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as Services from '../services/services';
import './SeasonDetail.css';

const Season = () => {
  const { id } = useParams();
  const [seasonDetails, setSeasonDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      const data = await Services.fetchSeasonDetails(id);
      if (data && !data.err) {
        setSeasonDetails(data);
      } else {
        setError(data ? data.err : 'Failed to load season details.');
      }
      setLoading(false);
    };

    fetchDetails();
  }, [id]);

  if (loading) {
    return <div>Loading season details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!seasonDetails) {
    return <div>No season details found.</div>;
  }

  return (
    <div className="season-detail-container">
      <div className="season-info">
        <h1>{seasonDetails.name} (Season {seasonDetails.seasonNumber})</h1>
        {/* Add image logic if available in your backend data */}
        <p><strong>Sentai Name:</strong> {seasonDetails.sentaiName}</p>
        <p><strong>Airing Year:</strong> {seasonDetails.airingYear}</p>
        <p><strong>Number of Episodes:</strong> {seasonDetails.numberOfEpisodes}</p>
        <p><strong>First Episode:</strong> {seasonDetails.firstEpisode}</p>
        <p><strong>Last Episode:</strong> {seasonDetails.lastEpisode}</p>
        <p><strong>Theme:</strong> {seasonDetails.theme}</p>
        <p><strong>Producer:</strong> {seasonDetails.producer}</p>
        <p><strong>Rangers:</strong> {seasonDetails.rangers ? seasonDetails.rangers.join(', ') : 'N/A'}</p>
      </div>
      {/* You can add more detail display here */}
    </div>
  );
};

export default Season;