import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTrack, createTrack, updateTrack } from '../../services/trackService';

const TrackForm = ({ handleAddTrack, handleUpdateTrack }) => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const { trackId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (trackId) {
      // Fetch track details if editing
      const fetchTrack = async () => {
        const trackData = await getTrack(trackId);
        if (trackData) {
          setTitle(trackData.title);
          setArtist(trackData.artist);
        }
      };
      fetchTrack();
    }
  }, [trackId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (trackId) {
      await handleUpdateTrack(trackId, { title, artist });
    } else {
      await handleAddTrack({ title, artist });
    }
    navigate('/');
  };

  return (
    <div className="track-form-container">
      <h2>{trackId ? 'Edit Track' : 'Add New Track'}</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label>Artist:</label>
        <input
          type="text"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          required
        />
        <button type="submit">{trackId ? 'Update Track' : 'Add Track'}</button>
      </form>
    </div>
  );
};

export default TrackForm;
