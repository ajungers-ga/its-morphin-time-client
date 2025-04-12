// src/components/services/services.jsx

// 1. Import dependencies
// src/services/petService.js

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/seasons`;

const index = async () => {
  try {
    const res = await fetch(BASE_URL);
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

console.log(await index());


export {
  index,
};




// 2. Define the Services page
const Services = () => {
  // 3. Return some JSX
  return (
    <div>
      <h1>Power Ranger Services</h1>
      <p>This page will show backend-connected services like training, zord upgrades, etc.</p>
    </div>
  );
};

// 4. Export the component
export default Services;
