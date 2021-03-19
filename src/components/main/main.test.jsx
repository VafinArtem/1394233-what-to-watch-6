import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import configureStore from 'redux-mock-store';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {Url} from '../../consts';
import Main from './main';
import {testStoreWithAuth} from '../../test-mock';

const mockStore = configureStore({});

it(`Main should render correctly`, () => {
  const history = createMemoryHistory();
  history.push(Url.MAIN);

  render(
      <Provider store={mockStore(testStoreWithAuth)}>
        <Router history={history}>
          <Main />
        </Router>
      </Provider>
  );

  expect(screen.getByTestId(`mainContent`)).toBeInTheDocument();
});
