import React, {useState} from 'react';
import PropTypes from 'prop-types';
import MovieDetails from '../movie-details/movie-details';
import MovieOverview from '../movie-overview/movie-overview';
import MovieReview from '../movie-reviews/movie-reviews';
import {MOVIES_PROP} from '../../utils/validate';

const MovieTabs = ({film}) => {

  const getActiveTab = () => {
    if (activeTab.details) {
      return <MovieDetails
        duration={film.runTime}
        genre={film.genre}
        released={film.released}
        director={film.director}
        starring={film.starring}
      />;
    } else if (activeTab.overview) {
      return <MovieOverview
        rating={film.rating}
        scoresCount={film.scoresCount}
        description={film.description}
        director={film.director}
        starring={film.starring}
      />;
    }
    return <MovieReview filmID={film.id} />;
  };

  const [activeTab, setActiveTab] = useState({overview: true, details: false, review: false});
  return (
    <React.Fragment>
      <nav className="movie-nav movie-card__nav">
        <ul className="movie-nav__list">
          <li className={`movie-nav__item ${activeTab.overview ? `movie-nav__item--active` : ``}`}>
            <a href="#" className="movie-nav__link" onClick={
              (evt) => {
                evt.preventDefault();
                setActiveTab({
                  overview: true
                });
              }
            }>Overview</a>
          </li>
          <li className={`movie-nav__item ${activeTab.details ? `movie-nav__item--active` : ``}`}>
            <a href="#" className="movie-nav__link" onClick={
              (evt) => {
                evt.preventDefault();
                setActiveTab({
                  details: true
                });
              }
            }>Details</a>
          </li>
          <li className={`movie-nav__item ${activeTab.review ? `movie-nav__item--active` : ``}`}>
            <a href="#" className="movie-nav__link" onClick={
              (evt) => {
                evt.preventDefault();
                setActiveTab({
                  review: true
                });
              }
            }>Reviews</a>
          </li>
        </ul>
      </nav>
      {getActiveTab()}
    </React.Fragment>
  );
};

MovieTabs.propTypes = {
  film: PropTypes.shape(MOVIES_PROP).isRequired,
};

export default MovieTabs;
