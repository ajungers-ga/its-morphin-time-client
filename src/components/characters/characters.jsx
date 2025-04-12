// File Purpose: This component displays a list of Power Rangers characters from the backend
// Added by AJ - handles ranger rendering logic on the /characters route. following angels logic from Home

// 1. Import dependencies
import React from 'react';
import "./CharacterDetail.css";


// 2.1. Define the component function and accept props
const Characters = (props) => {
   
  console.log(props.rangers);

  // 3. Return some JSX
  return (
    <div className="characters-container">
      <h1>Meet the Power Rangers</h1>
      {!props.rangers.length ? (
        <h2>No Rangers Available</h2>
      ) : (
        <ul className="ranger-list">
          {props.rangers.map((ranger) => (
            <li key={ranger._id} className="ranger-card">
              <h2>{ranger.name}</h2>
              <p><strong>Color:</strong> {ranger.color}</p>
              <p><strong>Actor:</strong> {ranger.actor}</p>
              <p><strong>Zord(s):</strong> {ranger.zord.join(', ')}</p>
              <p><strong>First Appearance:</strong> {ranger.firstAp}</p>
              <p><strong>Last Appearance:</strong> {ranger.lastAp}</p>
              <p><strong>Season:</strong> {ranger.season?.name || 'Unknown'}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// 4. Export the component
export default Characters;