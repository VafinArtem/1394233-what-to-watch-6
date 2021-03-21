import React from 'react';
import {render, screen} from '@testing-library/react';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {UserAvatar} from './user-avatar';

const mockStore = configureStore({});

it(`UserAvatar should render correctly`, () => {
  const userLogout = jest.fn();

  render(
      <Provider store={mockStore({})}>
        <UserAvatar
          userLogout={userLogout}
        />
      </Provider>
  );

  expect(screen.getByText(/Log Out/i)).toBeInTheDocument();
});
