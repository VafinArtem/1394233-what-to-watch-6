import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {AddFavorite} from './add-favorite';

const mockStore = configureStore({});

let id = null;
let isFavorite = null;

describe(`Test AddFavorite`, () => {
  beforeAll(() => {
    id = 1;
    isFavorite = true;
  });

  it(`AddFavorite should render correctly`, () => {
    const addFavoriteFilm = jest.fn();

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

  it(`When user click 'Add my list' should be change IsFavorite status`, () => {
    const addFavoriteClikHandle = jest.fn();
    addFavoriteClikHandle.mockImplementation(
        () => (isFavorite = false)
    );

    render(
        <Provider store={mockStore({})}>
          <AddFavorite
            id={id}
            isFavorite={isFavorite}
            addFavoriteFilm={addFavoriteClikHandle}
          />
        </Provider>
    );

    userEvent.click(screen.getByRole(`button`));
    expect(addFavoriteClikHandle).toBeCalled();
    expect(isFavorite).toBe(false);
  });

});
