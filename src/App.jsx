import { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import TrackList from './components/TrackList/TrackList';
import TrackForm from './components/TrackForm/TrackForm';
import NowPlaying from './components/NowPlaying/NowPlaying';
import { getTracks, createTrack, updateTrack, deleteTrack } from './services/trackService';
import './App.css';

const App = () => {
  const [tracks, setTracks] = useState([]);
  const [nowPlaying, setNowPlaying] = useState(null);
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
        prevTracks.map((track) => (track._id === trackId ? updatedTrack : track))
      );
      navigate('/');
    }
  };

  // Delete a track
  const handleDeleteTrack = async (trackId) => {
    await deleteTrack(trackId);
    setTracks((prevTracks) => prevTracks.filter((track) => track._id !== trackId));
  };

  // Play a track
  const handlePlayTrack = (track) => {
    setNowPlaying(track);
  };

  return (
    <>
      <div className="header">
        <Link to="/add-track">
          <button>Add New Track</button>
        </Link>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <TrackList tracks={tracks} handlePlayTrack={handlePlayTrack} handleDeleteTrack={handleDeleteTrack} />
              <NowPlaying track={nowPlaying} />
            </>
          }
        />
        <Route path="/add-track" element={<TrackForm handleAddTrack={handleAddTrack} />} />
        <Route path="/edit-track/:trackId" element={<TrackForm handleUpdateTrack={handleUpdateTrack} />} />
      </Routes>
    </>
  );
};

export default App;
