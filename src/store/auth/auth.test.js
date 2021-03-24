import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../services/api';
import {auth} from './auth';
import {authorization, authorizationFailed, redirectToRoute} from '../action';
import {AuthorizationErrorMessage, AuthorizationStatus, ApiRoute, Url} from '../../consts';
import {checkLogin, login, logout} from '../api-actions';

const api = createAPI(() => {});
describe(`Reducers work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      isAuthorisationFailed: false,
      errorMessage: AuthorizationErrorMessage.DEFAULT,
      userAvatar: ``
    };

    expect(auth(undefined, {})).toEqual(initialState);
  });

  it(`Reducer will return a valid state upon successful authorization`, () => {
    const state = {
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      isAuthorisationFailed: false,
      errorMessage: AuthorizationErrorMessage.DEFAULT,
      userAvatar: ``
    };

    const validState = {
      authorizationStatus: AuthorizationStatus.AUTH,
      isAuthorisationFailed: false,
      errorMessage: AuthorizationErrorMessage.DEFAULT,
      userAvatar: `fakeAvatar`
    };

    expect(auth(state, authorization(AuthorizationStatus.AUTH, `fakeAvatar`))).toEqual(validState);
  });

  it(`Reducer will return a valid state in case of failed authorization`, () => {
    const state = {
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      isAuthorisationFailed: false,
      errorMessage: AuthorizationErrorMessage.DEFAULT,
      userAvatar: ``
    };

    const validState = {
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      isAuthorisationFailed: true,
      errorMessage: AuthorizationErrorMessage.EMAIL,
      userAvatar: ``
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
      .onGet(ApiRoute.LOGIN)
      .reply(200, {"avatar_url": `fakeAvatar`});

    return checkLoginStatus(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, authorization(AuthorizationStatus.AUTH, `fakeAvatar`));
      });
  });

  it(`Should make a correct API call to POST /login`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fakeUser = {email: `test@test.ru`, password: `123456`};
    const loginLoader = login(fakeUser);

    apiMock
      .onPost(ApiRoute.LOGIN)
      .reply(200, {"avatar_url": `fakeAvatar`});

    return loginLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, authorization(AuthorizationStatus.AUTH, `fakeAvatar`));
        expect(dispatch).toHaveBeenNthCalledWith(2, redirectToRoute(Url.MAIN));
      });
  });

  it(`Should make a correct API call to get /logout`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const logoutLoader = logout();

    apiMock
      .onGet(ApiRoute.LOGOUT)
      .reply(200, [{fake: true}]);

    return logoutLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, authorization(AuthorizationStatus.NO_AUTH));
      });
  });
});
