// src/components/PetForm/PetForm.jsx
import { useState } from 'react';
import './megazordForm.css';
import * as Services from '../services/services';
import { getAllMegazords } from '../../services/megazordService';

const MegazordForm = (props) => {
  // formData state to control the form.
  const [formData, setFormData] = useState({
    name: '',
    pictureLink: '',
    combinedMegazord: '',
  });
  // handleChange function to update formData state.
  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };
  // And finally, the form itself.
  return (
    <div className='megazordForm'>
      <form>
        <label htmlFor="name"> Name: </label>
        <input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <label htmlFor="pictureLink"> Image Link: </label>
        <input
          id="pictureLink"
          name="pictureLink"
          value={formData.pictureLink}
          onChange={handleChange}
          required
        />
        <label htmlFor="combinedMegazord"> Combined Zord: </label>
        <input
          id="combinedMegazord"
          name="combinedMegazord"
          value={formData.combinedMegazord}
          onChange={handleChange}
        />
        <button type="submit">Add New Zord</button>
      </form>
    </div>
  );
};
export default MegazordForm;