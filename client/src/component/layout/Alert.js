import React from 'react';
import PropTypes from 'prop-types';

const Alert = ({ msg = 'Error' }) => {
  return msg.length > 1 ? (
    <div className='notification is-danger is-light'>{msg}</div>
  ) : null;
};

Alert.prototype = {
  msg: PropTypes.string.isRequired,
};

export default Alert;
