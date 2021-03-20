import React, {createRef, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useHistory} from 'react-router-dom';
import {getRemainedDuration} from '../../utils/common';

const Player = ({title, video, poster}) => {
  const videoRef = createRef();
  const history = useHistory();

  const [isPlaying, setIsPlaying] = useState(false);
  const [onPlaying, setOnPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [proggressBarDuration, setProggressBarDuration] = useState(0);

  useEffect(() => {
    if (videoRef.current !== null) {
      videoRef.current.play();
      setDuration(videoRef.current.duration);
    }
  }, [videoRef.current]);

  return (
    <div className="player">
      <video src={video} ref={videoRef} className="player__video" poster={poster} onPlay={() => {
        setIsPlaying(true);
        setOnPlaying(true);
      }}
      onPause={() => setIsPlaying(false)}
      onTimeUpdate={() => {
        setDuration(videoRef.current.duration - videoRef.current.currentTime);
        setProggressBarDuration(videoRef.current.currentTime / videoRef.current.duration * 100);
      }} />
      <button type="button" className="player__exit" onClick={() => {
        setOnPlaying(false);
        history.goBack();
      }}>Exit</button>
      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={proggressBarDuration} max={100} />
            <div className="player__toggler" style={{left: `${proggressBarDuration}%`}}>Toggler</div>
          </div>
          <div className="player__time-value">{onPlaying ? `${getRemainedDuration(duration).hour}:${getRemainedDuration(duration).minutes}:${getRemainedDuration(duration).seconds}` : `00:00:00`}</div>
        </div>
        <div className="player__controls-row">
          <button type="button" className="player__play" onClick={() => isPlaying ? videoRef.current.pause() : videoRef.current.play()} data-testid="play">
            <svg viewBox="0 0 19 19" width={19} height={19}>
              <use xlinkHref={isPlaying ? `#pause` : `#play-s`} />
            </svg>
            <span>Play</span>
          </button>
          <div className="player__name">{title}</div>
          <button type="button" className="player__full-screen" onClick={() => {
            videoRef.current.requestFullscreen();
          }}>
            <svg viewBox="0 0 27 27" width={27} height={27}>
              <use xlinkHref="#full-screen" />
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
};

Player.propTypes = {
  title: PropTypes.string.isRequired,
  video: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired
};

export default Player;
