import React from 'react';
import {Link} from 'react-router-dom';
import {Urls} from '../../consts';

const NoLogin = () => {
  return (
    <Link to={Urls.SIGN_IN} className="user-block__link">Sign in</Link>
  );
};

export default NoLogin;
