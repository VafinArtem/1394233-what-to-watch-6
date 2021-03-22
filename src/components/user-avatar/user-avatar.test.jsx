import React from 'react';
import {render, screen} from '@testing-library/react';
import configureStore from 'redux-mock-store';
import {Router, Switch, Route} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import userEvent from '@testing-library/user-event';
import {UserAvatar} from './user-avatar';
import {Url} from '../../consts';

const mockStore = configureStore({});
const userAvatar = `string`;

describe(`Test UserAvatar`, () => {
  it(`UserAvatar should render correctly`, () => {
    const userLogout = jest.fn();

    render(
        <Provider store={mockStore({})}>
          <UserAvatar
            userLogout={userLogout}
            avatar={userAvatar}
          />
        </Provider>
    );

    expect(screen.getByText(/Log Out/i)).toBeInTheDocument();
  });

  it(`When a user clicks on avatar should be redirect`, () => {
    const history = createMemoryHistory();
    history.push(`/avatar`);
    const userLogout = jest.fn();

    const {container} = render(
        <Provider store={mockStore({})}>
          <Router history={history}>
            <Switch>
              <Route exact path={`/avatar`}>
                <UserAvatar
                  userLogout={userLogout}
                  avatar={userAvatar}
                />
              </Route>
              <Route exact path={Url.MY_LIST}>
                <h1>Route to my list</h1>
              </Route>
            </Switch>
          </Router>
        </Provider>
    );

    const linkToMyList = container.querySelector(`.user-block__avatar`);

    userEvent.click(linkToMyList);
    expect(screen.getByText(/Route to my list/i));
  });

  it(`When a user clicks on 'Log Out' should be redirect`, () => {
    const history = createMemoryHistory();
    history.push(`/avatar`);
    const userLogout = jest.fn();
    userLogout.mockImplementation(
        () => (history.push(Url.MAIN))
    );

    const {container} = render(
        <Provider store={mockStore({})}>
          <Router history={history}>
            <Switch>
              <Route exact path={`/avatar`}>
                <UserAvatar
                  userLogout={userLogout}
                  avatar={userAvatar}
                />
              </Route>
              <Route exact path={Url.MAIN}>
                <h1>Route to main</h1>
              </Route>
            </Switch>
          </Router>
        </Provider>
    );

    const linkToMain = container.querySelector(`.user-block__link`);

    userEvent.click(linkToMain);
    expect(screen.getByText(/Route to main/i));
  });
});
