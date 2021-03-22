import React from 'react';
import PropTypes from 'prop-types';
import {Url} from '../../consts';
import {useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from '../../store/api-actions';
import {getUserAvatar} from '../../store/auth/selectors';

const UserAvatar = ({userLogout, avatar}) => {
  const history = useHistory();
  return (
    <React.Fragment>
      <a href="#" className="user-block__link" onClick={(evt) => {
        evt.preventDefault();
        userLogout();
      }}>Log Out</a>
      <div className="user-block__avatar" onClick={() => {
        history.push(Url.MY_LIST);
      }}>
        <img src={avatar} alt="User avatar" width={63} height={63} />
      </div>
    </React.Fragment>
  );
};

UserAvatar.propTypes = {
  userLogout: PropTypes.func.isRequired,
  avatar: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  avatar: getUserAvatar(state),
});

const mapDispatchToProps = (dispatch) => ({
  userLogout() {
    dispatch(logout());
  },
});

export {UserAvatar};
export default connect(mapStateToProps, mapDispatchToProps)(UserAvatar);
