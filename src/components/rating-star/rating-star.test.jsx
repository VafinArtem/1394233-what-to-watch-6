import React from 'react';
import {render, screen} from '@testing-library/react';
import RatingStar from './rating-star';
import userEvent from '@testing-library/user-event';

describe(`Test RatingStar`, () => {
  it(`RatingStar should render correctly`, () => {
    const rating = 5;
    const setUserReviewRating = jest.fn();

    render(
        <RatingStar
          rating={rating}
          setUserReviewRating={setUserReviewRating}
        />
    );

    expect(screen.getByText(`Rating ${rating}`)).toBeInTheDocument();
  });

  it(`When a user clicks on a star, the rating changes`, () => {
    const rating = 5;
    let ratingStatus;
    const setUserReviewRating = jest.fn();
    setUserReviewRating.mockImplementation(
        () => (ratingStatus = rating)
    );

    render(
        <RatingStar
          rating={rating}
          setUserReviewRating={setUserReviewRating}
        />
    );

    userEvent.click(screen.getByLabelText(`Rating ${rating}`));
    expect(ratingStatus).toBe(rating);
  });
});
