//////////////////////////
// SEASONS
//////////////////////////

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