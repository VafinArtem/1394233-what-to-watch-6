import {
  changeGenres,
  showMoreFilms,
  resetAmountShowFilms,
  loadFilms,
  getFilmGenre,
  activeForm,
  getFilmName,
  loadGenres,
  loadFavoriteFilms,
  loadFilm,
  loadPromoFilm,
  postComment,
  loadComments,
  addFavoriteFilmsList,
  removeFavoriteFilmsList,
  authorization,
  authorizationFailed,
  redirectToRoute,
  ActionType,
} from './action';

describe(`Action creators work correctly`, () => {
  it(`Action creator for change active genre returns correct action`, () => {
    const expectedAction = {
      type: ActionType.CHANGE_GENRE,
      payload: `All genres`
    };

    expect(changeGenres(`All genres`)).toEqual(expectedAction);
  });

  it(`Action creator for show more films returns correct action`, () => {
    const expectedAction = {
      type: ActionType.SHOW_MORE_FILMS
    };

    expect(showMoreFilms()).toEqual(expectedAction);
  });

  it(`Action creator for reset amount show films returns correct action`, () => {
    const expectedAction = {
      type: ActionType.RESET_AMOUNT_SHOW_FILMS,
    };

    expect(resetAmountShowFilms()).toEqual(expectedAction);
  });

  it(`Action creator for load films returns correct action`, () => {
    const expectedAction = {
      type: ActionType.LOAD_FILMS,
      payload: [
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
      ]
    };

    const films = [
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

    expect(loadFilms(films)).toEqual(expectedAction);
  });

  it(`Action creator for load genres returns correct action`, () => {
    const expectedAction = {
      type: ActionType.LOAD_GENRES,
      payload: [
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
      ]
    };

    const films = [
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

    expect(loadGenres(films)).toEqual(expectedAction);
  });

  it(`Action creator for load favorite films returns correct action`, () => {
    const expectedAction = {
      type: ActionType.LOAD_FAVORITE_FILMS,
      payload: [
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
      ]
    };

    const films = [
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

    expect(loadFavoriteFilms(films)).toEqual(expectedAction);
  });

  it(`Action creator for load film returns correct action`, () => {
    const expectedAction = {
      type: ActionType.LOAD_FILM,
      payload: {
        name: ``,
        description: ``,
        rating: ``,
        director: ``,
        starring: [``, ``, ``],
        genre: ``,
        released: ``,
        id: ``,
        posterImage: ``,
        previeImage: ``,
        backgroundImage: ``,
        backgroundColor: ``,
        scoresCount: ``,
        runTime: ``,
        isFavorite: ``,
        videoLink: ``,
        previewVideoLink: ``,
      }
    };

    const film = {
      name: ``,
      description: ``,
      rating: ``,
      director: ``,
      starring: [``, ``, ``],
      genre: ``,
      released: ``,
      id: ``,
      posterImage: ``,
      previeImage: ``,
      backgroundImage: ``,
      backgroundColor: ``,
      scoresCount: ``,
      runTime: ``,
      isFavorite: ``,
      videoLink: ``,
      previewVideoLink: ``,
    };

    expect(loadFilm(film)).toEqual(expectedAction);
  });

  it(`Action creator for load promo film returns correct action`, () => {
    const expectedAction = {
      type: ActionType.LOAD_PROMO_FILM,
      payload: {
        name: ``,
        description: ``,
        rating: ``,
        director: ``,
        starring: [``, ``, ``],
        genre: ``,
        released: ``,
        id: ``,
        posterImage: ``,
        previeImage: ``,
        backgroundImage: ``,
        backgroundColor: ``,
        scoresCount: ``,
        runTime: ``,
        isFavorite: ``,
        videoLink: ``,
        previewVideoLink: ``,
      }
    };

    const film = {
      name: ``,
      description: ``,
      rating: ``,
      director: ``,
      starring: [``, ``, ``],
      genre: ``,
      released: ``,
      id: ``,
      posterImage: ``,
      previeImage: ``,
      backgroundImage: ``,
      backgroundColor: ``,
      scoresCount: ``,
      runTime: ``,
      isFavorite: ``,
      videoLink: ``,
      previewVideoLink: ``,
    };

    expect(loadPromoFilm(film)).toEqual(expectedAction);
  });

  it(`Action creator for post comments returns correct action`, () => {
    const expectedAction = {
      type: ActionType.POST_COMMENT,
      payload: {
        1: [
          {
            id: 1,
            user: {
              id: 1,
              name: ``
            },
            rating: 1,
            comment: ``,
            date: ``
          },
          {
            id: 2,
            user: {
              id: 2,
              name: ``
            },
            rating: 2,
            comment: ``,
            date: ``
          }
        ],
      }
    };

    const comments = [
      {
        id: 1,
        user: {
          id: 1,
          name: ``
        },
        rating: 1,
        comment: ``,
        date: ``
      },
      {
        id: 2,
        user: {
          id: 2,
          name: ``
        },
        rating: 2,
        comment: ``,
        date: ``
      }
    ];

    const id = 1;

    expect(postComment(comments, id)).toEqual(expectedAction);
  });

  it(`Action creator for load comments returns correct action`, () => {
    const expectedAction = {
      type: ActionType.LOAD_COMMENTS,
      payload: {
        1: [
          {
            id: 1,
            user: {
              id: 1,
              name: ``
            },
            rating: 1,
            comment: ``,
            date: ``
          },
          {
            id: 2,
            user: {
              id: 2,
              name: ``
            },
            rating: 2,
            comment: ``,
            date: ``
          }
        ],
      }
    };

    const comments = [
      {
        id: 1,
        user: {
          id: 1,
          name: ``
        },
        rating: 1,
        comment: ``,
        date: ``
      },
      {
        id: 2,
        user: {
          id: 2,
          name: ``
        },
        rating: 2,
        comment: ``,
        date: ``
      }
    ];

    const id = 1;

    expect(loadComments(comments, id)).toEqual(expectedAction);
  });

  it(`Action creator for add film to favorite films list returns correct action`, () => {
    const expectedAction = {
      type: ActionType.ADD_FAVORITE_FILM,
      payload: {
        name: ``,
        description: ``,
        rating: ``,
        director: ``,
        starring: [``, ``, ``],
        genre: ``,
        released: ``,
        id: ``,
        posterImage: ``,
        previeImage: ``,
        backgroundImage: ``,
        backgroundColor: ``,
        scoresCount: ``,
        runTime: ``,
        isFavorite: ``,
        videoLink: ``,
        previewVideoLink: ``,
      }
    };

    const film = {
      name: ``,
      description: ``,
      rating: ``,
      director: ``,
      starring: [``, ``, ``],
      genre: ``,
      released: ``,
      id: ``,
      posterImage: ``,
      previeImage: ``,
      backgroundImage: ``,
      backgroundColor: ``,
      scoresCount: ``,
      runTime: ``,
      isFavorite: ``,
      videoLink: ``,
      previewVideoLink: ``,
    };

    expect(addFavoriteFilmsList(film)).toEqual(expectedAction);
  });

  it(`ction creator for remove film from favorite films list returns correct action`, () => {
    const expectedAction = {
      type: ActionType.REMOVE_FAVORITE_FILM,
      payload: 1
    };

    const id = 1;

    expect(removeFavoriteFilmsList(id)).toEqual(expectedAction);
  });

  it(`Action creator for get film genre returns correct action`, () => {
    const expectedAction = {
      type: ActionType.FILM_GENRE,
      payload: `Thriller`
    };

    expect(getFilmGenre(`Thriller`)).toEqual(expectedAction);
  });

  it(`Action creator for get film name returns correct action`, () => {
    const expectedAction = {
      type: ActionType.FILM_NAME,
      payload: `Interstellar`
    };

    expect(getFilmName(`Interstellar`)).toEqual(expectedAction);
  });

  it(`Action creator for activate add comment form returns correct action`, () => {
    const expectedAction = {
      type: ActionType.ACTIVE_FORM,
      payload: true
    };

    expect(activeForm(true)).toEqual(expectedAction);
  });

  it(`Action creator for site authorization returns correct action`, () => {
    const expectedAction = {
      type: ActionType.AUTHORIZATION,
      payload: `Auth`
    };

    const AUTHORIZATION_STATUS = `Auth`;

    expect(authorization(AUTHORIZATION_STATUS)).toEqual(expectedAction);
  });

  it(`Action creator for site authorization returns correct action`, () => {
    const expectedAction = {
      type: ActionType.AUTHORIZATION_FAILED,
      payload: `Please enter a valid email address or password`
    };

    const AUTHORIZATION_ERROR_MESSAGE = `Please enter a valid email address or password`;

    expect(authorizationFailed(AUTHORIZATION_ERROR_MESSAGE)).toEqual(expectedAction);
  });

  it(`Action creator for redirect to route returns correct action`, () => {
    const expectedAction = {
      type: ActionType.REDIRECT_TO_ROUTE,
      payload: `/login`
    };

    const URL = `/login`;

    expect(redirectToRoute(URL)).toEqual(expectedAction);
  });
});
