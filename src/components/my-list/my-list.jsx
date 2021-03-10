import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import MoviesList from '../movies-list/movies-list';
import UserBlock from '../user-block/user-block';
import {MoviesAmmount, Url} from '../../consts';
import {MOVIES_PROP} from '../../utils/validate';

const MyList = ({films}) => {
  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <div className="logo">
          <Link to={Url.MAIN} className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>
        <h1 className="page-title user-page__title">My list</h1>
        <UserBlock />
      </header>
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <MoviesList
          films={films}
          maxFilms={MoviesAmmount.MY_LIST_PAGE}
        />
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
  );
};

MyList.propTypes = {
  films: PropTypes.arrayOf(PropTypes.shape(MOVIES_PROP).isRequired).isRequired,
};

const mapStateToProps = ({films}) => ({
  films,
});

export {MyList};
export default connect(mapStateToProps)(MyList);
