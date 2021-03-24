import React from 'react';
import {render, screen} from '@testing-library/react';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {testStoreWithAuth} from '../../test-mock';
import {MovieReviews} from './movie-reviews';
import {NameSpace} from '../../store/main-reducer';

const mockStore = configureStore({});
const {[NameSpace.COMMENT]: {reviews}} = testStoreWithAuth;
it(`MovieReviews should render correctly`, () => {
  const loadComments = jest.fn();

  render(
      <Provider store={mockStore(testStoreWithAuth)}>
        <MovieReviews
          reviews={reviews}
          filmID={1}
          loadComments={loadComments}
        />
      </Provider>
  );

  expect(screen.getByTestId(`reviews`)).toBeInTheDocument();
});
