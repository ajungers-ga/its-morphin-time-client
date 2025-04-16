// src/components/PetForm/PetForm.jsx
import { useState } from 'react';
import './CharacterForm.css';
import '../services/services';
import { getAllRangers } from '../../services/rangerService';

const rangerForm = (props) => {
  // formData state to control the form.
  const [formData, setFormData] = useState({
    name: '',
    fullName: '',
    zord: '',
    gender: '',
    color: '',
    homeworld: '',
    firstAp: '',
    lastAp: '',
    numberofAp: '',
    actor: '',
    img: '',
  });

  // handleChange function to update formData state.
  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  // And finally, the form itself.
  return (
    <div className= "rangerForm">
      <form>
        <label htmlFor="name"> Name </label>
        <input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <label htmlFor="fullName"> Full Name </label>
        <input
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
        <label htmlFor="zord"> Zord </label>
        <input
          id="zord"
          name="zord"
          value={formData.zord}
          onChange={handleChange}
        />
        <label htmlFor="gender"> Gender </label>
        <input
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        />
        <label htmlFor="color"> Color </label>
        <input
          id="color"
          name="color"
          value={formData.color}
          onChange={handleChange}
          required
        />
        <label htmlFor="homeworld"> Homeworld </label>
        <input
          id="homeworld"
          name="homeworld"
          value={formData.homeworld}
          onChange={handleChange}
        />
        <label htmlFor="firstAp"> First Appearance </label>
        <input
          id="firstAp"
          name="firstAp"
          value={formData.firstAp}
          onChange={handleChange}
          required
        />
        <label htmlFor="lastAp"> Last Appearance </label>
        <input
          id="lastAp"
          name="lastAp"
          value={formData.lastAp}
          onChange={handleChange}
          required
        />
        <label htmlFor="numberofAp"> Number of Appearances </label>
        <input
          id="numberofAp"
          name="numberofAp"
          value={formData.numberofAp}
          onChange={handleChange}
        />
        <label htmlFor="Actor"> Actor </label>
        <input
          id="Actor"
          name="Actor"
          value={formData.Actor}
          onChange={handleChange}
          required
        />
        <label htmlFor="img"> Image Link </label>
        <input
          id="img"
          name="img"
          value={formData.img}
          onChange={handleChange}
        />
        <button type="submit">Add New Ranger</button>
      </form>
    </div>
  );
};

export default rangerForm;






