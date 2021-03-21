import React from 'react';
import {render, screen} from '@testing-library/react';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {ShowMoreButton} from './show-more-button';

const mockStore = configureStore({});

it(`ShowMoreButton should render correctly`, () => {
  const showMoreMovies = jest.fn();

  render(
      <Provider store={mockStore({})}>
        <ShowMoreButton
          showMoreMovies={showMoreMovies}
        />
      </Provider>
  );

  expect(screen.getByText(/Show more/i)).toBeInTheDocument();
});
