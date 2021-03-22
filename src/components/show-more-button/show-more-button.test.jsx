import React from 'react';
import {render, screen} from '@testing-library/react';
import configureStore from 'redux-mock-store';
import userEvent from '@testing-library/user-event';
import {Provider} from 'react-redux';
import {ShowMoreButton} from './show-more-button';

const mockStore = configureStore({});

describe(`Test ShowMoreButton`, () => {
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

  it(`When a user clicks on 'Show more' should be show more films`, () => {
    let amountShowFilms = 8;
    const showMoreMovies = jest.fn();
    showMoreMovies.mockImplementation(
        () => (amountShowFilms = 16)
    );

    render(
        <Provider store={mockStore({})}>
          <ShowMoreButton
            showMoreMovies={showMoreMovies}
          />
        </Provider>
    );

    userEvent.click(screen.getByRole(`button`));
    expect(amountShowFilms).toBe(16);
  });
});
