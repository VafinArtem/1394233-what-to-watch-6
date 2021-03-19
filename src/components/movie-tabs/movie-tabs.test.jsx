import React from 'react';
import {render} from '@testing-library/react';
import MovieTabs from './movie-tabs';
import {testFilm} from '../../test-mock';

it(`MovieTabs should render correctly`, () => {
  const {getByText} = render(
      <MovieTabs
        film={testFilm}
      />
  );

  const overwievTabElement = getByText(`Overview`);
  const detailsTabElement = getByText(`Details`);
  const reviewsTabElement = getByText(`Reviews`);

  expect(overwievTabElement).toBeInTheDocument();
  expect(detailsTabElement).toBeInTheDocument();
  expect(reviewsTabElement).toBeInTheDocument();
});
