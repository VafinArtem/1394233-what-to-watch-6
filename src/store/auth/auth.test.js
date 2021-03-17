import {auth} from './auth';
import {ActionType} from '../action';
import {AuthorizationErrorMessage, AuthorizationStatuses} from '../../consts';

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

    const authosizationSucces = {
      type: ActionType.AUTHORIZATION,
      payload: AuthorizationStatuses.AUTH
    };

    const validState = {
      authorizationStatus: AuthorizationStatuses.AUTH,
      isAuthorisationFailed: false,
      errorMessage: AuthorizationErrorMessage.DEFAULT,
    };

    expect(auth(state, authosizationSucces)).toEqual(validState);
  });

  it(`Reducer will return a valid state in case of failed authorization`, () => {
    const state = {
      authorizationStatus: AuthorizationStatuses.NO_AUTH,
      isAuthorisationFailed: false,
      errorMessage: AuthorizationErrorMessage.DEFAULT,
    };

    const authosizationFailed = {
      type: ActionType.AUTHORIZATION_FAILED,
      payload: AuthorizationErrorMessage.EMAIL
    };

    const validState = {
      authorizationStatus: AuthorizationStatuses.NO_AUTH,
      isAuthorisationFailed: true,
      errorMessage: AuthorizationErrorMessage.EMAIL,
    };

    expect(auth(state, authosizationFailed)).toEqual(validState);
  });
});
