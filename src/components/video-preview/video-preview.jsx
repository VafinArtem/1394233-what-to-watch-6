import React, {createRef, useEffect} from 'react';
import PropTypes from 'prop-types';

const TIMEOUT_VIDEO_PLAY = 1000;

const VideoPreview = ({poster, url, isPlaying, setIsPlaying}) => {
  const videoRef = createRef();

  let timerID = null;

  useEffect(() => {
    if (isPlaying) {
      timerID = setTimeout(() => {
        videoRef.current.play();
      }, TIMEOUT_VIDEO_PLAY);
    }

    return () => {
      setIsPlaying(false);
      timerID = clearTimeout(timerID);
    };
  }, [isPlaying]);

  return (
    <video src={url} ref={videoRef} width={280} height={175} poster={poster} data-testid="videoPreview" muted></video>
  );
};

VideoPreview.propTypes = {
  poster: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  setIsPlaying: PropTypes.func.isRequired
};

export default VideoPreview;
