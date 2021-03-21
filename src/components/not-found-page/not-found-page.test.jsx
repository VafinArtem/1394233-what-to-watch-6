import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router, Switch, Route} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import userEvent from '@testing-library/user-event';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {Url} from '../../consts';
import NotFoundPage from './not-found-page';
import {testStoreWithAuth} from '../../test-mock';


const mockStore = configureStore({});

describe(`Test NotFoundPage`, () => {
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

  it(`When a user clicks on logo should be redirect`, () => {
    const history = createMemoryHistory();
    history.push(Url.NOT_FOUND);

    const {container} = render(
        <Provider store={mockStore(testStoreWithAuth)}>
          <Router history={history}>
            <Switch>
              <Route exact path={Url.NOT_FOUND}>
                <NotFoundPage />
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

  it(`When a user clicks on 'Вернуться на главную' should be redirect`, () => {
    const history = createMemoryHistory();
    history.push(Url.NOT_FOUND);

    const {container} = render(
        <Provider store={mockStore(testStoreWithAuth)}>
          <Router history={history}>
            <Switch>
              <Route exact path={Url.NOT_FOUND}>
                <NotFoundPage />
              </Route>
              <Route exact path={Url.MAIN}>
                <h1>Route to main page</h1>
              </Route>
            </Switch>
          </Router>
        </Provider>
    );

    const linkToMain = container.querySelector(`.catalog__genres-link`);

    userEvent.click(linkToMain);
    expect(screen.getByText(/Route to main page/i));
  });
});
