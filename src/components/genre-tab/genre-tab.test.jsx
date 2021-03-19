import React from 'react';
import {render, screen} from '@testing-library/react';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import GenreTab from './genre-tab';
import {testFilm, testStoreWithAuth} from '../../test-mock';

const mockStore = configureStore({});
const {genre} = testFilm;
const onChangeGenres = jest.fn();
const resetShowFilmsAmount = jest.fn();

it(`GenreTab should render correctly`, () => {
  render(
      <Provider store={mockStore(testStoreWithAuth)}>
        <GenreTab
          tab={genre}
          genre={genre}
          films={[testFilm]}
          onChangeGenres={onChangeGenres}
          resetShowFilmsAmount={resetShowFilmsAmount}
        />
      </Provider>
  );

  expect(screen.getByText(genre)).toBeInTheDocument();
});
