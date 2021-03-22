import React from 'react';
import {render, screen} from '@testing-library/react';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {GenresList} from './genres-list';
import {testStoreWithAuth} from '../../test-mock';

const mockStore = configureStore({});

it(`GenresList should render correctly`, () => {
  const onChangeGenres = jest.fn();
  const genres = [`Comedy`];

  render(
      <Provider store={mockStore(testStoreWithAuth)}>
        <GenresList
          genres={genres}
          onChangeGenres={onChangeGenres}
        />
      </Provider>
  );

  expect(screen.getByTestId(`genreList`)).toBeInTheDocument();
});
