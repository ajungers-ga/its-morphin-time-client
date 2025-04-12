// src/components/services/services.jsx

const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL;

// Seasons
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

// Characters (Rangers)
const fetchCharacters = async () => {
  try {
    const res = await fetch(`${BASE_URL}/rangers`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching characters:", err);
    return { err: "Failed to fetch characters" };
  }
};

const fetchCharacterDetails = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/rangers/${id}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching character details:", err);
    return { err: "Failed to fetch character details" };
  }
};

// Megazords
const fetchMegazords = async () => {
  try {
    const res = await fetch(`${BASE_URL}/megazords`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching megazords:", err);
    return { err: "Failed to fetch megazords" };
  }
};

const fetchMegazordDetails = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/megazords/${id}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching megazord details:", err);
    return { err: "Failed to fetch megazord details" };
  }
};

export {
  fetchSeasons,
  fetchSeasonDetails,
  fetchCharacters,
  fetchCharacterDetails,
  fetchMegazords,
  fetchMegazordDetails,
};