import React from 'react';
import {render} from '@testing-library/react';
import LoadingScreen from './loading-screen';

it(`LoadingScreen should render correctly`, () => {
  const {getByText} = render(
      <LoadingScreen />
  );

  const loadingTextElement = getByText(`Loading...`);

  expect(loadingTextElement).toBeInTheDocument();
});
