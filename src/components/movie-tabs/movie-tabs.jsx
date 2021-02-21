import React, {useState} from 'react';
import PropTypes from 'prop-types';
import MovieDetails from '../movie-details/movie-details';
import MovieOverview from '../movie-overview/movie-overview';
import MovieReview from '../movie-reviews/movie-reviews';
import {MOVIES_PROP, REVIEW_PROP} from '../../utils/validate';

const MovieTabs = ({film, reviews}) => {

  const getActiveTab = () => {
    if (activeTab.details) {
      return <MovieDetails film={film} />;
    } else if (activeTab.overview) {
      return <MovieOverview film={film} />;
    }
    return <MovieReview reviews={reviews} />;
  };

  const [activeTab, setActiveTab] = useState({overview: true, details: false, review: false});
  return (
    <React.Fragment>
      <nav className="movie-nav movie-card__nav">
        <ul className="movie-nav__list">
          <li className={activeTab.overview ? `movie-nav__item movie-nav__item--active` : `movie-nav__item`}>
            <a href="#" className="movie-nav__link" onClick={
              (evt) => {
                evt.preventDefault();
                setActiveTab({
                  overview: true
                });
              }
            }>Overview</a>
          </li>
          <li className={activeTab.details ? `movie-nav__item movie-nav__item--active` : `movie-nav__item`}>
            <a href="#" className="movie-nav__link" onClick={
              (evt) => {
                evt.preventDefault();
                setActiveTab({
                  details: true
                });
              }
            }>Details</a>
          </li>
          <li className={activeTab.review ? `movie-nav__item movie-nav__item--active` : `movie-nav__item`}>
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
  reviews: PropTypes.arrayOf(PropTypes.shape(REVIEW_PROP)).isRequired
};

export default MovieTabs;
