import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import configureStore from 'redux-mock-store';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {Routes} from '../../consts';
import {testFilm, testStoreWithAuth} from '../../test-mock';
import Movie from './movie';

const mockStore = configureStore({});
const {id, name, genre, released} = testFilm;
const onPlayMovie = jest.fn();

it(`Movie should render correctly`, () => {
  const history = createMemoryHistory();
  history.push(`${Routes.FILMS}/${id}`);

  render(
      <Provider store={mockStore(testStoreWithAuth)}>
        <Router history={history}>
          <Movie
            film={testFilm}
            onPlayMovie={onPlayMovie}
          />
        </Router>
      </Provider>
  );

  expect(screen.getByText(name)).toBeInTheDocument();
  expect(screen.getByText(genre)).toBeInTheDocument();
  expect(screen.getByText(released)).toBeInTheDocument();
  expect(screen.getByText(/WTW/i)).toBeInTheDocument();
  expect(screen.getByText(/Play/i)).toBeInTheDocument();
  expect(screen.getByText(/Add review/i)).toBeInTheDocument();
  expect(screen.getByText(/More like this/i)).toBeInTheDocument();
  expect(screen.getByText(/© 2019 What to watch Ltd./i)).toBeInTheDocument();
});

