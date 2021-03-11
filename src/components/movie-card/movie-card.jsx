import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import VideoPreview from '../video-preview/video-preview';
import {connect} from 'react-redux';
import {ActionCreator} from '../../store/action';

const MovieCard = ({title, poster, id, genre, previewVideoLink, resetAmountShowFilms, getFilmName, getFilmGenre}) => {

  const [isActive, setIsActive] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const onMouseEnterMovieCard = () => {
    setIsActive(true);
    setIsPlaying(true);
  };

  const onMouseLeaveMovieCard = () => {
    setIsActive(false);
  };

  return (
    <article className="small-movie-card catalog__movies-card"
      onMouseEnter={() => {
        onMouseEnterMovieCard();
      }}
      onMouseLeave={() => onMouseLeaveMovieCard()}>
      <div className="small-movie-card__image">
        {isActive ? <VideoPreview poster={poster} url={previewVideoLink} isPlaying={isPlaying} setIsPlaying={setIsPlaying} /> : <img src={poster} alt={title} width={280} height={175} />}
      </div>
      <h3 className="small-movie-card__title">
        <Link className="small-movie-card__link" to={`/films/${id}`} onClick={() => {
          resetAmountShowFilms();
          getFilmName(title);
          getFilmGenre(genre);
        }}>{title}</Link>
      </h3>
    </article>
  );
};

MovieCard.propTypes = {
  poster: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  previewVideoLink: PropTypes.string.isRequired,
  resetAmountShowFilms: PropTypes.func.isRequired,
  getFilmGenre: PropTypes.func.isRequired,
  getFilmName: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  resetAmountShowFilms() {
    dispatch(ActionCreator.resetAmountShowFilms());
  },
  getFilmGenre(genre) {
    dispatch(ActionCreator.getFilmGenre(genre));
  },
  getFilmName(name) {
    dispatch(ActionCreator.getFilmName(name));
  },
});

export {MovieCard};
export default connect(null, mapDispatchToProps)(MovieCard);
