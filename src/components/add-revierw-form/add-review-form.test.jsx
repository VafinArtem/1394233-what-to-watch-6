import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {AddReviewForm} from './add-review-form';
import {testStoreWithAuth} from '../../test-mock';

let mockStore = null;

describe(`Test AddReviewForm`, () => {
  beforeAll(() => {
    mockStore = configureStore({});
  });

  it(`AddFavorite should render correctly`, () => {
    const submit = jest.fn();
    const activateForm = jest.fn();
    render(
        <Provider store={mockStore(testStoreWithAuth)}>
          <AddReviewForm
            filmID={1}
            submit={submit}
            activateForm={activateForm}
            isActiveForm={true}
          />
        </Provider>
    );

    expect(screen.getByText(/Post/i)).toBeInTheDocument();

    userEvent.type(screen.getByTestId(`reviewText`), `123456`);

    expect(screen.getByDisplayValue(/123456/i)).toBeInTheDocument();
  });

  it(`When user click 'Post' should be change review object and active form status`, () => {
    const submitClikHandler = jest.fn();
    const activateForm = jest.fn();
    let isActiveForm = true;

    const review = {
      text: ``,
      rating: 0
    };

    submitClikHandler.mockImplementation(
        () => {
          review.text = `test`;
          review.rating = 10;
        }
    );
    activateForm.mockImplementation(
        () => {
          isActiveForm = false;
        }
    );

    render(
        <Provider store={mockStore(testStoreWithAuth)}>
          <AddReviewForm
            filmID={1}
            submit={submitClikHandler}
            activateForm={activateForm}
            isActiveForm={isActiveForm}
          />
        </Provider>
    );

    userEvent.click(screen.getByRole(`button`));
    expect(review.text).toBe(`test`);
    expect(review.rating).toBe(10);
    expect(isActiveForm).toBe(false);
  });
});
