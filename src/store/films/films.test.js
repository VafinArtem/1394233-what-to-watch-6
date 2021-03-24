import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../services/api';
import {FILMS_AMOUNT_PER_STEP, ApiRoute} from '../../consts';
import {addFavoriteFilmsList, getFilmGenre, getFilmName, loadFavoriteFilms, loadFilm, loadFilms, loadPromoFilm, removeFavoriteFilmsList, resetAmountShowFilms, showMoreFilms} from '../action';
import {films} from './films';
import {addFavorite, fetchFavoriteFilmsList, fetchFilm, fetchFilmsList, fetchPromoFilm} from '../api-actions';

const api = createAPI(() => {});

const fakeFilm = {
  /* eslint-disable */
  id: 1,
  name: `The Grand Budapest Hotel`,
  poster_image: `img/the-grand-budapest-hotel-poster.jpg`,
  preview_image: `img/the-grand-budapest-hotel.jpg`,
  background_image: `img/the-grand-budapest-hotel-bg.jpg`,
  background_color: `#ffffff`,
  video_link: `https://some-link`,
  preview_video_link: `https://some-link`,
  description: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege.`,
  rating: 8.9,
  scores_count: 240,
  director: `Wes Andreson`,
  starring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`, `Saoirse Ronan`],
  run_time: 99,
  genre: `Comedy`,
  released: 2014,
  is_favorite: false
  /* eslint-enable */
};
const expectedFakeFilm = {
  id: 1,
  name: `The Grand Budapest Hotel`,
  posterImage: `img/the-grand-budapest-hotel-poster.jpg`,
  previeImage: `img/the-grand-budapest-hotel.jpg`,
  backgroundImage: `img/the-grand-budapest-hotel-bg.jpg`,
  backgroundColor: `#ffffff`,
  videoLink: `https://some-link`,
  previewVideoLink: `https://some-link`,
  description: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege.`,
  rating: 8.9,
  scoresCount: 240,
  director: `Wes Andreson`,
  starring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`, `Saoirse Ronan`],
  runTime: 99,
  genre: `Comedy`,
  released: 2014,
  isFavorite: false
};
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

describe(`Async operation work correctly`, () => {
  it(`Should make a correct API call to GET /films`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fakeFilms = [fakeFilm];
    const expectedFakeFilms = [expectedFakeFilm];
    const loadFilmsFromServer = fetchFilmsList();

    apiMock
      .onGet(ApiRoute.FILMS)
      .reply(200, fakeFilms);

    return loadFilmsFromServer(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(2, loadFilms(expectedFakeFilms));
      });
  });

  it(`Should make a correct API call to GET /favorite`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fakeFilms = [fakeFilm];
    const expectedFakeFilms = [expectedFakeFilm];
    const loadFavoriteFilmsFromServer = fetchFavoriteFilmsList();

    apiMock
      .onGet(ApiRoute.FAVORITE)
      .reply(200, fakeFilms);

    return loadFavoriteFilmsFromServer(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, loadFavoriteFilms(expectedFakeFilms));
      });
  });

  it(`Should make a correct API call to GET /film`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const filmID = 1;
    const loadFilmFromServer = fetchFilm(filmID);

    apiMock
      .onGet(`${ApiRoute.FILMS}/${filmID}`)
      .reply(200, fakeFilm);

    return loadFilmFromServer(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, loadFilm(expectedFakeFilm));
      });
  });

  it(`Should make a correct API call to GET /films/promo`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const loadPromoFilmFromServer = fetchPromoFilm();

    apiMock
      .onGet(ApiRoute.PROMO)
      .reply(200, fakeFilm);

    return loadPromoFilmFromServer(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, loadPromoFilm(expectedFakeFilm));
      });
  });

  it(`Should make a correct API call to GET /favorite/id/1`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const filmID = 1;
    const status = 1;
    const addFavoriteFilm = addFavorite(filmID, status);

    const fakeFavoriteFilm = {
      /* eslint-disable */
      id: 1,
      name: `The Grand Budapest Hotel`,
      poster_image: `img/the-grand-budapest-hotel-poster.jpg`,
      preview_image: `img/the-grand-budapest-hotel.jpg`,
      background_image: `img/the-grand-budapest-hotel-bg.jpg`,
      background_color: `#ffffff`,
      video_link: `https://some-link`,
      preview_video_link: `https://some-link`,
      description: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege.`,
      rating: 8.9,
      scores_count: 240,
      director: `Wes Andreson`,
      starring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`, `Saoirse Ronan`],
      run_time: 99,
      genre: `Comedy`,
      released: 2014,
      is_favorite: true
      /* eslint-enable */
    };

    const expectedFakeFavoriteFilm = {
      id: 1,
      name: `The Grand Budapest Hotel`,
      posterImage: `img/the-grand-budapest-hotel-poster.jpg`,
      previeImage: `img/the-grand-budapest-hotel.jpg`,
      backgroundImage: `img/the-grand-budapest-hotel-bg.jpg`,
      backgroundColor: `#ffffff`,
      videoLink: `https://some-link`,
      previewVideoLink: `https://some-link`,
      description: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege.`,
      rating: 8.9,
      scoresCount: 240,
      director: `Wes Andreson`,
      starring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`, `Saoirse Ronan`],
      runTime: 99,
      genre: `Comedy`,
      released: 2014,
      isFavorite: true
    };

    apiMock
      .onPost(`${ApiRoute.FAVORITE}/${filmID}/${status}`)
      .reply(200, fakeFavoriteFilm);

    return addFavoriteFilm(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, addFavoriteFilmsList(expectedFakeFavoriteFilm));
      });
  });

  it(`Should make a correct API call to GET /favorite/id/0`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const filmID = 1;
    const status = 0;
    const addFavoriteFilm = addFavorite(filmID, status);

    const fakeFavoriteFilm = {
      /* eslint-disable */
      id: 1,
      name: `The Grand Budapest Hotel`,
      poster_image: `img/the-grand-budapest-hotel-poster.jpg`,
      preview_image: `img/the-grand-budapest-hotel.jpg`,
      background_image: `img/the-grand-budapest-hotel-bg.jpg`,
      background_color: `#ffffff`,
      video_link: `https://some-link`,
      preview_video_link: `https://some-link`,
      description: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege.`,
      rating: 8.9,
      scores_count: 240,
      director: `Wes Andreson`,
      starring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`, `Saoirse Ronan`],
      run_time: 99,
      genre: `Comedy`,
      released: 2014,
      is_favorite: false
      /* eslint-enable */
    };

    apiMock
      .onPost(`${ApiRoute.FAVORITE}/${filmID}/${status}`)
      .reply(200, fakeFavoriteFilm);

    return addFavoriteFilm(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, removeFavoriteFilmsList(fakeFavoriteFilm.id));
      });
  });
});
