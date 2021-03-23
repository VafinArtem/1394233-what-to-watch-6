import React from 'react';
import PropTypes from 'prop-types';
import NoLogin from '../no-login/no-login';
import UserAvatar from '../user-avatar/user-avatar';
import {connect} from 'react-redux';
import {AuthorizationStatus} from '../../consts';
import {getAuthorizationStatus} from '../../store/auth/selectors';

const UserBlock = ({authorizationStatus}) => {
  return (
    <div className="user-block">
      {authorizationStatus === AuthorizationStatus.AUTH ? <UserAvatar /> : <NoLogin />}
    </div>
  );
};

UserBlock.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

export {UserBlock};
export default connect(mapStateToProps)(UserBlock);
