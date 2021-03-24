import React from 'react';
import {render} from '@testing-library/react';
import MovieDetails from './movie-details';
import {testFilm} from '../../test-mock';

const {runTime, genre, released, director, starring} = testFilm;
it(`MovieDetails should render correctly`, () => {
  const {getByText} = render(
      <MovieDetails
        duration={runTime}
        genre={genre}
        released={released}
        director={director}
        starring={starring}
      />
  );

  const directorLabelElement = getByText(`Director`);
  const directorNameElement = getByText(director);
  const starringLableElement = getByText(`Starring`);
  const runTimeLableElement = getByText(`Run Time`);
  const genreLableElement = getByText(`Genre`);
  const genreNameElement = getByText(genre);
  const releasedLableElement = getByText(`Released`);
  const releasedNameElement = getByText(released);


  expect(directorLabelElement).toBeInTheDocument();
  expect(directorNameElement).toBeInTheDocument();
  expect(starringLableElement).toBeInTheDocument();
  expect(runTimeLableElement).toBeInTheDocument();
  expect(genreLableElement).toBeInTheDocument();
  expect(genreNameElement).toBeInTheDocument();
  expect(releasedLableElement).toBeInTheDocument();
  expect(releasedNameElement).toBeInTheDocument();
});
