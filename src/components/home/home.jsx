// Home.jsx
import React from 'react';
import './Home.css';

const Home = (props) => {

  console.log(props);

  return (
    <div className="home-container">
      <div className="welcome-content">
        <h1>Welcome, Power Rangers Fan!</h1>
        <p>Ever wondered which Power Rangers team truly reigns supreme? Or maybe you're just trying to remember the name of that one Red Ranger with the really cool sword? Well, you've come to the right place! Go ahead and punch in your favorite season or that unforgettable Ranger. Our database is probably more powerful than the Morphin Grid itself (maybe...). So, what are you waiting for? It's Morphin Time... to search!</p>
        <div className="search-bar">
          <input type="text" placeholder="Search for your favorite season or Ranger..." />
          <button type="submit">Search</button>
        </div>
        <div>{!props.seasons.length ? (
  <h2>No seasons</h2>
) : (
  <ul>
    {props.seasons.map((season) => (
      <li key={season._id} ><strong>Season: </strong> <a href=""style={{ cursor: 'pointer', color: "#646CFF" }} onClick={()=> alert('you clicked')}>{season.name}</a></li>
    ))}
  </ul>
)}
</div>
      </div>
    </div>
  );
}

export default Home;