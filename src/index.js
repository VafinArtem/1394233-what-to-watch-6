import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import {createAPI} from "./services/api";
import App from './components/app/app';
import mainReducer from './store/main-reducer';
import {authorization, authorizationFailed} from './store/action';
import {AuthorizationStatuses} from './consts';
import {checkLogin} from './store/api-actions';
import {redirect} from "./store/middlewares/redirect";

const api = createAPI(
    () => store.dispatch(authorization(AuthorizationStatuses.NO_AUTH)),
    () => store.dispatch(authorizationFailed())
);

const store = configureStore({
  reducer: mainReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api
      },
    }).concat(redirect)
});

store.dispatch(checkLogin());

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector(`#root`)
);
