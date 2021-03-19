import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {Url} from '../../consts';
import NotFoundPage from './not-found-page';
import {testStoreWithAuth} from '../../test-mock';


const mockStore = configureStore({});
it(`NotFoundPage should render correctly`, () => {
  const history = createMemoryHistory();
  history.push(Url.NOT_FOUND);

  render(
      <Provider store={mockStore(testStoreWithAuth)}>
        <Router history={history}>
          <NotFoundPage />
        </Router>
      </Provider>
  );

  expect(screen.getByText(/404 Not Found/i)).toBeInTheDocument();
  expect(screen.getByText(/Вернуться на главную/i)).toBeInTheDocument();
  expect(screen.getByText(/© 2019 What to watch Ltd./i)).toBeInTheDocument();
});
