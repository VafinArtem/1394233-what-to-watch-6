import React from 'react';
import {render, screen} from '@testing-library/react';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {ErrorMessage} from './error-message';

const mockStore = configureStore({});
const testText = `test`;

it(`ErrorMessage should render correctly`, () => {

  render(
      <Provider store={mockStore({})}>
        <ErrorMessage
          errorMessage={testText}
        />
      </Provider>
  );

  expect(screen.getByText(testText)).toBeInTheDocument();
});
