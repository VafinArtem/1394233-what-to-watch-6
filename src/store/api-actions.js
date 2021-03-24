import browserHistory from "../browser-history";
import {AuthorizationStatus, Url, ApiRoute} from "../consts";
import {loadFilm, loadFilms, redirectToRoute, postComment, authorization, loadFavoriteFilms, addFavoriteFilmsList, removeFavoriteFilmsList, loadPromoFilm, loadGenres, loadComments} from "./action";

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
  api.get(ApiRoute.FILMS)
    .then(({data}) => data.map(adaptToClient))
    .then((data) => {
      dispatch(loadGenres(data));
      return dispatch(loadFilms(data));
    })
);

export const fetchFavoriteFilmsList = () => (dispatch, _getState, api) => (
  api.get(ApiRoute.FAVORITE)
    .then(({data}) => data.map(adaptToClient))
    .then((data) => dispatch(loadFavoriteFilms(data)))
    .catch(() => {})
);

export const fetchFilm = (id) => (dispatch, _getState, api) => (
  api.get(`${ApiRoute.FILMS}/${id}`)
    .then(({data}) => adaptToClient(data))
    .then((data) => dispatch(loadFilm(data)))
);

export const fetchPromoFilm = () => (dispatch, _getState, api) => (
  api.get(ApiRoute.PROMO)
    .then(({data}) => adaptToClient(data))
    .then((data) => dispatch(loadPromoFilm(data)))
    .catch(() => {})
);

export const fetchComments = (filmID) => (dispatch, _getState, api) => (
  api.get(`${ApiRoute.COMMENTS}/${filmID}`)
    .then(({data}) => dispatch(loadComments(data, filmID)))
    .catch(() => {})
);

export const addComment = (id, comment) => (dispatch, _getState, api) => (
  api.post(`${ApiRoute.COMMENTS}/${id}`, adaptToServer(comment))
    .then(({data}) => dispatch(postComment(data, id)))
    .then(() => dispatch(redirectToRoute(`/films/${id}`)))
    .catch(() => {})
);

export const addFavorite = (id, status) => (dispatch, _getState, api) => (
  api.post(`${ApiRoute.FAVORITE}/${id}/${status}`)
    .then(({data}) => adaptToClient(data))
    .then((data) => {
      return status === 1 ? dispatch(addFavoriteFilmsList(data)) : dispatch(removeFavoriteFilmsList(data.id));
    })
    .catch(() => dispatch(redirectToRoute(Url.SIGN_IN)))
);

export const checkLogin = () => (dispatch, _getState, api) => (
  api.get(ApiRoute.LOGIN)
    .then(({data}) => dispatch(authorization(AuthorizationStatus.AUTH, data.avatar_url)))
    .catch(() => {})
);

export const login = ({login: email, password}) => (dispatch, _getState, api) => (
  api.post(ApiRoute.LOGIN, {email, password})
    .then(({data}) => dispatch(authorization(AuthorizationStatus.AUTH, data.avatar_url)))
    .then(() => dispatch(redirectToRoute(Url.MAIN)))
    .catch(() => {})
);

export const logout = () => (dispatch, _getState, api) => (
  api.get(ApiRoute.LOGOUT)
    .then(() => dispatch(authorization(AuthorizationStatus.NO_AUTH)))
    .then(() => {
      if (browserHistory.location.pathname !== Url.MAIN) {
        dispatch(redirectToRoute(Url.MAIN));
      }
    })
);
