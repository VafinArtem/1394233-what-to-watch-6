import React from 'react';
import {render, screen} from '@testing-library/react';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import GenresList from './genres-list';
import {testStoreWithAuth} from '../../test-mock';

const mockStore = configureStore({});

it(`GenresList should render correctly`, () => {
  render(
      <Provider store={mockStore(testStoreWithAuth)}>
        <GenresList />
      </Provider>
  );

  expect(screen.getByTestId(`genreList`)).toBeInTheDocument();
});
