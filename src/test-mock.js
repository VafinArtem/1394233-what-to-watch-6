import {AuthorizationStatus} from "./consts";
import {NameSpace} from "./store/main-reducer";

export const testFilm = {
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

export const testComment = {
  id: 1,
  user: {
    id: 4,
    name: `Kate Muir`
  },
  rating: 8.9,
  comment: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
  date: `2019-05-08T14:13:56.569Z`
};

export const testStoreWithAuth = {
  [NameSpace.FILMS]: {
    films: [testFilm],
    promoMovie: testFilm,
    favoriteFilms: [testFilm],
    loadedFilm: testFilm
  },
  [NameSpace.AUTH]: {
    authorizationStatus: AuthorizationStatus.AUTH,
    isAuthorisationFailed: false,
    userAvatar: `fakeAvatar`
  },
  [NameSpace.GENRE]: {
    genre: testFilm.genre,
    genres: []
  },
  [NameSpace.COMMENT]: {
    isActiveAddCommentForm: true,
    reviews: {1: [testComment]}
  }
};

export const testStoreWithoutAuth = {
  [NameSpace.FILMS]: {
    films: [testFilm],
    promoMovie: testFilm,
    favoriteFilms: [testFilm],
    loadedFilm: testFilm
  },
  [NameSpace.AUTH]: {
    authorizationStatus: AuthorizationStatus.NO_AUTH,
    isAuthorisationFailed: false,
    userAvatar: `fakeAvatar`
  },
  [NameSpace.GENRE]: {
    genre: testFilm.genre,
    genres: []
  },
  [NameSpace.COMMENT]: {
    isActiveAddCommentForm: true,
    reviews: {1: [testComment]}
  }
};
