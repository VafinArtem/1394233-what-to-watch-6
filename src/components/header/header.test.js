import React from 'react';
import {render, screen} from '@testing-library/react';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {Header} from './header';
import {testFilm, testStoreWithAuth} from '../../test-mock';

const mockStore = configureStore({});

it(`Header should render correctly`, () => {
  const loadPromoFilm = jest.fn();
  render(
      <Provider store={mockStore(testStoreWithAuth)}>
        <Header
          promoMovie={testFilm}
          loadPromoFilm={loadPromoFilm}
        />
      </Provider>
  );

  expect(screen.getByText(/WTW/i)).toBeInTheDocument();
});
