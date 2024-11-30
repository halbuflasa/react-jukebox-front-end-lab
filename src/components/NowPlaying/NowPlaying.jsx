const NowPlaying = ({ track }) => {
    if (!track) return null;
  
    return (
      <div className="now-playing">
        <h2>Now Playing:</h2>
        <h3>{track.title}</h3>
        <p>Artist: {track.artist}</p>
      </div>
    );
  };
  
  export default NowPlaying;
  