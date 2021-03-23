import React from 'react';
import {render} from '@testing-library/react';
import dayjs from 'dayjs';
import MovieReview from './movie-review';
import {testComment} from '../../test-mock';

const {rating, user: {name}, comment, date} = testComment;

it(`MovieReview should render correctly`, () => {
  const {getByText} = render(
      <MovieReview
        review={testComment}
      />
  );

  const revieTextElement = getByText(comment);
  const reviewAuthorElement = getByText(name);
  const reviewDateElement = getByText(dayjs(date).format(`MMMM D, YYYY`));
  const reviewRatingElement = getByText(rating);

  expect(revieTextElement).toBeInTheDocument();
  expect(reviewAuthorElement).toBeInTheDocument();
  expect(reviewDateElement).toBeInTheDocument();
  expect(reviewRatingElement).toBeInTheDocument();
});
