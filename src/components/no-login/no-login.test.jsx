import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router, Switch, Route} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import userEvent from '@testing-library/user-event';
import NoLogin from './no-login';
import {Url} from '../../consts';

describe(`Test NoLogin`, () => {
  it(`NoLogin should render correctly`, () => {
    const history = createMemoryHistory();

    render(
        <Router history={history}>
          <NoLogin />
        </Router>
    );

    expect(screen.getByText(`Sign in`)).toBeInTheDocument();
  });

  it(`When a user clicks on 'Sign in' should be redirect`, () => {
    const history = createMemoryHistory();
    history.push(`/noLogin`);

    const {container} = render(
        <Router history={history}>
          <NoLogin />
          <Switch>
            <Route exact path={`/noLogin`}>
              <NoLogin />
            </Route>
            <Route exact path={Url.SIGN_IN}>
              <h1>Route to sign in</h1>
            </Route>
          </Switch>
        </Router>
    );

    const linkToSignIn = container.querySelector(`.user-block__link`);

    userEvent.click(linkToSignIn);
    expect(screen.getByText(/Route to sign in/i));
  });
});
