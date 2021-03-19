import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import App from './app';
import {testFilm, testStoreWithAuth, testStoreWithoutAuth} from '../../test-mock';
import {Routes, Url} from '../../consts';

const mockStore = configureStore({});

describe(`Test routing`, () => {
  it(`Render 'Main' when user navigate to '/' url`, () => {
    const history = createMemoryHistory();
    render(
        <Provider store={mockStore(testStoreWithAuth)}>
          <Router history={history}>
            <App />
          </Router>
        </Provider>
    );

    expect(screen.getByTestId(`mainContent`)).toBeInTheDocument();
  });

  it(`Render 'SignInScreen' when user navigate to '/login' url`, () => {
    const history = createMemoryHistory();
    history.push(Url.SIGN_IN);
    render(
        <Provider store={mockStore(testStoreWithoutAuth)}>
          <Router history={history}>
            <App />
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
    render(
        <Provider store={mockStore(testStoreWithAuth)}>
          <Router history={history}>
            <App />
          </Router>
        </Provider>
    );

    expect(screen.getByText(/© 2019 What to watch Ltd./i)).toBeInTheDocument();
    expect(screen.getByText(/My list/i)).toBeInTheDocument();
    expect(screen.getByText(/Catalog/i)).toBeInTheDocument();
  });

  it(`Render 'Movie' when user navigate to '/films/:id' url`, () => {
    const history = createMemoryHistory();
    history.push(`${Routes.FILMS}/${testFilm.id}`);
    render(
        <Provider store={mockStore(testStoreWithAuth)}>
          <Router history={history}>
            <App />
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
    history.push(`${Routes.FILMS}/${testFilm.id}/review`);
    render(
        <Provider store={mockStore(testStoreWithAuth)}>
          <Router history={history}>
            <App />
          </Router>
        </Provider>
    );

    expect(screen.getByText(/Add review/i)).toBeInTheDocument();
    expect(screen.getByText(testFilm.name)).toBeInTheDocument();
  });

  it(`Render 'Player' when user navigate to '/player/:id' url`, () => {
    const history = createMemoryHistory();
    history.push(`/player/${testFilm.id}`);
    render(
        <Provider store={mockStore(testStoreWithAuth)}>
          <Router history={history}>
            <App />
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
    render(
        <Provider store={mockStore(testStoreWithAuth)}>
          <Router history={history}>
            <App />
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
    render(
        <Provider store={mockStore(testStoreWithAuth)}>
          <Router history={history}>
            <App />
          </Router>
        </Provider>
    );

    expect(screen.getByText(/404 Not Found/i)).toBeInTheDocument();
    expect(screen.getByText(/Вернуться на главную/i)).toBeInTheDocument();
    expect(screen.getByText(/© 2019 What to watch Ltd./i)).toBeInTheDocument();
  });
});
