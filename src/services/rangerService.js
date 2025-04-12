const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL;

export async function getAllRangers() {
  const res = await fetch(`${BASE_URL}/rangers`);
  if (!res.ok) throw new Error("Failed to fetch rangers");
  return res.json();
}