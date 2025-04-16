// src/components/seasons/SeasonForm.jsx

import { useState } from 'react';
import './seasonForm.css';
import * as Services from '../services/services'
const SeasonForm = ({ handleAddSeason }) => {
  // 1. Define state for controlled form
  const [formData, setFormData] = useState({
    name: '',
    sentaiName: '',
    airingYear: '',
    seasonNumber: '',
    numberOfEpisodes: '',
    firstEpisode: '',
    lastEpisode: '',
    theme: '',
    producer: '',
    comment: '',
    img: '',
    rangers: '', 
    magozord: '', 
  });

  // 2. Handle changes to form inputs
  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  // 3. Handle form submission
  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleAddSeason(formData); // expects a prop passed down from parent
  };

  // 4. Return JSX
  return (
    <div className="seasonForm">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" value={formData.name} onChange={handleChange} required />

        <label htmlFor="sentaiName">Sentai Name</label>
        <input id="sentaiName" name="sentaiName" value={formData.sentaiName} onChange={handleChange} required />

        <label htmlFor="airingYear">Airing Year</label>
        <input type="number" id="airingYear" name="airingYear" value={formData.airingYear} onChange={handleChange} required />

        <label htmlFor="seasonNumber">Season Number</label>
        <input type="number" id="seasonNumber" name="seasonNumber" value={formData.seasonNumber} onChange={handleChange} required />

        <label htmlFor="numberOfEpisodes">Number of Episodes</label>
        <input type="number" id="numberOfEpisodes" name="numberOfEpisodes" value={formData.numberOfEpisodes} onChange={handleChange} required />

        <label htmlFor="firstEpisode">First Episode</label>
        <input id="firstEpisode" name="firstEpisode" value={formData.firstEpisode} onChange={handleChange} required />

        <label htmlFor="lastEpisode">Last Episode</label>
        <input id="lastEpisode" name="lastEpisode" value={formData.lastEpisode} onChange={handleChange} required />

        <label htmlFor="theme">Theme</label>
        <input id="theme" name="theme" value={formData.theme} onChange={handleChange} required />

        <label htmlFor="producer">Producer</label>
        <input id="producer" name="producer" value={formData.producer} onChange={handleChange} required />

        <label htmlFor="comment">Comment</label>
        <input id="comment" name="comment" value={formData.comment} onChange={handleChange} />

        <label htmlFor="img">Image URL</label>
        <input id="img" name="img" value={formData.img} onChange={handleChange} />

        <label htmlFor="rangers">Rangers (ObjectId or comma-separated)</label>
        <input id="rangers" name="rangers" value={formData.rangers} onChange={handleChange} />

        <label htmlFor="magozord">Megazords (ObjectId or comma-separated)</label>
        <input id="magozord" name="magozord" value={formData.magozord} onChange={handleChange} />

        <button type="submit">Add Season</button>
      </form>
    </div>
  );
};

export default SeasonForm;
