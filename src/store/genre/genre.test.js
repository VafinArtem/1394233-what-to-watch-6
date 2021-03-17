import {ALL_GENRES_NAME_TAB} from '../../consts';
import {changeGenres, loadGenres} from '../action';
import {genre} from './genre';

describe(`Reducers work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    const initialState = {
      genre: ALL_GENRES_NAME_TAB,
      genres: [],
    };

    expect(genre(undefined, {})).toEqual(initialState);
  });

  it(`Reducer loads into the state the active genre obtained from the given value`, () => {
    const state = {
      genre: ALL_GENRES_NAME_TAB,
      genres: [],
    };

    const validState = {
      genre: `Thriller`,
      genres: [],
    };

    const ACTIVE_GENRE = `Thriller`;

    expect(genre(state, changeGenres(ACTIVE_GENRE))).toEqual(validState);
  });

  it(`Reducer loads into the state a list of genres obtained from the list of films transferred in the value`, () => {
    const state = {
      genre: ALL_GENRES_NAME_TAB,
      genres: [],
    };

    const validState = {
      genre: ALL_GENRES_NAME_TAB,
      genres: [`All genres`, `Thriller`, `Commedy`, `Dramma`],
    };

    const films = [
      {
        name: ``,
        description: ``,
        rating: ``,
        director: ``,
        genre: `Thriller`
      },
      {
        name: ``,
        description: ``,
        rating: ``,
        director: ``,
        genre: `Thriller`
      },
      {
        name: ``,
        description: ``,
        rating: ``,
        director: ``,
        genre: `Commedy`,
      },
      {
        name: ``,
        description: ``,
        rating: ``,
        director: ``,
        genre: `Dramma`,
      }
    ];

    expect(genre(state, loadGenres(films))).toEqual(validState);
  });
});
