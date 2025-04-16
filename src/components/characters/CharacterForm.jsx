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
        rangerID: existingData.rangerID || '',
        name: existingData.name || '',
        fullName: existingData.fullName || '',
        zord: Array.isArray(existingData.zord) ? existingData.zord.join(', ') : existingData.zord || '',
        gender: existingData.gender || '',
        color: existingData.color || '',
        homeworld: existingData.homeworld || '',
        firstAp: existingData.firstAp || '',
        lastAp: existingData.lastAp || '',
        numberOfAp: existingData.numberOfAp || '',
        actor: existingData.actor || '',
        img: existingData.img || '',
        megazordPiloted: existingData.megazordPiloted?._id || existingData.megazordPiloted || '',
      });
    } else {
      setFormData({
        rangerID: '',
        name: '',
        fullName: '',
        zord: '',
        gender: '',
        color: '',
        homeworld: '',
        firstAp: '',
        lastAp: '',
        numberOfAp: '',
        actor: '',
        img: '',
        megazordPiloted: '',
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
      rangerID: parseInt(formData.rangerID, 10),
      numberOfAp: parseInt(formData.numberOfAp, 10),
      zord: formData.zord.split(',').map((z) => z.trim()),
      megazordPiloted: formData.megazordPiloted || undefined,
      // season field is still excluded
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

        {!existingData && (
          <>
            {/* Ranger ID will not be shown for create */}
            <label htmlFor="rangerID">Ranger ID</label>
            <input type="number" name="rangerID" value={formData.rangerID} onChange={handleChange} required />
          </>
        )}
        {existingData && (
          <>
            <label htmlFor="rangerID">Ranger ID</label>
            <input type="number" name="rangerID" value={formData.rangerID} onChange={handleChange} required readOnly />
          </>
        )}


        <label htmlFor="name">Ranger Name</label>
        <input name="name" value={formData.name} onChange={handleChange} required />

        <label htmlFor="fullName">Full Name</label>
        <input name="fullName" value={formData.fullName} onChange={handleChange} />

        <label htmlFor="zord">Zords (comma-separated)</label>
        <input name="zord" value={formData.zord} onChange={handleChange} required />

        <label htmlFor="gender">Gender</label>
        <input name="gender" value={formData.gender} onChange={handleChange} required />

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

        {!existingData && (
          <>
            {/* Megazord ID will not be shown for create */}
            <label htmlFor="megazordPiloted">Megazord ID</label>
            <input name="megazordPiloted" value={formData.megazordPiloted} onChange={handleChange} />
          </>
        )}
        {existingData && (
          <>
            <label htmlFor="megazordPiloted">Megazord ID</label>
            <input name="megazordPiloted" value={formData.megazordPiloted} onChange={handleChange} />
          </>
        )}

        <button type="submit">{existingData ? 'Update' : 'Create'} Ranger</button>
      </form>
    </div>
  );
};

export default CharacterForm;