import React from 'react';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import MovieTabs from './movie-tabs';
import {testComment, testFilm, testStoreWithAuth} from '../../test-mock';
import userEvent from '@testing-library/user-event';

const mockStore = configureStore({});
describe(`Test MovieTabs`, () => {
  it(`MovieTabs should render correctly`, () => {
    render(
        <MovieTabs
          film={testFilm}
        />
    );

    expect(screen.getByText(/Overview/i)).toBeInTheDocument();
    expect(screen.getByText(/Details/i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
  });

  it(`When the user clicks on a tab, the active tab changes`, () => {
    render(
        <Provider store={mockStore(testStoreWithAuth)}>
          <MovieTabs
            film={testFilm}
          />
        </Provider>
    );

    userEvent.click(screen.getByText(/Overview/i));
    expect(screen.getByText(testFilm.rating)).toBeInTheDocument();

    userEvent.click(screen.getByText(/Details/i));
    expect(screen.getByText(testFilm.genre)).toBeInTheDocument();

    userEvent.click(screen.getByText(/Reviews/i));
    expect(screen.getByText(testComment.comment)).toBeInTheDocument();
  });

});
