import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../services/api';
import {auth} from './auth';
import {authorization, authorizationFailed, redirectToRoute} from '../action';
import {AuthorizationErrorMessage, AuthorizationStatuses, Routes, Url} from '../../consts';
import {checkLogin, login, logout} from '../api-actions';

const api = createAPI(() => {});
describe(`Reducers work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    const initialState = {
      authorizationStatus: AuthorizationStatuses.NO_AUTH,
      isAuthorisationFailed: false,
      errorMessage: AuthorizationErrorMessage.DEFAULT,
    };

    expect(auth(undefined, {})).toEqual(initialState);
  });

  it(`Reducer will return a valid state upon successful authorization`, () => {
    const state = {
      authorizationStatus: AuthorizationStatuses.NO_AUTH,
      isAuthorisationFailed: false,
      errorMessage: AuthorizationErrorMessage.DEFAULT,
    };

    const validState = {
      authorizationStatus: AuthorizationStatuses.AUTH,
      isAuthorisationFailed: false,
      errorMessage: AuthorizationErrorMessage.DEFAULT,
    };

    expect(auth(state, authorization(AuthorizationStatuses.AUTH))).toEqual(validState);
  });

  it(`Reducer will return a valid state in case of failed authorization`, () => {
    const state = {
      authorizationStatus: AuthorizationStatuses.NO_AUTH,
      isAuthorisationFailed: false,
      errorMessage: AuthorizationErrorMessage.DEFAULT,
    };

    const validState = {
      authorizationStatus: AuthorizationStatuses.NO_AUTH,
      isAuthorisationFailed: true,
      errorMessage: AuthorizationErrorMessage.EMAIL,
    };

    expect(auth(state, authorizationFailed())).toEqual(validState);
  });
});

describe(`Async operation work correctly`, () => {
  it(`Should make a correct API call to GET /login`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const checkLoginStatus = checkLogin();

    apiMock
      .onGet(Routes.LOGIN)
      .reply(200, [{fake: true}]);

    return checkLoginStatus(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, authorization(AuthorizationStatuses.AUTH));
      });
  });

  it(`Should make a correct API call to POST /login`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fakeUser = {email: `test@test.ru`, password: `123456`};
    const loginLoader = login(fakeUser);

    apiMock
      .onPost(Routes.LOGIN)
      .reply(200, [{fake: true}]);

    return loginLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, authorization(AuthorizationStatuses.AUTH));
        expect(dispatch).toHaveBeenNthCalledWith(2, redirectToRoute(Url.MAIN));
      });
  });

  it(`Should make a correct API call to get /logout`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const logoutLoader = logout();

    apiMock
      .onGet(Routes.LOGOUT)
      .reply(200, [{fake: true}]);

    return logoutLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, authorization(AuthorizationStatuses.NO_AUTH));
      });
  });
});
