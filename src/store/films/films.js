import {createReducer} from '@reduxjs/toolkit';
import {ActionType} from '../action';
import {FILMS_AMOUNT_PER_STEP} from '../../consts';

const findFilmIndex = (films, id) => films.findIndex((film) => film.id === id);

const initialState = {
  amountShowFilms: FILMS_AMOUNT_PER_STEP,
  films: [],
  favoriteFilms: [],
  loadedFilm: null,
  promoMovie: null,
  activeFilmGenre: ``,
  activeFilmName: ``
};

const films = createReducer(initialState, (builder) => {
  builder.addCase(ActionType.SHOW_MORE_FILMS, (state) => {
    state.amountShowFilms = state.amountShowFilms + FILMS_AMOUNT_PER_STEP;
  });
  builder.addCase(ActionType.RESET_AMOUNT_SHOW_FILMS, (state) => {
    state.amountShowFilms = FILMS_AMOUNT_PER_STEP;
  });
  builder.addCase(ActionType.LOAD_FILMS, (state, action) => {
    state.films = action.payload;
    state.loadedFilm = null;
  });
  builder.addCase(ActionType.LOAD_FAVORITE_FILMS, (state, action) => {
    state.favoriteFilms = action.payload;
  });
  builder.addCase(ActionType.ADD_FAVORITE_FILM, (state, action) => {
    if (state.loadedFilm !== null && state.loadedFilm.id === action.payload.id) {
      state.loadedFilm = Object.assign(
          {},
          state.loadedFilm,
          {isFavorite: !state.loadedFilm.isFavorite}
      );
    } else {
      const currentIndexFilm = findFilmIndex(state.films, action.payload.id);
      state.favoriteFilms = [
        ...state.favoriteFilms,
        action.payload
      ];
      state.films[currentIndexFilm] = Object.assign(
          {},
          state.films[currentIndexFilm],
          {isFavorite: !state.films[currentIndexFilm].isFavorite}
      );
      if (state.promoMovie.id === action.payload.id) {
        state.promoMovie = Object.assign(
            {},
            state.promoMovie,
            {isFavorite: !state.promoMovie.isFavorite}
        );
      }
    }
  });
  builder.addCase(ActionType.REMOVE_FAVORITE_FILM, (state, action) => {
    if (state.loadedFilm !== null && state.loadedFilm.id === action.payload) {
      state.loadedFilm = Object.assign(
          {},
          state.loadedFilm,
          {isFavorite: !state.loadedFilm.isFavorite}
      );
    } else {
      const currentIndexFilm = findFilmIndex(state.films, action.payload);
      state.favoriteFilms = state.favoriteFilms.filter((film) => film.id !== action.payload);
      state.films[currentIndexFilm] = Object.assign(
          {},
          state.films[currentIndexFilm],
          {isFavorite: !state.films[currentIndexFilm].isFavorite}
      );
      if (state.promoMovie.id === action.payload) {
        state.promoMovie = Object.assign(
            {},
            state.promoMovie,
            {isFavorite: !state.promoMovie.isFavorite}
        );
      }
    }
  });
  builder.addCase(ActionType.LOAD_FILM, (state, action) => {
    state.loadedFilm = action.payload;
  });
  builder.addCase(ActionType.LOAD_PROMO_FILM, (state, action) => {
    state.promoMovie = action.payload;
  });
  builder.addCase(ActionType.FILM_GENRE, (state, action) => {
    state.activeFilmGenre = action.payload;
  });
  builder.addCase(ActionType.FILM_NAME, (state, action) => {
    state.activeFilmName = action.payload;
  });
});

export {films};
