import React from 'react';
import {render, screen} from '@testing-library/react';
import configureStore from 'redux-mock-store';
import {Router, Switch, Route} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import userEvent from '@testing-library/user-event';
import {Provider} from 'react-redux';
import {testFilm, testStoreWithAuth} from '../../test-mock';
import {PromoMovie} from './promo-movie';

const mockStore = configureStore({});

const {name, genre, released} = testFilm;

describe(`Test PromoMovie`, () => {
  it(`PromoMovie should render correctly`, () => {
    const resetShowFilmsAmount = jest.fn();

    render(
        <Provider store={mockStore(testStoreWithAuth)}>
          <PromoMovie
            promoMovie={testFilm}
            resetShowFilmsAmount={resetShowFilmsAmount}
          />
        </Provider>
    );

    expect(screen.getByText(name)).toBeInTheDocument();
    expect(screen.getByText(genre)).toBeInTheDocument();
    expect(screen.getByText(released)).toBeInTheDocument();
    expect(screen.getByText(/Play/i)).toBeInTheDocument();
  });

  it(`When a user clicks on logo should be redirect`, () => {
    const history = createMemoryHistory();
    const resetShowFilmsAmount = jest.fn();
    history.push(`/promoMovie`);

    const {container} = render(
        <Provider store={mockStore(testStoreWithAuth)}>
          <Router history={history}>
            <Switch>
              <Route exact path={`/promoMovie`}>
                <PromoMovie
                  promoMovie={testFilm}
                  resetShowFilmsAmount={resetShowFilmsAmount}
                />
              </Route>
              <Route exact path={`/player/${testFilm.id}`}>
                <h1>Route to player</h1>
              </Route>
            </Switch>
          </Router>
        </Provider>
    );

    const linkToPlayer = container.querySelector(`.btn--play`);

    userEvent.click(linkToPlayer);
    expect(screen.getByText(/Route to player/i));
  });
});
