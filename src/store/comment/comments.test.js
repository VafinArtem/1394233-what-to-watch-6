import {activeForm, loadComments, postComment} from '../action';
import {comment} from './comment';

describe(`Reducers work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    const initialState = {
      reviews: {},
      isActiveAddCommentForm: false,
    };

    expect(comment(undefined, {})).toEqual(initialState);
  });

  it(`Reducer adds a comment object to the state's reviews object`, () => {
    const state = {
      reviews: {},
      isActiveAddCommentForm: false,
    };

    const id = 1;
    const postedComments = [
      {
        id: 1,
        user: {
          id: 1,
          name: ``
        },
        rating: 1,
        comment: ``,
        date: ``
      },
      {
        id: 1,
        user: {
          id: 1,
          name: ``
        },
        rating: 1,
        comment: ``,
        date: ``
      }
    ];

    const validState = {
      reviews: {
        1: [
          {
            id: 1,
            user: {
              id: 1,
              name: ``
            },
            rating: 1,
            comment: ``,
            date: ``
          },
          {
            id: 1,
            user: {
              id: 1,
              name: ``
            },
            rating: 1,
            comment: ``,
            date: ``
          }
        ],
      },
      isActiveAddCommentForm: true,
    };

    expect(comment(state, postComment(postedComments, id))).toEqual(validState);
  });

  it(`Reducer adds a load comments object to the state's reviews object`, () => {
    const state = {
      reviews: {},
      isActiveAddCommentForm: false,
    };

    const id = 1;
    const newComment = [
      {
        id: 1,
        user: {
          id: 1,
          name: ``
        },
        rating: 1,
        comment: ``,
        date: ``
      }
    ];

    const validState = {
      reviews: {
        1: [
          {
            id: 1,
            user: {
              id: 1,
              name: ``
            },
            rating: 1,
            comment: ``,
            date: ``
          }
        ],
      },
      isActiveAddCommentForm: false,
    };

    expect(comment(state, loadComments(newComment, id))).toEqual(validState);
  });

  it(`Reducer adds a comment to existing comments in the state`, () => {
    const state = {
      reviews: {1: [
        {
          id: 1,
          user: {
            id: 1,
            name: ``
          },
          rating: 1,
          comment: ``,
          date: ``
        },
      ]},
      isActiveAddCommentForm: false,
    };

    const id = 1;
    const postedComments = [
      {
        id: 1,
        user: {
          id: 1,
          name: ``
        },
        rating: 1,
        comment: ``,
        date: ``
      },
      {
        id: 2,
        user: {
          id: 2,
          name: ``
        },
        rating: 2,
        comment: ``,
        date: ``
      }
    ];

    const validState = {
      reviews: {
        1: [
          {
            id: 1,
            user: {
              id: 1,
              name: ``
            },
            rating: 1,
            comment: ``,
            date: ``
          },
          {
            id: 2,
            user: {
              id: 2,
              name: ``
            },
            rating: 2,
            comment: ``,
            date: ``
          }
        ],
      },
      isActiveAddCommentForm: true,
    };

    expect(comment(state, postComment(postedComments, id))).toEqual(validState);
  });

  it(`Reducer changes form activation states to payload value`, () => {
    const state = {
      reviews: {},
      isActiveAddCommentForm: false,
    };
    const activeFormState = {
      reviews: {},
      isActiveAddCommentForm: true,
    };

    expect(comment(state, activeForm(true))).toEqual(activeFormState);

    const notActiveFormState = {
      reviews: {},
      isActiveAddCommentForm: false,
    };

    expect(comment(state, activeForm(false))).toEqual(notActiveFormState);
  });
});
