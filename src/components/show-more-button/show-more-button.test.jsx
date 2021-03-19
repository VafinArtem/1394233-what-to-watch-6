import React from 'react';
import {render, screen} from '@testing-library/react';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import ShowMoreButton from './show-more-button';

const mockStore = configureStore({});

it(`ShowMoreButton should render correctly`, () => {
  render(
      <Provider store={mockStore({})}>
        <ShowMoreButton />
      </Provider>
  );

  expect(screen.getByText(/Show more/i)).toBeInTheDocument();
});
