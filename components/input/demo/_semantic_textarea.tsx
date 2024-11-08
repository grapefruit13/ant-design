import React from 'react';
import { Input } from 'antd';

import SemanticPreview from '../../../.dumi/components/SemanticPreview';

const locales = {
  cn: {
    textarea: '输入框元素',
    count: '文字计数元素',
  },
  en: {
    textarea: 'textarea element',
    count: 'count element',
  },
  ko: {
    textarea: '텍스트 영역 요소',
    count: '글자 수 요소',
  },
};

const App: React.FC = () => {
  const locale = locales.ko;
  return (
    <SemanticPreview
      semantics={[
        { name: 'textarea', desc: locale.textarea, version: '5.4.0' },
        { name: 'count', desc: locale.count, version: '5.4.0' },
      ]}
    >
      <Input.TextArea defaultValue="Hello, Ant Design" rows={3} count={{ max: 100, show: true }} />
    </SemanticPreview>
  );
};

export default App;
