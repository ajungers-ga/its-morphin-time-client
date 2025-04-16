import { useState } from 'react';
import './megazordForm.css';
import * as Services from '../services/services';
import { getAllMegazords } from '../../services/megazordService';

// READ - All seasons
const fetchSeasons = async () => {
    try {
      const res = await fetch(`${BASE_URL}/seasons`);
      const data = await res.json();
      return data;
    } catch (err) {
      console.error("Error fetching seasons:", err);
      return { err: "Failed to fetch seasons" };
    }
  };
  
  // READ - Single season
  const fetchSeasonDetails = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/seasons/${id}`);
      const data = await res.json();
      return data;
    } catch (err) {
      console.error("Error fetching season details:", err);
      return { err: "Failed to fetch season details" };
    }
  };
  
  // CREATE - New season
  const createSeason = async (seasonData) => {
    try {
      const res = await fetch(`${BASE_URL}/seasons`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(seasonData),
      });
      const data = await res.json();
      return data;
    } catch (err) {
      console.error("Error creating season:", err);
      return { err: "Failed to create season" };
    }
  };
  
  // UPDATE - Season by ID
  const updateSeason = async (id, seasonData) => {
    try {
      const res = await fetch(`${BASE_URL}/seasons/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(seasonData),
      });
      const data = await res.json();
      return data;
    } catch (err) {
      console.error("Error updating season:", err);
      return { err: "Failed to update season" };
    }
  };
  
  // DELETE - Season by ID
  const deleteSeason = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/seasons/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      return data;
    } catch (err) {
      console.error("Error deleting season:", err);
      return { err: "Failed to delete season" };
    }
  };


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
        <h1>Add A Zord</h1>
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
