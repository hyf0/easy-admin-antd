import React from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';

export default function LoadingSpain({ fullScreen }) {
  let restStyle;
  if (fullScreen) {
    restStyle = {
      height: '100vh',
      width: '100vw',
    };
  } else {
    restStyle = {
      height: '100%',
      width: '100%',
    };
  }

  return (
    <div
      className="loading-spain"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...restStyle,
      }}
    >
      <Spin size="large" />
    </div>
  );
}

LoadingSpain.defaultProps = {
  fullScreen: false,
};

LoadingSpain.propTypes = {
  fullScreen: PropTypes.bool,
};
