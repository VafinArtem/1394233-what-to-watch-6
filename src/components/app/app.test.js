import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {App} from './app';
import {testFilm, testStoreWithAuth, testStoreWithoutAuth} from '../../test-mock';
import {AuthorizationStatus, ApiRoute, Url} from '../../consts';
import {NameSpace} from '../../store/main-reducer';

const mockStore = configureStore({});
const {[NameSpace.FILMS]: {films, loadedFilm}} = testStoreWithAuth;
const loadFilm = jest.fn();


describe(`Test routing`, () => {
  it(`Render 'Main' when user navigate to '/' url`, () => {
    const history = createMemoryHistory();
    const authorizationStatus = AuthorizationStatus.AUTH;
    render(
        <Provider store={mockStore(testStoreWithAuth)}>
          <Router history={history}>
            <App
              films={films}
              loadedFilm={loadedFilm}
              loadFilm={loadFilm}
              authorizationStatus={authorizationStatus}
            />
          </Router>
        </Provider>
    );

    expect(screen.getByTestId(`mainContent`)).toBeInTheDocument();
  });

  it(`Render 'SignInScreen' when user navigate to '/login' url`, () => {
    const history = createMemoryHistory();
    history.push(Url.SIGN_IN);
    const authorizationStatus = AuthorizationStatus.NO_AUTH;
    render(
        <Provider store={mockStore(testStoreWithoutAuth)}>
          <Router history={history}>
            <App
              films={films}
              loadedFilm={loadedFilm}
              loadFilm={loadFilm}
              authorizationStatus={authorizationStatus}
            />
          </Router>
        </Provider>
    );

    expect(screen.getByText(/© 2019 What to watch Ltd./i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  it(`Render 'MyList' when user navigate to '/mylist' url`, () => {
    const history = createMemoryHistory();
    history.push(Url.MY_LIST);
    const authorizationStatus = AuthorizationStatus.AUTH;
    render(
        <Provider store={mockStore(testStoreWithAuth)}>
          <Router history={history}>
            <App
              films={films}
              loadedFilm={loadedFilm}
              loadFilm={loadFilm}
              authorizationStatus={authorizationStatus}
            />
          </Router>
        </Provider>
    );

    expect(screen.getByText(/© 2019 What to watch Ltd./i)).toBeInTheDocument();
    expect(screen.getByText(/My list/i)).toBeInTheDocument();
    expect(screen.getByText(/Catalog/i)).toBeInTheDocument();
  });

  it(`Render 'Movie' when user navigate to '/films/:id' url`, () => {
    const history = createMemoryHistory();
    history.push(`${ApiRoute.FILMS}/${testFilm.id}`);
    const authorizationStatus = AuthorizationStatus.AUTH;
    render(
        <Provider store={mockStore(testStoreWithAuth)}>
          <Router history={history}>
            <App
              films={films}
              loadedFilm={loadedFilm}
              loadFilm={loadFilm}
              authorizationStatus={authorizationStatus}
            />
          </Router>
        </Provider>
    );

    expect(screen.getByText(testFilm.name)).toBeInTheDocument();
    expect(screen.getByText(testFilm.genre)).toBeInTheDocument();
    expect(screen.getByText(testFilm.released)).toBeInTheDocument();
    expect(screen.getByText(/WTW/i)).toBeInTheDocument();
    expect(screen.getByText(/Play/i)).toBeInTheDocument();
    expect(screen.getByText(/Add review/i)).toBeInTheDocument();
    expect(screen.getByText(/More like this/i)).toBeInTheDocument();
    expect(screen.getByText(/© 2019 What to watch Ltd./i)).toBeInTheDocument();
  });

  it(`Render 'AddReview' when user navigate to '/films/:id/review' url`, () => {
    const history = createMemoryHistory();
    history.push(`${ApiRoute.FILMS}/${testFilm.id}/review`);
    const authorizationStatus = AuthorizationStatus.AUTH;
    render(
        <Provider store={mockStore(testStoreWithAuth)}>
          <Router history={history}>
            <App
              films={films}
              loadedFilm={loadedFilm}
              loadFilm={loadFilm}
              authorizationStatus={authorizationStatus}
            />
          </Router>
        </Provider>
    );

    expect(screen.getByText(/Add review/i)).toBeInTheDocument();
    expect(screen.getByText(testFilm.name)).toBeInTheDocument();
  });

  it(`Render 'Player' when user navigate to '/player/:id' url`, () => {
    window.HTMLMediaElement.prototype.play = () => {};
    window.HTMLMediaElement.prototype.pause = () => {};
    const history = createMemoryHistory();
    history.push(`/player/${testFilm.id}`);
    const authorizationStatus = AuthorizationStatus.AUTH;
    render(
        <Provider store={mockStore(testStoreWithAuth)}>
          <Router history={history}>
            <App
              films={films}
              loadedFilm={loadedFilm}
              loadFilm={loadFilm}
              authorizationStatus={authorizationStatus}
            />
          </Router>
        </Provider>
    );

    expect(screen.getByText(/Full screen/i)).toBeInTheDocument();
    expect(screen.getByText(/Play/i)).toBeInTheDocument();
    expect(screen.getByText(/Exit/i)).toBeInTheDocument();
    expect(screen.getByText(testFilm.name)).toBeInTheDocument();
  });

  it(`Render 'NotFoundPage' when user navigate to '/404' url`, () => {
    const history = createMemoryHistory();
    history.push(Url.NOT_FOUND);
    const authorizationStatus = AuthorizationStatus.AUTH;
    render(
        <Provider store={mockStore(testStoreWithAuth)}>
          <Router history={history}>
            <App
              films={films}
              loadedFilm={loadedFilm}
              loadFilm={loadFilm}
              authorizationStatus={authorizationStatus}
            />
          </Router>
        </Provider>
    );

    expect(screen.getByText(/404 Not Found/i)).toBeInTheDocument();
    expect(screen.getByText(/Вернуться на главную/i)).toBeInTheDocument();
    expect(screen.getByText(/© 2019 What to watch Ltd./i)).toBeInTheDocument();
  });

  it(`Render 'NotFoundPage' when user navigate to '/unknowLink' url`, () => {
    const history = createMemoryHistory();
    history.push(`/unknowLink`);
    const authorizationStatus = AuthorizationStatus.AUTH;
    render(
        <Provider store={mockStore(testStoreWithAuth)}>
          <Router history={history}>
            <App
              films={films}
              loadedFilm={loadedFilm}
              loadFilm={loadFilm}
              authorizationStatus={authorizationStatus}
            />
          </Router>
        </Provider>
    );

    expect(screen.getByText(/404 Not Found/i)).toBeInTheDocument();
    expect(screen.getByText(/Вернуться на главную/i)).toBeInTheDocument();
    expect(screen.getByText(/© 2019 What to watch Ltd./i)).toBeInTheDocument();
  });
});
