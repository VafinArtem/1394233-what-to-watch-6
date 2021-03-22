import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Link, useHistory} from 'react-router-dom';
import VideoPreview from '../video-preview/video-preview';
import {connect} from 'react-redux';
import {getFilmGenre, getFilmName, resetAmountShowFilms} from '../../store/action';

const MovieCard = ({title, poster, id, genre, previewVideoLink, resetShowFilmsAmount, getName, getGenre}) => {
  const history = useHistory();

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
      onMouseLeave={() => onMouseLeaveMovieCard()}
      onClick={() => {
        resetShowFilmsAmount();
        getName(title);
        getGenre(genre);
        history.push(`/films/${id}`);
      }}>
      <div className="small-movie-card__image">
        {isActive ? <VideoPreview poster={poster} url={previewVideoLink} isPlaying={isPlaying} setIsPlaying={setIsPlaying} /> : <img src={poster} alt={title} width={280} height={175} />}
      </div>
      <h3 className="small-movie-card__title">
        <Link className="small-movie-card__link" to={`/films/${id}`}>{title}</Link>
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
  resetShowFilmsAmount: PropTypes.func.isRequired,
  getGenre: PropTypes.func.isRequired,
  getName: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  resetShowFilmsAmount() {
    dispatch(resetAmountShowFilms());
  },
  getGenre(genre) {
    dispatch(getFilmGenre(genre));
  },
  getName(name) {
    dispatch(getFilmName(name));
  },
});

export {MovieCard};
export default connect(null, mapDispatchToProps)(MovieCard);
