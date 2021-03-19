import React from 'react';
import PropTypes from 'prop-types';
import MovieCard from '../movie-card/movie-card';
import {MOVIES_PROP} from '../../utils/validate';

const MoviesList = ({films}) => {
  return (
    <div className="catalog__movies-list"
      data-testid="movieList"
    >
      {films.map((film) => <MovieCard
        key={film.id}
        id={film.id}
        title={film.name}
        poster={film.previeImage}
        previewVideoLink = {film.previewVideoLink}
        genre={film.genre}
      />)}
    </div>
  );
};

MoviesList.propTypes = {
  films: PropTypes.arrayOf(PropTypes.shape(MOVIES_PROP).isRequired).isRequired,
};

export default MoviesList;
