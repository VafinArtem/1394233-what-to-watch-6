import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import configureStore from 'redux-mock-store';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import userEvent from '@testing-library/user-event';
import {SignInScreen} from './sign-in-screen';
import {Url} from '../../consts';
import {testStoreWithoutAuth} from '../../test-mock';

const mockStore = configureStore({});

it(`SignInScreen should render correctly`, () => {
  const onSubmit = jest.fn();
  const isAuthorisationFailed = false;
  const history = createMemoryHistory();
  history.push(Url.SIGN_IN);

  render(
      <Provider store={mockStore(testStoreWithoutAuth)}>
        <Router history={history}>
          <SignInScreen
            onSubmit={onSubmit}
            isAuthorisationFailed={isAuthorisationFailed}
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

