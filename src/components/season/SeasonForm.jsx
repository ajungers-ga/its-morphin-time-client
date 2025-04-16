// src/components/season/SeasonForm.jsx
import { useState, useEffect } from 'react';
import './seasonForm.css';
import * as Services from '../services/services';

const SeasonForm = ({ existingData = null, onSubmit }) => {
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

  useEffect(() => {
    if (existingData) {
      setFormData({
        ...formData,
        ...existingData,
        rangers: existingData.rangers?.join(', ') || '',
        magozord: existingData.magozord?.join(', ') || '',
      });
    }
  }, [existingData]);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const preparedData = {
      ...formData,
      rangers: formData.rangers.split(',').map(id => id.trim()),
      magozord: formData.magozord.split(',').map(id => id.trim()),
    };

    if (existingData) {
      await Services.updateSeason(existingData._id, preparedData);
    } else {
      await Services.createSeason(preparedData);
    }

    if (onSubmit) onSubmit(); // Close or refresh from parent
  };

  return (
    <div className="seasonForm">
      <form onSubmit={handleSubmit}>
        <h2>{existingData ? 'Edit' : 'Add'} Season</h2>

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

        <label htmlFor="rangers">Rangers (IDs comma-separated)</label>
        <input id="rangers" name="rangers" value={formData.rangers} onChange={handleChange} />

        <label htmlFor="magozord">Megazords (IDs comma-separated)</label>
        <input id="magozord" name="magozord" value={formData.magozord} onChange={handleChange} />

        <button type="submit">{existingData ? 'Update' : 'Create'} Season</button>
      </form>
    </div>
  );
};

export default SeasonForm;
