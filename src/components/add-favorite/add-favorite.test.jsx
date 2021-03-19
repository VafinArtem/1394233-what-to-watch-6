import React from 'react';
import {render, screen} from '@testing-library/react';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {AddFavorite} from './add-favorite';

const mockStore = configureStore({});

const id = 1;
const isFavorite = true;
const addFavoriteFilm = jest.fn();

it(`AddFavorite should render correctly`, () => {
  render(
      <Provider store={mockStore({})}>
        <AddFavorite
          id={id}
          isFavorite={isFavorite}
          addFavoriteFilm={addFavoriteFilm}
        />
      </Provider>
  );

  expect(screen.getByText(/My list/i)).toBeInTheDocument();
});
