const NowPlaying = ({ track }) => {
    if (!track) return null;
  
    return (
      <div className="now-playing">
        <h2>Now Playing:</h2>
        <h3>{track.title} by {track.artist}</h3>
      </div>
    );
  };
  
  export default NowPlaying;
  