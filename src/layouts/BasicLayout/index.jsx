import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Layout, Card } from 'antd';

import SiderContent from './components/SiderContent';
import HeaderContent from './components/HeaderContent';

// import ErrorBoundary from '@/components/ErrorBoundary';

import './index.scss';

const { Header, Sider, Content } = Layout;

export default function BasicLayout(props) {
  const { children } = props;
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleIsCollapsed = useCallback(() => {
    setIsCollapsed((prev) => !prev);
  }, [setIsCollapsed]);
  return (
    <Layout className="basic-layout">
      <Sider
        className="sider-menu-wrapper"
        collapsible
        collapsed={isCollapsed}
        onCollapse={toggleIsCollapsed}
      >
        <SiderContent />
      </Sider>
      <Layout className="basic-layout-main">
        <Header className="basic-layout-header">
          <HeaderContent />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          <Card>
            {children}
          </Card>
        </Content>
      </Layout>
    </Layout>
  );
}
BasicLayout.propTypes = {
  children: PropTypes.element,
};
