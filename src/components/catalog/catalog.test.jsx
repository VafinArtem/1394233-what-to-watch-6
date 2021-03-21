import React from 'react';
import {render, screen} from '@testing-library/react';
import configureStore from 'redux-mock-store';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {Catalog} from './catalog';
import {testStoreWithAuth} from '../../test-mock';
import {NameSpace} from '../../store/main-reducer';

const mockStore = configureStore({});
const {[NameSpace.GENRE]: {genre}, [NameSpace.FILMS]: {films}} = testStoreWithAuth;
it(`Catalog should render correctly`, () => {
  const history = createMemoryHistory();
  const renderButton = true;
  const loadFilms = jest.fn();

  render(
      <Provider store={mockStore(testStoreWithAuth)}>
        <Router history={history}>
          <Catalog
            genre={genre}
            films={films}
            renderButton={renderButton}
            loadFilms={loadFilms}
          />
        </Router>
      </Provider>
  );

  expect(screen.getByText(/Catalog/i)).toBeInTheDocument();
});
