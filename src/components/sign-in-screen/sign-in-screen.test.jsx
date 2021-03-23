import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import configureStore from 'redux-mock-store';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import userEvent from '@testing-library/user-event';
import {SignInScreen} from './sign-in-screen';
import {AuthorizationStatuses, Url} from '../../consts';
import {testStoreWithoutAuth} from '../../test-mock';

const mockStore = configureStore({});

describe(`Test SignInScreen`, () => {
  it(`SignInScreen should render correctly`, () => {
    const onSubmit = jest.fn();
    const isAuthorisationFailed = false;
    const history = createMemoryHistory();
    const authorizationStatus = AuthorizationStatuses.NO_AUTH;
    history.push(Url.SIGN_IN);

    render(
        <Provider store={mockStore(testStoreWithoutAuth)}>
          <Router history={history}>
            <SignInScreen
              onSubmit={onSubmit}
              isAuthorisationFailed={isAuthorisationFailed}
              authorizationStatus={authorizationStatus}
            />
          </Router>
        </Provider>
    );

    expect(screen.getByText(/© 2019 What to watch Ltd./i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();

    userEvent.type(screen.getByTestId(`login`), `keks@test.ru`);
    userEvent.type(screen.getByTestId(`password`), `123456`);

    expect(screen.getByDisplayValue(/keks@test.ru/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/123456/i)).toBeInTheDocument();
  });

  it(`When a user clicks on 'Sign in' should be change user data`, () => {
    const history = createMemoryHistory();
    history.push(Url.SIGN_IN);
    const isAuthorisationFailed = false;
    const authorizationStatus = AuthorizationStatuses.NO_AUTH;
    const onSubmit = jest.fn();
    const userData = {
      login: ``,
      password: ``,
    };

    const validData = {
      login: `keks@test.ru`,
      password: `123456`,
    };

    onSubmit.mockImplementation(
        () => {
          userData.login = `keks@test.ru`;
          userData.password = `123456`;
        }
    );

    render(
        <Provider store={mockStore(testStoreWithoutAuth)}>
          <Router history={history}>
            <SignInScreen
              onSubmit={onSubmit}
              isAuthorisationFailed={isAuthorisationFailed}
              authorizationStatus={authorizationStatus}
            />
          </Router>
        </Provider>
    );

    userEvent.type(screen.getByTestId(`login`), `keks@test.ru`);
    userEvent.type(screen.getByTestId(`password`), `123456`);

    userEvent.click(screen.getByRole(`button`));
    expect(userData.login).toBe(validData.login);
    expect(userData.password).toBe(validData.password);
  });
});
