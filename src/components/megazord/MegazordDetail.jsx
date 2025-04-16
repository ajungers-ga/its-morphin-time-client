// src/components/megazord/MegazordDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import * as Services from '../services/services';
import './MegazordDetail.css';

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
        console.log("Fetched megazord details:", data);
        if (data && !data.err) {
          setMegazordDetails(data);
        } else {
          setError(data ? data.err : 'Failed to load megazord details.');
        }
      } catch (err) {
        console.error("Error in fetchMegazordDetails:", err);
        setError("An error occurred while fetching details.");
      }
      setLoading(false);
    };

    fetchDetails();
  }, [id]);

  if (loading) return <div>Loading megazord details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!megazordDetails) return <div>No megazord details found.</div>;

  // Debug: Uncomment the following line to inspect the entire megazordDetails object in your browser
  // console.log(JSON.stringify(megazordDetails, null, 2));

  return (
    <div className="megazord-detail-container" >
             
      <div className="megazord-info">
        <h1>{megazordDetails.name}</h1>
        <img
  src={megazordDetails.pictureLink}
  alt={megazordDetails.name}
  className="megazord-image"
/>
 
       
        <p>
          <strong>First Appeared In Season:</strong>< Link to={`/seasons/${megazordDetails.firstAppearedInSeason._id}`}>{megazordDetails.firstAppearedInSeason
            ? megazordDetails.firstAppearedInSeason.name|| 'Unknown Season Name'
            : megazordDetails.firstAppearedInSeason || 'Unknown Season'}</Link>
        </p>
        <p>
          <strong>Combined Megazord:</strong> {megazordDetails.combinedMegazord}
        </p>
        <div>
          <strong>Piloted By:</strong>
          {megazordDetails.pilotedBy && megazordDetails.pilotedBy.length > 0 ? (
            <ul>
              {megazordDetails.pilotedBy.map((ranger) => (
                <li key={ranger._id}>
                  <Link to={`/characters/${ranger._id}`}>
                    {ranger.name || "Unnamed Ranger"}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>No pilot information available.</p>
          )}
        </div>
         <Link to="/megazords">← Back to Magazords</Link>
         <button onClick={props.handleFormView}>
        {props.isFormOpen ? 'Close Form' : 'New Pet'}
      </button>
      </div>
    </div>
  );
};

export default MegazordDetail;
