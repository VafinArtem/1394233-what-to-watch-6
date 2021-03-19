import React from 'react';
import {render} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import NoLogin from './no-login';

it(`NoLogin should render correctly`, () => {
  const history = createMemoryHistory();

  const {getByText} = render(
      <Router history={history}>
        <NoLogin />
      </Router>
  );

  const signInTextElement = getByText(`Sign in`);

  expect(signInTextElement).toBeInTheDocument();
});
