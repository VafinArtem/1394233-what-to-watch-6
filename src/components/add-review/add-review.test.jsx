import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {createMemoryHistory} from 'history';
import {AuthorizationStatuses, Url} from '../../consts';
import AddReview from './add-review';
import {testFilm} from '../../test-mock';
import {NameSpace} from '../../store/main-reducer';

const mockStore = configureStore({});

const {name, posterImage, backgroundImage, id} = testFilm;

it(`AddReview should render correctly`, () => {
  const history = createMemoryHistory();
  history.push(Url.ADD_REVIEW);

  render(
      <Provider store={mockStore({[NameSpace.COMMENT]: {
        isActiveAddCommentForm: true
      },
      [NameSpace.AUTH]: {
        authorizationStatus: AuthorizationStatuses.AUTH,
        errorMessage: ``
      }})}>
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
