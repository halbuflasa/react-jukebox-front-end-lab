import { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import TrackList from './components/TrackList/TrackList';
import TrackForm from './components/TrackForm/TrackForm';
import { getTracks, createTrack, updateTrack } from './services/trackService';

const App = () => {
  const [tracks, setTracks] = useState([]);
  const navigate = useNavigate();

  // Fetch all tracks when the app loads
  useEffect(() => {
    const fetchTracks = async () => {
      const data = await getTracks();
      if (data) {
        setTracks(data);
      }
    };
    fetchTracks();
  }, []);

  // Add a new track
  const handleAddTrack = async (trackData) => {
    const newTrack = await createTrack(trackData);
    if (newTrack) {
      setTracks((prevTracks) => [...prevTracks, newTrack]);
      navigate('/');
    }
  };

  // Update an existing track
  const handleUpdateTrack = async (trackId, trackData) => {
    const updatedTrack = await updateTrack(trackId, trackData);
    if (updatedTrack) {
      setTracks((prevTracks) =>
        prevTracks.map((track) =>
          track._id === trackId ? updatedTrack : track
        )
      );
      navigate('/');
    }
  };

  return (
    <>
      <div className="header">
        <Link to="/add-track">
          <button>Add New Track</button>
        </Link>
      </div>
      <Routes>
        <Route path="/" element={<TrackList tracks={tracks} />} />
        <Route path="/add-track" element={<TrackForm handleAddTrack={handleAddTrack} />} />
        <Route path="/edit-track/:trackId" element={<TrackForm handleUpdateTrack={handleUpdateTrack} />} />
      </Routes>
    </>
  );
};

export default App;
