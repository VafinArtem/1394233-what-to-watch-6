import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import RatingStar from '../rating-star/rating-star';
import {addComment} from '../../store/api-actions';
import {activeForm, resetErrorMessage} from '../../store/action';
import {getActiveCommentFormStatus, getErrorMessage} from '../../store/comment/selectors';

const RATING_STARS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const DEFAULT_RATING = 10;

const CommentLength = {
  MIN: 50,
  MAX: 400
};

const showError = (errorMessage) => errorMessage !== null ? <p>{errorMessage}</p> : ``;

const AddReviewForm = ({filmID, submit, activateForm, isActiveForm, errorMessage, resetErrorCommentMessage}) => {
  const [userReviewText, setUserReviewText] = useState(``);
  const [userReviewRating, setUserReviewRating] = useState(DEFAULT_RATING);

  useEffect(() => {
    activateForm(userReviewText.length >= CommentLength.MIN && userReviewText.length <= CommentLength.MAX);
  }, [userReviewText]);

  useEffect(() => {
    if (errorMessage !== null) {
      setTimeout(resetErrorCommentMessage, 5000);
    }
  }, [errorMessage]);

  return (
    <React.Fragment>
      {showError(errorMessage)}
      <form action="#" className="add-review__form" onSubmit={(evt) => {
        evt.preventDefault();
        activateForm(false);
        submit(filmID, {
          text: userReviewText,
          rating: userReviewRating
        });
      }}>
        <div className="rating">
          <div className="rating__stars">
            {RATING_STARS.map((element) => <RatingStar
              key={element}
              rating={element}
              setUserReviewRating={setUserReviewRating}
            />)}
          </div>
        </div>
        <div className="add-review__text">
          <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text" defaultValue={``} onInput={(evt) => {
            setUserReviewText(evt.target.value);
          }} data-testid="reviewText" />
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit" disabled={isActiveForm ? `` : `disabled`}>Post</button>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};


AddReviewForm.propTypes = {
  submit: PropTypes.func.isRequired,
  activateForm: PropTypes.func.isRequired,
  isActiveForm: PropTypes.bool.isRequired,
  filmID: PropTypes.number.isRequired,
  errorMessage: PropTypes.string,
  resetErrorCommentMessage: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  submit(filmID, comment) {
    dispatch(addComment(filmID, comment));
  },
  activateForm(boolean) {
    dispatch(activeForm(boolean));
  },
  resetErrorCommentMessage() {
    dispatch(resetErrorMessage());
  }
});

const mapStateToProps = (state) => ({
  isActiveForm: getActiveCommentFormStatus(state),
  errorMessage: getErrorMessage(state)
});

export {AddReviewForm};
export default connect(mapStateToProps, mapDispatchToProps)(AddReviewForm);
