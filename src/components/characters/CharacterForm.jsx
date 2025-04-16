// src/components/characters/CharacterForm.jsx
import { useState, useEffect } from 'react';
import * as Services from '../services/services';
import './CharacterForm.css';

const CharacterForm = ({ existingData = null, onSubmit }) => {
  const [formData, setFormData] = useState({
    rangerID: '',
    name: '',
    fullName: '',
    zord: '',
    gender: '',
    season: '',
    color: '',
    homeworld: '',
    firstAp: '',
    lastAp: '',
    numberOfAp: '',
    actor: '',
    img: '',
    megazordPiloted: '',
  });

  useEffect(() => {
    if (existingData) {
      setFormData({
        ...formData,
        ...existingData,
        zord: Array.isArray(existingData.zord) ? existingData.zord.join(', ') : existingData.zord || '',
        season: existingData.season?._id || existingData.season || '',
        megazordPiloted: existingData.megazordPiloted?._id || existingData.megazordPiloted || '',
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
      zord: formData.zord.split(',').map((z) => z.trim()),
    };

    if (existingData) {
      await Services.updateCharacter(existingData._id, preparedData);
    } else {
      await Services.createCharacter(preparedData);
    }

    if (onSubmit) onSubmit(); // Optional callback from parent
  };

  return (
    <div className="characterForm">
      <form onSubmit={handleSubmit}>
        <h2>{existingData ? 'Edit' : 'Add'} Ranger</h2>

        <label htmlFor="rangerID">Ranger ID</label>
        <input name="rangerID" value={formData.rangerID} onChange={handleChange} required />

        <label htmlFor="name">Ranger Name</label>
        <input name="name" value={formData.name} onChange={handleChange} required />

        <label htmlFor="fullName">Full Name</label>
        <input name="fullName" value={formData.fullName} onChange={handleChange} />

        <label htmlFor="zord">Zords (comma-separated)</label>
        <input name="zord" value={formData.zord} onChange={handleChange} required />

        <label htmlFor="gender">Gender</label>
        <input name="gender" value={formData.gender} onChange={handleChange} required />

        <label htmlFor="season">Season ID</label>
        <input name="season" value={formData.season} onChange={handleChange} required />

        <label htmlFor="color">Ranger Color</label>
        <input name="color" value={formData.color} onChange={handleChange} required />

        <label htmlFor="homeworld">Homeworld</label>
        <input name="homeworld" value={formData.homeworld} onChange={handleChange} required />

        <label htmlFor="firstAp">First Appearance</label>
        <input name="firstAp" value={formData.firstAp} onChange={handleChange} required />

        <label htmlFor="lastAp">Last Appearance</label>
        <input name="lastAp" value={formData.lastAp} onChange={handleChange} required />

        <label htmlFor="numberOfAp"># of Appearances</label>
        <input type="number" name="numberOfAp" value={formData.numberOfAp} onChange={handleChange} required />

        <label htmlFor="actor">Actor</label>
        <input name="actor" value={formData.actor} onChange={handleChange} required />

        <label htmlFor="img">Image URL</label>
        <input name="img" value={formData.img} onChange={handleChange} />

        <label htmlFor="megazordPiloted">Megazord ID</label>
        <input name="megazordPiloted" value={formData.megazordPiloted} onChange={handleChange} />

        <button type="submit">{existingData ? 'Update' : 'Create'} Ranger</button>
      </form>
    </div>
  );
};

export default CharacterForm;
