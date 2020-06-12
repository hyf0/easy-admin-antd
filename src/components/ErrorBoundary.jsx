import React from 'react';
import PropTypes from 'prop-types';

import { Result, Button, Typography } from 'antd';
import { Link } from 'react-router-dom';

const { Paragraph } = Typography;

export default class ErrorBoundary extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorText: '' };
    this.clearError = this.clearError.bind(this);
  }

  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染可以显降级 UI
    return { hasError: true, errorText: JSON.stringify(error) };
  }

  clearError () {
    this.setState({
      hasError: false,
      errorText: '',
    });
  }

  render() {
    const { hasError, errorText } = this.state;
    const { children } = this.props;
    if (hasError) {
      // 你可以渲染任何自定义的降级  UI
      return (
        <Result
          status="error"
          title="页面出现错误"
          subTitle="组件渲染时出现的错误"
          extra={
            <Link to="/">
              <Button onClick={this.clearError} type="primary">忽略错误，返回首页</Button>
            </Link>
          }
        >
          <div className="desc">
            <Paragraph>{errorText}</Paragraph>
          </div>
        </Result>
      );
    }

    return children;
  }
}

ErrorBoundary.defaultProps = {
  children: null,
};

ErrorBoundary.propTypes = {
  children: PropTypes.element,
};
