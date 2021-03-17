import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../services/api';
import {activeForm, loadComments, postComment, redirectToRoute} from '../action';
import {addComment, fetchComments} from '../api-actions';
import {comment} from './comment';

const api = createAPI(() => {});

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

describe(`Async operation work correctly`, () => {
  it(`Should make a correct API call to GET /comments`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const filmID = 1;
    const loadCommentsFromServer = fetchComments(filmID);

    apiMock
      .onGet(`/comments/${filmID}`)
      .reply(200, [{fake: true}]);

    return loadCommentsFromServer(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, loadComments([{fake: true}], filmID));
      });
  });

  it(`Should make a correct API call to POST /comments`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const filmID = 1;
    const fakeComment = {
      rating: 8,
      text: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`
    };
    const postCommentToServer = addComment(filmID, fakeComment);

    apiMock
      .onPost(`/comments/${filmID}`)
      .reply(200, [{fake: true}]);

    return postCommentToServer(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, postComment([{fake: true}], filmID));
        expect(dispatch).toHaveBeenNthCalledWith(2, redirectToRoute(`/films/${filmID}`));
      });
  });
});
