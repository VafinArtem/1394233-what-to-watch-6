import React from 'react';
import {render, screen} from '@testing-library/react';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import GenresList from './genres-list';
import {NameSpace} from '../../store/main-reducer';
import {testFilm} from '../../test-mock';

const mockStore = configureStore({});
const {genre} = testFilm;

it(`GenresList should render correctly`, () => {
  render(
      <Provider store={mockStore({
        [NameSpace.GENRE]: {
          genre,
          genres: []
        },
        [NameSpace.FILMS]: {
          films: [testFilm]
        }
      })}>
        <GenresList />
      </Provider>
  );

  expect(screen.getByTestId(`genreList`)).toBeInTheDocument();
});
