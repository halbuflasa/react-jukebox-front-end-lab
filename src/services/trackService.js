const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/tracks`;

const getTracks = async () => {
  try {
    const res = await fetch(BASE_URL);
    return await res.json();
  } catch (error) {
    console.error("Error fetching tracks:", error);
  }
};

// Fetch a single track by ID
const getTrack = async (trackId) => {
  try {
    const res = await fetch(`${BASE_URL}/${trackId}`);
    if (!res.ok) {
      throw new Error('Failed to fetch track');
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching track:", error);
  }
};

// Create a new track
const createTrack = async (trackData) => {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(trackData),
    });
    return await res.json();
  } catch (error) {
    console.error("Error creating track:", error);
  }
};

// Update an existing track
const updateTrack = async (trackId, trackData) => {
  try {
    const res = await fetch(`${BASE_URL}/${trackId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(trackData),
    });
    return await res.json();
  } catch (error) {
    console.error("Error updating track:", error);
  }
};

// Delete a track
const deleteTrack = async (trackId) => {
  try {
    const res = await fetch(`${BASE_URL}/${trackId}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      throw new Error('Failed to delete track');
    }
  } catch (error) {
    console.error("Error deleting track:", error);
  }
};

export {
  getTracks,
  getTrack,
  createTrack,
  updateTrack,
  deleteTrack,
};
