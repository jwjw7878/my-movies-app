import React from "react";
import YouTube from "react-youtube";
import { useMovieVideo } from "../../../hooks/useMovieVideo";
import "./MoviePreview.style.css";

const MoviePreview = ({ id, setPopup }) => {
  const { data } = useMovieVideo(id);
  const videos = data || [];
  const videoId = videos.length > 0 ? videos[0].key : null;

  const opts = {
    playerVars: {
      autoplay: 1,
      controls: 1,
    },
  };

  return (
    <div className="video-container" onClick={() => setPopup(false)}>
      <p className="close-btn">X</p>
      <div className="video-area" onClick={(e) => e.stopPropagation()}>
        {videoId ? (
          <div className="youtube-wrapper">
            <YouTube videoId={videoId} opts={opts} />
          </div>
        ) : (
          <p className="not-preview">예고편이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default MoviePreview;
