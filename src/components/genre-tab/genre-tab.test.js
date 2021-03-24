import React from 'react';
import {render, screen} from '@testing-library/react';
import configureStore from 'redux-mock-store';
import userEvent from '@testing-library/user-event';
import {Provider} from 'react-redux';
import {GenreTab} from './genre-tab';
import {testFilm, testStoreWithAuth} from '../../test-mock';

const mockStore = configureStore({});

describe(`Test GenreTab`, () => {
  it(`GenreTab should render correctly`, () => {
    const {genre} = testFilm;
    const onChangeGenres = jest.fn();
    const resetShowFilmsAmount = jest.fn();
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

  it(`When user click Genre link should be change active genre and show films amount`, () => {
    const onChangeGenres = jest.fn();
    const resetShowFilmsAmount = jest.fn();
    let genre = `Action`;
    let showFilmsAmount = 16;

    onChangeGenres.mockImplementation(
        () => (genre = `Comedy`)
    );
    resetShowFilmsAmount.mockImplementation(
        () => (showFilmsAmount = 8)
    );

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

    userEvent.click(screen.getByRole(`link`));
    expect(genre).toBe(`Comedy`);
    expect(showFilmsAmount).toBe(8);
  });
});
