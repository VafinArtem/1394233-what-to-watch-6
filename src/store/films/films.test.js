import {FILMS_AMOUNT_PER_STEP} from "../../consts";
import {addFavoriteFilmsList, getFilmGenre, getFilmName, loadFavoriteFilms, loadFilm, loadFilms, loadPromoFilm, removeFavoriteFilmsList, resetAmountShowFilms, showMoreFilms} from "../action";
import {films} from "./films";

describe(`Reducers work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    const initialState = {
      amountShowFilms: FILMS_AMOUNT_PER_STEP,
      films: [],
      favoriteFilms: [],
      loadedFilm: null,
      promoMovie: null,
      activeFilmGenre: ``,
      activeFilmName: ``
    };

    expect(films(undefined, {})).toEqual(initialState);
  });

  it(`Reducer increases the counter of shown films by the value of a constant`, () => {
    const state = {
      amountShowFilms: FILMS_AMOUNT_PER_STEP,
      films: [],
      favoriteFilms: [],
      loadedFilm: null,
      promoMovie: null,
      activeFilmGenre: ``,
      activeFilmName: ``
    };

    const validState = {
      amountShowFilms: 16,
      films: [],
      favoriteFilms: [],
      loadedFilm: null,
      promoMovie: null,
      activeFilmGenre: ``,
      activeFilmName: ``
    };

    expect(films(state, showMoreFilms())).toEqual(validState);
  });

  it(`Reducer resets the count of shown films to a constant value`, () => {
    const state = {
      amountShowFilms: 16,
      films: [],
      favoriteFilms: [],
      loadedFilm: null,
      promoMovie: null,
      activeFilmGenre: ``,
      activeFilmName: ``
    };

    const validState = {
      amountShowFilms: FILMS_AMOUNT_PER_STEP,
      films: [],
      favoriteFilms: [],
      loadedFilm: null,
      promoMovie: null,
      activeFilmGenre: ``,
      activeFilmName: ``
    };

    expect(films(state, resetAmountShowFilms())).toEqual(validState);
  });

  it(`Reducer loads movies from the passed value into the state`, () => {
    const state = {
      amountShowFilms: FILMS_AMOUNT_PER_STEP,
      films: [],
      favoriteFilms: [],
      loadedFilm: null,
      promoMovie: null,
      activeFilmGenre: ``,
      activeFilmName: ``
    };

    const validState = {
      amountShowFilms: FILMS_AMOUNT_PER_STEP,
      films: [
        {
          name: ``,
          description: ``,
          rating: ``,
          director: ``
        },
        {
          name: ``,
          description: ``,
          rating: ``,
          director: ``
        },
        {
          name: ``,
          description: ``,
          rating: ``,
          director: ``
        },
      ],
      favoriteFilms: [],
      loadedFilm: null,
      promoMovie: null,
      activeFilmGenre: ``,
      activeFilmName: ``
    };

    const loadedFilms = [
      {
        name: ``,
        description: ``,
        rating: ``,
        director: ``
      },
      {
        name: ``,
        description: ``,
        rating: ``,
        director: ``
      },
      {
        name: ``,
        description: ``,
        rating: ``,
        director: ``
      },
    ];

    expect(films(state, loadFilms(loadedFilms))).toEqual(validState);
  });

  it(`Reducer loads favorite movies from the passed value into the state`, () => {
    const initialState = {
      amountShowFilms: FILMS_AMOUNT_PER_STEP,
      films: [],
      favoriteFilms: [],
      loadedFilm: null,
      promoMovie: null,
      activeFilmGenre: ``,
      activeFilmName: ``
    };

    const validState = {
      amountShowFilms: FILMS_AMOUNT_PER_STEP,
      films: [],
      favoriteFilms: [
        {
          name: `12 friends`,
          description: ``,
          rating: ``,
          director: ``
        }
      ],
      loadedFilm: null,
      promoMovie: null,
      activeFilmGenre: ``,
      activeFilmName: ``
    };

    const loadedFilms = [
      {
        name: `12 friends`,
        description: ``,
        rating: ``,
        director: ``
      },
    ];

    expect(films(initialState, loadFavoriteFilms(loadedFilms))).toEqual(validState);

    const workingState = {
      amountShowFilms: FILMS_AMOUNT_PER_STEP,
      films: [],
      favoriteFilms: [
        {
          name: `11 friends`,
          description: ``,
          rating: ``,
          director: ``
        }
      ],
      loadedFilm: null,
      promoMovie: null,
      activeFilmGenre: ``,
      activeFilmName: ``
    };

    expect(films(workingState, loadFavoriteFilms(loadedFilms))).toEqual(validState);
  });

  it(`Reducer adds a feature of the selected film for the only one loaded into the state`, () => {
    const state = {
      amountShowFilms: FILMS_AMOUNT_PER_STEP,
      films: [],
      favoriteFilms: [],
      loadedFilm: {
        id: 1,
        name: ``,
        description: ``,
        rating: ``,
        director: ``,
        isFavorite: false,
      },
      promoMovie: null,
      activeFilmGenre: ``,
      activeFilmName: ``
    };

    const validState = {
      amountShowFilms: FILMS_AMOUNT_PER_STEP,
      films: [],
      favoriteFilms: [],
      loadedFilm: {
        id: 1,
        name: ``,
        description: ``,
        rating: ``,
        director: ``,
        isFavorite: true,
      },
      promoMovie: null,
      activeFilmGenre: ``,
      activeFilmName: ``
    };

    const favoriteFilm = {
      id: 1,
      name: ``,
      description: ``,
      rating: ``,
      director: ``,
      isFavorite: true,
    };

    expect(films(state, addFavoriteFilmsList(favoriteFilm))).toEqual(validState);
  });

  it(`Reducer adds a feature of the selected film to the films uploaded to the state`, () => {
    const state = {
      amountShowFilms: FILMS_AMOUNT_PER_STEP,
      films: [
        {
          id: 1,
          name: ``,
          description: ``,
          rating: ``,
          director: ``,
          isFavorite: false,
        },
        {
          id: 2,
          name: ``,
          description: ``,
          rating: ``,
          director: ``,
          isFavorite: true,
        }
      ],
      favoriteFilms: [
        {
          id: 2,
          name: ``,
          description: ``,
          rating: ``,
          director: ``,
          isFavorite: true,
        }
      ],
      loadedFilm: null,
      promoMovie: {
        id: 1,
        name: ``,
        description: ``,
        rating: ``,
        director: ``,
        isFavorite: false,
      },
      activeFilmGenre: ``,
      activeFilmName: ``
    };

    const validState = {
      amountShowFilms: FILMS_AMOUNT_PER_STEP,
      films: [
        {
          id: 1,
          name: ``,
          description: ``,
          rating: ``,
          director: ``,
          isFavorite: true,
        },
        {
          id: 2,
          name: ``,
          description: ``,
          rating: ``,
          director: ``,
          isFavorite: true,
        }
      ],
      favoriteFilms: [
        {
          id: 2,
          name: ``,
          description: ``,
          rating: ``,
          director: ``,
          isFavorite: true,
        },
        {
          id: 1,
          name: ``,
          description: ``,
          rating: ``,
          director: ``,
          isFavorite: true,
        }
      ],
      loadedFilm: null,
      promoMovie: {
        id: 1,
        name: ``,
        description: ``,
        rating: ``,
        director: ``,
        isFavorite: true,
      },
      activeFilmGenre: ``,
      activeFilmName: ``
    };

    const favoriteFilm = {
      id: 1,
      name: ``,
      description: ``,
      rating: ``,
      director: ``,
      isFavorite: true,
    };

    expect(films(state, addFavoriteFilmsList(favoriteFilm))).toEqual(validState);
  });

  it(`Reducer removes the feature of the selected film for the only one loaded into the state`, () => {
    const state = {
      amountShowFilms: FILMS_AMOUNT_PER_STEP,
      films: [],
      favoriteFilms: [],
      loadedFilm: {
        id: 1,
        name: ``,
        description: ``,
        rating: ``,
        director: ``,
        isFavorite: true,
      },
      promoMovie: null,
      activeFilmGenre: ``,
      activeFilmName: ``
    };

    const validState = {
      amountShowFilms: FILMS_AMOUNT_PER_STEP,
      films: [],
      favoriteFilms: [],
      loadedFilm: {
        id: 1,
        name: ``,
        description: ``,
        rating: ``,
        director: ``,
        isFavorite: false,
      },
      promoMovie: null,
      activeFilmGenre: ``,
      activeFilmName: ``
    };

    const favoriteFilmID = 1;

    expect(films(state, removeFavoriteFilmsList(favoriteFilmID))).toEqual(validState);
  });

  it(`Reducer removes the feature of the selected film from the films uploaded to the state`, () => {
    const state = {
      amountShowFilms: FILMS_AMOUNT_PER_STEP,
      films: [
        {
          id: 2,
          name: ``,
          description: ``,
          rating: ``,
          director: ``,
          isFavorite: true,
        }
      ],
      favoriteFilms: [
        {
          id: 2,
          name: ``,
          description: ``,
          rating: ``,
          director: ``,
          isFavorite: true,
        }
      ],
      loadedFilm: null,
      promoMovie: {
        id: 2,
        name: ``,
        description: ``,
        rating: ``,
        director: ``,
        isFavorite: true,
      },
      activeFilmGenre: ``,
      activeFilmName: ``
    };

    const validState = {
      amountShowFilms: FILMS_AMOUNT_PER_STEP,
      films: [
        {
          id: 2,
          name: ``,
          description: ``,
          rating: ``,
          director: ``,
          isFavorite: false,
        }
      ],
      favoriteFilms: [],
      loadedFilm: null,
      promoMovie: {
        id: 2,
        name: ``,
        description: ``,
        rating: ``,
        director: ``,
        isFavorite: false,
      },
      activeFilmGenre: ``,
      activeFilmName: ``
    };

    const favoriteFilmID = 2;

    expect(films(state, removeFavoriteFilmsList(favoriteFilmID))).toEqual(validState);
  });

  it(`Reducer loads into the state the only uploaded movie from the received value`, () => {
    const state = {
      amountShowFilms: FILMS_AMOUNT_PER_STEP,
      films: [],
      favoriteFilms: [],
      loadedFilm: null,
      promoMovie: null,
      activeFilmGenre: ``,
      activeFilmName: ``
    };

    const validState = {
      amountShowFilms: FILMS_AMOUNT_PER_STEP,
      films: [],
      favoriteFilms: [],
      loadedFilm: {
        id: 1,
        name: ``,
        description: ``,
        rating: ``,
        director: ``,
      },
      promoMovie: null,
      activeFilmGenre: ``,
      activeFilmName: ``
    };

    const loadedFilm = {
      id: 1,
      name: ``,
      description: ``,
      rating: ``,
      director: ``,
    };

    expect(films(state, loadFilm(loadedFilm))).toEqual(validState);
  });

  it(`Reducer loads into the state the promo movie from the received value`, () => {
    const state = {
      amountShowFilms: FILMS_AMOUNT_PER_STEP,
      films: [],
      favoriteFilms: [],
      loadedFilm: null,
      promoMovie: null,
      activeFilmGenre: ``,
      activeFilmName: ``
    };

    const validState = {
      amountShowFilms: FILMS_AMOUNT_PER_STEP,
      films: [],
      favoriteFilms: [],
      loadedFilm: null,
      promoMovie: {
        id: 1,
        name: ``,
        description: ``,
        rating: ``,
        director: ``,
      },
      activeFilmGenre: ``,
      activeFilmName: ``
    };

    const loadedFilm = {
      id: 1,
      name: ``,
      description: ``,
      rating: ``,
      director: ``,
    };

    expect(films(state, loadPromoFilm(loadedFilm))).toEqual(validState);
  });

  it(`Reducer loads into the state the genre of the active film obtained from the given value`, () => {
    const state = {
      amountShowFilms: FILMS_AMOUNT_PER_STEP,
      films: [],
      favoriteFilms: [],
      loadedFilm: null,
      promoMovie: null,
      activeFilmGenre: ``,
      activeFilmName: ``
    };

    const validState = {
      amountShowFilms: FILMS_AMOUNT_PER_STEP,
      films: [],
      favoriteFilms: [],
      loadedFilm: null,
      promoMovie: null,
      activeFilmGenre: `Thriller`,
      activeFilmName: ``
    };

    const activeFilm = {
      id: 1,
      name: ``,
      description: ``,
      rating: ``,
      director: ``,
      genre: `Thriller`,
    };

    expect(films(state, getFilmGenre(activeFilm.genre))).toEqual(validState);
  });

  it(`Reducer loads into the state the name of the active movie obtained from the given value`, () => {
    const state = {
      amountShowFilms: FILMS_AMOUNT_PER_STEP,
      films: [],
      favoriteFilms: [],
      loadedFilm: null,
      promoMovie: null,
      activeFilmGenre: ``,
      activeFilmName: ``
    };

    const validState = {
      amountShowFilms: FILMS_AMOUNT_PER_STEP,
      films: [],
      favoriteFilms: [],
      loadedFilm: null,
      promoMovie: null,
      activeFilmGenre: ``,
      activeFilmName: `11 friends`
    };

    const activeFilm = {
      id: 1,
      name: `11 friends`,
      description: ``,
      rating: ``,
      director: ``,
    };

    expect(films(state, getFilmName(activeFilm.name))).toEqual(validState);
  });
});
