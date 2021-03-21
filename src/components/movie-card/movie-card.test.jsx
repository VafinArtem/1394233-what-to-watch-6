import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {MovieCard} from './movie-card';
import {testFilm} from '../../test-mock';

const mockStore = configureStore({});
const {name, posterImage, id, genre, previewVideoLink} = testFilm;

it(`MovieCard should render correctly`, () => {
  const history = createMemoryHistory();
  const resetShowFilmsAmount = jest.fn();
  const getName = jest.fn();
  const getGenre = jest.fn();

  render(
      <Provider store={mockStore({})}>
        <Router history={history}>
          <MovieCard
            title={name}
            poster={posterImage}
            id={id}
            genre={genre}
            previewVideoLink={previewVideoLink}
            resetShowFilmsAmount={resetShowFilmsAmount}
            getName={getName}
            getGenre={getGenre}
          />
        </Router>
      </Provider>
  );

  expect(screen.getByText(name)).toBeInTheDocument();

});
