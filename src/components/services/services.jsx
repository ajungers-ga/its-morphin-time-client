// src/components/services/services.jsx

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/seasons`;

const fetchSeasons = async () => {
  try {
    const res = await fetch(BASE_URL);
    const data = await res.json(); // Make sure to parse the response body as JSON
    return data;
  } catch (err) {
    console.error("Error fetching seasons in services:", err);
    return { err: "Failed to fetch seasons" }; // Return an error object
  }
};

console.log(await fetchSeasons()); // You can remove this line, as the component will handle the data

export {
  fetchSeasons,
};

// 2. Define the Services page (This part remains the same as you are not using it to fetch seasons in App.jsx)
const Services = () => {
  return (
    <div>
      <h1>Power Ranger Services</h1>
      <p>This page will show backend-connected services like training, zord upgrades, etc.</p>
    </div>
  );
};

export default Services;