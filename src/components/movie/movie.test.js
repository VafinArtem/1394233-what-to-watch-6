import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router, Switch, Route} from 'react-router-dom';
import configureStore from 'redux-mock-store';
import userEvent from '@testing-library/user-event';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {ApiRoute, Url} from '../../consts';
import {testFilm, testStoreWithAuth} from '../../test-mock';
import {Movie} from './movie';
import {NameSpace} from '../../store/main-reducer';

const mockStore = configureStore({});
const {id, name, genre, released} = testFilm;
const onPlayMovie = jest.fn();
const {[NameSpace.FILMS]: {films}, [NameSpace.AUTH]: {authorizationStatus}} = testStoreWithAuth;

describe(`Test Movie`, () => {
  it(`Movie should render correctly`, () => {
    const history = createMemoryHistory();
    history.push(`${Route.FILMS}/${id}`);

    render(
        <Provider store={mockStore(testStoreWithAuth)}>
          <Router history={history}>
            <Movie
              film={testFilm}
              onPlayMovie={onPlayMovie}
              films={films}
              authorizationStatus={authorizationStatus}
            />
          </Router>
        </Provider>
    );

    expect(screen.getAllByText(name)).toBeInstanceOf(Array);
    expect(screen.getByText(genre)).toBeInTheDocument();
    expect(screen.getByText(released)).toBeInTheDocument();
    expect(screen.getByText(/WTW/i)).toBeInTheDocument();
    expect(screen.getByText(/Play/i)).toBeInTheDocument();
    expect(screen.getByText(/Add review/i)).toBeInTheDocument();
    expect(screen.getByText(/More like this/i)).toBeInTheDocument();
    expect(screen.getByText(/© 2019 What to watch Ltd./i)).toBeInTheDocument();
  });

  it(`When a user clicks on logo should be redirect`, () => {
    const history = createMemoryHistory();
    history.push(`${ApiRoute.FILMS}/${id}`);

    const {container} = render(
        <Provider store={mockStore(testStoreWithAuth)}>
          <Router history={history}>
            <Switch>
              <Route exact path={`${ApiRoute.FILMS}/${id}`}>
                <Movie
                  film={testFilm}
                  onPlayMovie={onPlayMovie}
                  films={films}
                  authorizationStatus={authorizationStatus}
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

  it(`When a user clicks on 'Add review' should be redirect`, () => {
    const history = createMemoryHistory();
    history.push(`${ApiRoute.FILMS}/${id}`);

    const {container} = render(
        <Provider store={mockStore(testStoreWithAuth)}>
          <Router history={history}>
            <Switch>
              <Route exact path={`${ApiRoute.FILMS}/${id}`}>
                <Movie
                  film={testFilm}
                  onPlayMovie={onPlayMovie}
                  films={films}
                  authorizationStatus={authorizationStatus}
                />
              </Route>
              <Route exact path={`/films/${id}/review`}>
                <h1>Route to add review</h1>
              </Route>
            </Switch>
          </Router>
        </Provider>
    );

    const linkToAddReview = container.querySelector(`.movie-card__add-review`);

    userEvent.click(linkToAddReview);
    expect(screen.getByText(/Route to add review/i));
  });
});
