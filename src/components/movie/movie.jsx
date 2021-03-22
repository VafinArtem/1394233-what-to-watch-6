import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import UserBlock from '../user-block/user-block';
import MoviesList from '../movies-list/movies-list';
import MovieTabs from '../movie-tabs/movie-tabs';
import AddFavorite from '../add-favorite/add-favorite';
import {AuthorizationStatuses, Url} from '../../consts';
import {MOVIES_PROP} from '../../utils/validate';
import {getSimmilarMoviesWithGenre} from '../../store/films/selectors';
import {getAuthorizationStatus} from '../../store/auth/selectors';

const Movie = ({film, films, onPlayMovie, authorizationStatus}) => {
  const {
    backgroundImage,
    name,
    genre,
    released,
    posterImage,
    id,
    isFavorite,
    backgroundColor
  } = film;

  return (
    <React.Fragment>
      <section className="movie-card movie-card--full" style={{background: backgroundColor}}>
        <div className="movie-card__hero">
          <div className="movie-card__bg">
            <img src={backgroundImage} alt={name} />
          </div>
          <h1 className="visually-hidden">WTW</h1>
          <header className="page-header movie-card__head">
            <div className="logo">
              <Link to={Url.MAIN} className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </Link>
            </div>
            <UserBlock />
          </header>
          <div className="movie-card__wrap">
            <div className="movie-card__desc">
              <h2 className="movie-card__title">{name}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{genre}</span>
                <span className="movie-card__year">{released}</span>
              </p>
              <div className="movie-card__buttons">
                <button className="btn btn--play movie-card__button" type="button" onClick={() => onPlayMovie()}>
                  <svg viewBox="0 0 19 19" width={19} height={19}>
                    <use xlinkHref="#play-s" />
                  </svg>
                  <span>Play</span>
                </button>
                <AddFavorite
                  id={id}
                  isFavorite={isFavorite}
                />
                {authorizationStatus === AuthorizationStatuses.AUTH
                  ? <Link to={`/films/${id}/review`} className="btn movie-card__button movie-card__add-review">Add review</Link>
                  : ``
                }
              </div>
            </div>
          </div>
        </div>
        <div className="movie-card__wrap movie-card__translate-top">
          <div className="movie-card__info">
            <div className="movie-card__poster movie-card__poster--big">
              <img src={posterImage} alt={name} width={218} height={327} />
            </div>
            <div className="movie-card__desc">
              <MovieTabs
                film={film}
              />
            </div>
          </div>
        </div>
      </section>
      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          {films.length !== 0 ? <MoviesList
            films={films}
          /> : ``}
        </section>
        <footer className="page-footer">
          <div className="logo">
            <Link to={Url.MAIN} className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>
          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </React.Fragment>
  );
};

Movie.propTypes = {
  films: PropTypes.arrayOf(PropTypes.shape(MOVIES_PROP)).isRequired,
  film: PropTypes.shape(MOVIES_PROP).isRequired,
  onPlayMovie: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  films: getSimmilarMoviesWithGenre(state),
  authorizationStatus: getAuthorizationStatus(state),
});

export {Movie};
export default connect(mapStateToProps)(Movie);
