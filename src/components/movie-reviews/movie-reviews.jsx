import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {REVIEW_PROP} from '../../utils/validate';
import MovieReview from '../movie-review/movie-review';
import {fetchComments} from '../../store/api-actions';
import {connect} from 'react-redux';
import {getReviews} from '../../store/comment/selectors';
import LoadingScreen from '../loading-screen/loading-screen';

const MovieReviews = ({reviews, filmID, loadComments}) => {
  useEffect(() => {
    if (reviews[filmID] === undefined) {
      loadComments(filmID);
    }
  }, [reviews[filmID]]);

  return (
    <div className="movie-card__reviews movie-card__row">
      <div className="movie-card__reviews-col">
        {reviews[filmID] === undefined ? <LoadingScreen /> : reviews[filmID].map((review) => <MovieReview review={review} key={review.id} />)}
      </div>
    </div>
  );
};

MovieReviews.propTypes = {
  reviews: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.shape(REVIEW_PROP))),
  loadComments: PropTypes.func.isRequired,
  filmID: PropTypes.number.isRequired
};

const mapStateToProps = (state) => ({
  reviews: getReviews(state)
});

const mapDispatchToProps = (dispatch) => ({
  loadComments(id) {
    dispatch(fetchComments(id));
  },
});

export {MovieReviews};
export default connect(mapStateToProps, mapDispatchToProps)(MovieReviews);
