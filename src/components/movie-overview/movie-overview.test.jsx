import React from 'react';
import {render} from '@testing-library/react';
import MovieOverview from './movie-overview';
import {testFilm} from '../../test-mock';

const {rating, scoresCount, description, director, starring} = testFilm;

it(`MovieOverview should render correctly`, () => {
  const {getByText} = render(
      <MovieOverview
        rating={rating}
        scoresCount={scoresCount}
        description={description}
        director={director}
        starring={starring}
      />
  );

  const ratingElement = getByText(rating);
  const scoresCountElement = getByText(`${scoresCount} ratings`);
  const directorElement = getByText(`Director: ${director}`);
  const starringElement = getByText(`Starring: ${starring.join(`, `)} and other`);

  expect(ratingElement).toBeInTheDocument();
  expect(scoresCountElement).toBeInTheDocument();
  expect(directorElement).toBeInTheDocument();
  expect(starringElement).toBeInTheDocument();
});
