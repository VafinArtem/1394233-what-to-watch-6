import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router, Switch, Route} from 'react-router-dom';
import configureStore from 'redux-mock-store';
import userEvent from '@testing-library/user-event';
import {Provider} from 'react-redux';
import {createMemoryHistory} from 'history';
import {Url} from '../../consts';
import {testStoreWithAuth} from '../../test-mock';
import {MyList} from './my-list';
import {NameSpace} from '../../store/main-reducer';

const mockStore = configureStore({});
const {[NameSpace.FILMS]: {favoriteFilms}} = testStoreWithAuth;

describe(`Test MyList`, () => {
  it(`MyList should render correctly`, () => {
    const history = createMemoryHistory();
    history.push(Url.MY_LIST);
    const loadFavoriteFilms = jest.fn();

    render(
        <Provider store={mockStore(testStoreWithAuth)}>
          <Router history={history}>
            <MyList
              favoriteFilms={favoriteFilms}
              loadFavoriteFilms={loadFavoriteFilms}
            />
          </Router>
        </Provider>
    );

    expect(screen.getByText(/My list/i)).toBeInTheDocument();
    expect(screen.getByText(/Catalog/i)).toBeInTheDocument();
    expect(screen.getByText(/© 2019 What to watch Ltd./i)).toBeInTheDocument();
  });

  it(`When a user clicks on logo should be redirect`, () => {
    const history = createMemoryHistory();
    history.push(Url.MY_LIST);
    const loadFavoriteFilms = jest.fn();

    const {container} = render(
        <Provider store={mockStore(testStoreWithAuth)}>
          <Router history={history}>
            <Switch>
              <Route exact path={Url.MY_LIST}>
                <MyList
                  favoriteFilms={favoriteFilms}
                  loadFavoriteFilms={loadFavoriteFilms}
                />
              </Route>
              <Route exact path={Url.MAIN}>
                <h1>Route to main page</h1>
              </Route>
            </Switch>
          </Router>
        </Provider>
    );

    const linkToMain = container.querySelector(`.logo__link`);

    userEvent.click(linkToMain);
    expect(screen.getByText(/Route to main page/i));
  });
});
