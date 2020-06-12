import React from 'react';

export default function ErrorDisplay() {

  throw new Error('测试');

  return (
    <div>
      你不应该看到这个页面的这段文字，因为我在函数中抛出了一个自定义的错误
    </div>
  );
}
