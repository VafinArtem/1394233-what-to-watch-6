import React from 'react';
import {render, screen} from '@testing-library/react';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {testFilm, testStoreWithAuth} from '../../test-mock';
import {PromoMovie} from './promo-movie';

const mockStore = configureStore({});

const {name, genre, released} = testFilm;

it(`PromoMovie should render correctly`, () => {
  const resetShowFilmsAmount = jest.fn();

  render(
      <Provider store={mockStore(testStoreWithAuth)}>
        <PromoMovie
          promoMovie={testFilm}
          resetShowFilmsAmount={resetShowFilmsAmount}
        />
      </Provider>
  );

  expect(screen.getByText(name)).toBeInTheDocument();
  expect(screen.getByText(genre)).toBeInTheDocument();
  expect(screen.getByText(released)).toBeInTheDocument();
  expect(screen.getByText(/Play/i)).toBeInTheDocument();
});

