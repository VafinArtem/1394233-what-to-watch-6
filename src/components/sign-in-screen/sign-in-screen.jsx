import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {login} from '../../store/api-actions';
import {AuthorizationStatuses, Url} from '../../consts';
import ErrorMessage from '../error-message/error-message';
import {getAuthorizationStatus, getFailedAuthorizationStatus} from '../../store/auth/selectors';

const SignInScreen = ({onSubmit, isAuthorisationFailed, authorizationStatus}) => {
  const loginRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onSubmit({
      login: loginRef.current.value,
      password: passwordRef.current.value,
    });
  };

  return (
    <React.Fragment>
      {authorizationStatus === AuthorizationStatuses.AUTH ? <Redirect to={Url.MAIN} /> : <div className="user-page">
        <header className="page-header user-page__head">
          <div className="logo">
            <Link to={Url.MAIN} className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>
          <h1 className="page-title user-page__title">Sign in</h1>
        </header>
        <div className="sign-in user-page__content">
          <form action="#" className="sign-in__form" onSubmit={handleSubmit}>
            {isAuthorisationFailed ? <ErrorMessage /> : ``}
            <div className="sign-in__fields">
              <div className="sign-in__field">
                <input
                  ref={loginRef}
                  className="sign-in__input"
                  type="email"
                  placeholder="Email address"
                  name="user-email"
                  id="user-email"
                  data-testid="login"
                />
                <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
              </div>
              <div className="sign-in__field">
                <input
                  ref={passwordRef}
                  className="sign-in__input"
                  type="password"
                  placeholder="Password"
                  name="user-password"
                  id="user-password"
                  data-testid="password"
                />
                <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
              </div>
            </div>
            <div className="sign-in__submit">
              <button className="sign-in__btn" type="submit">Sign in</button>
            </div>
          </form>
        </div>
        <footer className="page-footer">
          <div className="logo">
            <Link to={Url.MAIN} className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>
          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>}
    </React.Fragment>
  );
};


SignInScreen.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isAuthorisationFailed: PropTypes.bool.isRequired,
  authorizationStatus: PropTypes.string.isRequired
};

const mapDispatchToProps = (dispatch) => ({
  onSubmit(authData) {
    dispatch(login(authData));
  }
});

const mapStateToProps = (state) => ({
  isAuthorisationFailed: getFailedAuthorizationStatus(state),
  authorizationStatus: getAuthorizationStatus(state)
});

export {SignInScreen};
export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen);
