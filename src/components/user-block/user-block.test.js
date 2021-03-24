import React from 'react';
import {render, screen} from '@testing-library/react';
import configureStore from 'redux-mock-store';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {UserBlock} from './user-block';
import {testStoreWithAuth} from '../../test-mock';
import {NameSpace} from '../../store/main-reducer';

const mockStore = configureStore({});

it(`UserBlock should render correctly`, () => {
  const history = createMemoryHistory();
  render(
      <Provider store={mockStore(testStoreWithAuth)}>
        <Router history={history}>
          <UserBlock
            authorizationStatus={testStoreWithAuth[NameSpace.AUTH].authorizationStatus}
          />
        </Router>
      </Provider>
  );

  expect(screen.getByText(/Log Out/i)).toBeInTheDocument();
});
