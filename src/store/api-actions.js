import browserHistory from "../browser-history";
import {AuthorizationStatuses, Url} from "../consts";
import {changeAmountFilms, loadFilm, loadFilms, redirectToRoute, postComment, authorization, loadFavoriteFilms, addFavoriteFilmsList, removeFavoriteFilmsList} from "./action";

const Routes = {
  FILMS: `/films`,
  LOGIN: `/login`,
  LOGOUT: `/logout`,
  FAVORITE: `/favorite`,
  PROMO: `/films/promo`
};

const adaptToClient = (film) => {
  const adaptedFilm = Object.assign(
      {},
      film,
      {
        posterImage: film.poster_image,
        previeImage: film.preview_image,
        backgroundImage: film.background_image,
        backgroundColor: film.background_color,
        scoresCount: film.scores_count,
        runTime: film.run_time,
        isFavorite: film.is_favorite,
        videoLink: film.video_link,
        previewVideoLink: film.preview_video_link
      }
  );

  delete adaptedFilm.poster_image;
  delete adaptedFilm.preview_image;
  delete adaptedFilm.background_image;
  delete adaptedFilm.background_color;
  delete adaptedFilm.scores_count;
  delete adaptedFilm.run_time;
  delete adaptedFilm.is_favorite;
  delete adaptedFilm.video_link;
  delete adaptedFilm.preview_video_link;

  return adaptedFilm;
};

const adaptToServer = (comment) => {
  const adaptedComment = Object.assign(
      {},
      comment,
      {
        comment: comment.text
      }
  );

  delete adaptedComment.text;

  return adaptedComment;
};

export const fetchFilmsList = () => (dispatch, _getState, api) => (
  api.get(Routes.FILMS)
    .then(({data}) => data.map(adaptToClient))
    .then((data) => {
      dispatch(changeAmountFilms(data.length));
      return dispatch(loadFilms(data));
    })
);

export const fetchFavoriteFilmsList = () => (dispatch, _getState, api) => (
  api.get(Routes.FAVORITE)
    .then(({data}) => data.map(adaptToClient))
    .then((data) => dispatch(loadFavoriteFilms(data)))
);

export const fetchFilm = (id) => (dispatch, _getState, api) => (
  api.get(`/films/${id}`)
    .then(({data}) => adaptToClient(data))
    .then((data) => dispatch(loadFilm(data)))
    .catch(() => dispatch(redirectToRoute(Url.NOT_FOUND)))
);

export const fetchPromoFilm = () => (dispatch, _getState, api) => (
  api.get(Routes.PROMO)
    .then(({data}) => adaptToClient(data))
    .then((data) => dispatch(loadFilm(data)))
    .catch(() => dispatch(redirectToRoute(Url.NOT_FOUND)))
);

export const addComment = (id, comment) => (dispatch, _getState, api) => (
  api.post(`/comments/${id}`, adaptToServer(comment))
    .then(() => dispatch(postComment()))
    .then(() => dispatch(redirectToRoute(`/films/${id}`)))
    .catch(() => {})
);

export const addFavorite = (id, status) => (dispatch, _getState, api) => (
  api.post(`/favorite/${id}/${status}`)
    .then(({data}) => adaptToClient(data))
    .then((data) => {
      return status === 1 ? dispatch(addFavoriteFilmsList(data)) : dispatch(removeFavoriteFilmsList(data.id));
    })
    .catch(() => {})
);

export const checkLogin = () => (dispatch, _getState, api) => (
  api.get(Routes.LOGIN)
    .then(() => dispatch(authorization(AuthorizationStatuses.AUTH)))
    .catch(() => {})
);

export const login = ({login: email, password}) => (dispatch, _getState, api) => (
  api.post(Routes.LOGIN, {email, password})
    .then(() => dispatch(authorization(AuthorizationStatuses.AUTH)))
    .then(() => dispatch(redirectToRoute(Url.MAIN)))
    .catch(() => {})
);

export const logout = () => (dispatch, _getState, api) => (
  api.get(Routes.LOGOUT)
    .then(() => dispatch(authorization(AuthorizationStatuses.NO_AUTH)))
    .then(() => {
      if (browserHistory.location.pathname !== Url.MAIN) {
        dispatch(redirectToRoute(Url.MAIN));
      }
    })
);
