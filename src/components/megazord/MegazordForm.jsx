// src/components/megazord/MegazordForm.jsx
import { useState, useEffect } from 'react';
import './megazordForm.css';
import * as Services from '../services/services';

const MegazordForm = ({ existingData = null, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    pictureLink: '',
    combinedMegazord: '',
  });

  // Populate form when editing
  useEffect(() => {
    if (existingData) {
      setFormData({
        name: existingData.name || '',
        pictureLink: existingData.pictureLink || '',
        combinedMegazord: existingData.combinedMegazord || '',
      });
    }
  }, [existingData]);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (existingData) {
      await Services.updateMegazord(existingData._id, formData);
    } else {
      await Services.createMegazord(formData);
    }
    if (onSubmit) onSubmit(); // optional callback to refresh or close form
  };

  return (
    <div className="megazordForm">
      <form onSubmit={handleSubmit}>
        <h2>{existingData ? 'Edit' : 'Add'} Megazord</h2>

        <label htmlFor="name">Name:</label>
        <input id="name" name="name" value={formData.name} onChange={handleChange} required />

        <label htmlFor="pictureLink">Image Link:</label>
        <input id="pictureLink" name="pictureLink" value={formData.pictureLink} onChange={handleChange} required />

        <label htmlFor="combinedMegazord">Combined Zord:</label>
        <input id="combinedMegazord" name="combinedMegazord" value={formData.combinedMegazord} onChange={handleChange} />

        <button type="submit">{existingData ? 'Update' : 'Create'} Megazord</button>
      </form>
    </div>
  );
};

export default MegazordForm;
