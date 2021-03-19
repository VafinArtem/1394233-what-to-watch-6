import React from 'react';
import {render} from '@testing-library/react';
import RatingStar from './rating-star';

const rating = 5;
const setUserReviewRating = jest.fn();

it(`RatingStar should render correctly`, () => {
  const {getByText} = render(
      <RatingStar
        rating={rating}
        setUserReviewRating={setUserReviewRating}
      />
  );

  const labelRatingElement = getByText(`Rating ${rating}`);

  expect(labelRatingElement).toBeInTheDocument();
});
