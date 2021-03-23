import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import MoviesList from './movies-list';
import {testFilm} from '../../test-mock';

const mockStore = configureStore({});

it(`MoviesList should render correctly`, () => {
  const history = createMemoryHistory();
  render(
      <Provider store={mockStore({})}>
        <Router history={history}>
          <MoviesList
            films={[testFilm]}
          />
        </Router>
      </Provider>
  );

  expect(screen.getByTestId(`movieList`)).toBeInTheDocument();
});
