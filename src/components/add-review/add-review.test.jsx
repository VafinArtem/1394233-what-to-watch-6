import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router, Switch, Route} from 'react-router-dom';
import configureStore from 'redux-mock-store';
import userEvent from '@testing-library/user-event';
import {Provider} from 'react-redux';
import {createMemoryHistory} from 'history';
import {Url} from '../../consts';
import AddReview from './add-review';
import {testFilm, testStoreWithAuth} from '../../test-mock';

const mockStore = configureStore({});

const {name, posterImage, backgroundImage, id} = testFilm;

describe(`Test AddReview`, () => {
  it(`AddReview should render correctly`, () => {
    const history = createMemoryHistory();
    history.push(Url.ADD_REVIEW);

    render(
        <Provider store={mockStore(testStoreWithAuth)}>
          <Router history={history}>
            <AddReview
              title={name}
              poster={posterImage}
              backgroundImage={backgroundImage}
              filmID={id}
            />
          </Router>
        </Provider>
    );

    expect(screen.getByText(/Add review/i)).toBeInTheDocument();
    expect(screen.getByText(name)).toBeInTheDocument();
  });

  it(`When a user clicks on a movie title in breadcrumbs should be redirect`, () => {
    const history = createMemoryHistory();
    history.push(Url.ADD_REVIEW);

    const {container} = render(
        <Provider store={mockStore(testStoreWithAuth)}>
          <Router history={history}>
            <Switch>
              <Route exact path={Url.ADD_REVIEW}>
                <AddReview
                  title={name}
                  poster={posterImage}
                  backgroundImage={backgroundImage}
                  filmID={id}
                />
              </Route>
              <Route exact path={Url.MOVIE}>
                <h1>Route to film</h1>
              </Route>
            </Switch>
          </Router>
        </Provider>
    );

    const linkToFilm = container.querySelector(`.breadcrumbs__link`);

    userEvent.click(linkToFilm);
    expect(screen.getByText(/Route to film/i));
  });

  it(`When a user clicks on logo should be redirect`, () => {
    const history = createMemoryHistory();
    history.push(Url.ADD_REVIEW);

    const {container} = render(
        <Provider store={mockStore(testStoreWithAuth)}>
          <Router history={history}>
            <Switch>
              <Route exact path={Url.ADD_REVIEW}>
                <AddReview
                  title={name}
                  poster={posterImage}
                  backgroundImage={backgroundImage}
                  filmID={id}
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
