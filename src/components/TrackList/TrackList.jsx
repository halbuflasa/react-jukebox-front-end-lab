import { Link } from 'react-router-dom';

const TrackList = ({ tracks, handleDeleteTrack }) => {
  return (
    <div className="track-list-container">
      <h1>Track List</h1>
      <div className="track-list-grid">
        {tracks.length === 0 ? (
          <p>No tracks available</p>
        ) : (
          tracks.map((track) => (
            <div className="track-card" key={track._id}>
              <h3>{track.title}</h3>
              <p className="track-artist">by {track.artist}</p>
              <div className="track-actions">
                <Link to={`/edit-track/${track._id}`}>
                  <button>Edit</button>
                </Link>
                <button onClick={() => handleDeleteTrack(track._id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TrackList;
