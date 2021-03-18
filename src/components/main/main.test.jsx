import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import configureStore from 'redux-mock-store';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {AuthorizationStatuses, Url} from '../../consts';
import Main from './main';
import {NameSpace} from '../../store/main-reducer';
import {testFilm} from '../../test-mock';

const mockStore = configureStore({});

it(`Main should render correctly`, () => {
  const history = createMemoryHistory();
  history.push(Url.MAIN);

  render(
      <Provider store={mockStore({
        [NameSpace.GENRE]: {
          genre: `Comedy`,
          genres: []
        },
        [NameSpace.FILMS]: {
          films: [testFilm],
          promoMovie: testFilm
        },
        [NameSpace.AUTH]: {
          authorizationStatus: AuthorizationStatuses.AUTH
        }
      })}>
        <Router history={history}>
          <Main />
        </Router>
      </Provider>
  );

  expect(screen.getByTestId(`mainContent`)).toBeInTheDocument();
});
