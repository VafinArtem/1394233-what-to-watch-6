import {createReducer} from '@reduxjs/toolkit';
import {ActionType} from '../action';

const ErrorMessage = {
  NOT_ERROR: null,
  ERROR: `При отправке комментария произошла ошибка, попробуйте позже`
};

const initialState = {
  reviews: {},
  isActiveAddCommentForm: false,
  error: ErrorMessage.NOT_ERROR
};

const comment = createReducer(initialState, (builder) => {
  builder.addCase(ActionType.POST_COMMENT, (state, action) => {
    state.isActiveAddCommentForm = true;
    state.reviews = Object.assign(
        {},
        state.reviews,
        action.payload
    );
  });
  builder.addCase(ActionType.ACTIVE_FORM, (state, action) => {
    state.isActiveAddCommentForm = action.payload;
  });
  builder.addCase(ActionType.POST_COMMENT_FAILED, (state) => {
    state.error = ErrorMessage.ERROR;
    state.isActiveAddCommentForm = true;
  });
  builder.addCase(ActionType.RESET_ERROR_MESSAGE, (state) => {
    state.error = ErrorMessage.NOT_ERROR;
  });
  builder.addCase(ActionType.LOAD_COMMENTS, (state, action) => {
    state.reviews = Object.assign(
        {},
        state.reviews,
        action.payload
    );
  });
});

export {comment};
