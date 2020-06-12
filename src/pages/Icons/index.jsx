import React, { useState, useCallback } from 'react';
import * as antdIcons from '@ant-design/icons';
import { Tabs, Switch } from 'antd';
import './index.scss';

const typeMap = {
  Outlined: '线框(Outlined)',
  Filled: '实底(Filled)',
  TwoTone: '双色(TwoTone)',
};

const typedIconsMap = (function gannerateTypedIconsMap() {
  const keysWhichIsNotCompoenent = new Set([
    'getTwoToneColor',
    'setTwoToneColor',
    'createFromIconfontCN',
    'default',
  ]);

  const typedIconsMap = {};
  const types = Object.keys(typeMap);
  types.forEach((type) => {
    typedIconsMap[type] = {};
  });
  Object.keys(antdIcons).forEach((key) => {
    if (keysWhichIsNotCompoenent.has(key)) return;
    const value = antdIcons[key];
    types.forEach((type) => {
      if (key.endsWith(type)) {
        typedIconsMap[type][key] = value;
      }
    });
  });

  return typedIconsMap;
})();

const { TabPane } = Tabs;

export default function Icons() {
  const [isSpin, setIsSpin] = useState(false);
  const toggleIsSpin = useCallback(() => {
    setIsSpin((prev) => !prev);
  }, [setIsSpin]);
  return (
    <div>
      <Switch
        checked={isSpin}
        checkedChildren="旋转"
        unCheckedChildren="旋转"
        onClick={toggleIsSpin}
      />
      <Tabs defaultActiveKey="Outlined">
        {Object.keys(typedIconsMap).map((type) => {
          const iconCompoentMap = typedIconsMap[type];
          return (
            <TabPane tab={typeMap[type]} key={type}>
              {
                <ul className="page-icons">
                  {Object.keys(iconCompoentMap).map((key) => {
                    const Icon = antdIcons[key];
                    return (
                      <li className="page-icons-item" key={key}>
                        <Icon spin={isSpin} className="page-icons-item-icon" />
                        <span className="page-icons-item-text">{key}</span>
                      </li>
                    );
                  })}
                </ul>
              }
            </TabPane>
          );
        })}
      </Tabs>
    </div>
  );
}
