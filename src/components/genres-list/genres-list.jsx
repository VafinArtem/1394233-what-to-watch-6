import React, {memo} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import GenreTab from '../genre-tab/genre-tab';
import {getGenres} from '../../store/genre/selectors';
import {changeGenres} from '../../store/action';

const GenresList = ({onChangeGenres, genres}) => {
  return (
    <React.Fragment>
      {genres.length !== null ? <ul
        className="catalog__genres-list"
        data-testid="genreList">
        {genres.map((tab) => <GenreTab
          tab={tab}
          key={tab}
          onChangeGenres={onChangeGenres}
        />)}
      </ul> : ``}
    </React.Fragment>
  );
};

GenresList.propTypes = {
  onChangeGenres: PropTypes.func.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
};

const mapStateToProps = (state) => ({
  genres: getGenres(state),
});

const mapDispatchToProps = (dispatch) => ({
  onChangeGenres(type) {
    dispatch(changeGenres(type));
  },
});

export {GenresList};
export default connect(mapStateToProps, mapDispatchToProps)(memo(GenresList, (prevProps, nextProps) => prevProps.genres === nextProps.genres));
