import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {MovieCard} from './movie-card';
import {testFilm} from '../../test-mock';

const mockStore = configureStore({});
const {name, posterImage, id, genre, previewVideoLink} = testFilm;

describe(`Test MovieCard`, () => {
  it(`MovieCard should render correctly`, () => {
    const history = createMemoryHistory();
    const resetShowFilmsAmount = jest.fn();
    const getName = jest.fn();
    const getGenre = jest.fn();

    render(
        <Provider store={mockStore({})}>
          <Router history={history}>
            <MovieCard
              title={name}
              poster={posterImage}
              id={id}
              genre={genre}
              previewVideoLink={previewVideoLink}
              resetShowFilmsAmount={resetShowFilmsAmount}
              getName={getName}
              getGenre={getGenre}
            />
          </Router>
        </Provider>
    );

    expect(screen.getByText(name)).toBeInTheDocument();
  });

  it(`When user click on film title should be change active film title, genre and show films amount`, () => {
    const history = createMemoryHistory();
    let title = ``;
    let filmGenre = ``;
    let showFilmAmount = 16;
    const resetShowFilmsAmount = jest.fn();
    const getName = jest.fn();
    const getGenre = jest.fn();

    resetShowFilmsAmount.mockImplementation(
        () => (showFilmAmount = 8)
    );
    getName.mockImplementation(
        () => (title = name)
    );
    getGenre.mockImplementation(
        () => (filmGenre = genre)
    );

    const {container} = render(
        <Provider store={mockStore({})}>
          <Router history={history}>
            <MovieCard
              title={name}
              poster={posterImage}
              id={id}
              genre={genre}
              previewVideoLink={previewVideoLink}
              resetShowFilmsAmount={resetShowFilmsAmount}
              getName={getName}
              getGenre={getGenre}
            />
          </Router>
        </Provider>
    );

    const link = container.querySelector(`.small-movie-card__link`);

    userEvent.click(link);
    expect(showFilmAmount).toBe(8);
    expect(title).toBe(name);
    expect(filmGenre).toBe(genre);
    expect(screen.getByTestId(`videoPreview`)).toBeInTheDocument();
  });
});
