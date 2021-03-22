import {createReducer} from '@reduxjs/toolkit';
import {ActionType} from '../action';
import {AuthorizationErrorMessage, AuthorizationStatuses} from '../../consts';

const initialState = {
  authorizationStatus: AuthorizationStatuses.NO_AUTH,
  isAuthorisationFailed: false,
  errorMessage: AuthorizationErrorMessage.DEFAULT,
  userAvatar: ``,
};

const auth = createReducer(initialState, (builder) => {
  builder.addCase(ActionType.AUTHORIZATION, (state, {payload: {action, avatar}}) => {
    state.isAuthorisationFailed = false;
    state.authorizationStatus = action;
    state.errorMessage = AuthorizationErrorMessage.DEFAULT;
    state.userAvatar = avatar;
  });
  builder.addCase(ActionType.AUTHORIZATION_FAILED, (state, action) => {
    state.isAuthorisationFailed = true;
    state.errorMessage = action.payload;
  });
});

export {auth};
