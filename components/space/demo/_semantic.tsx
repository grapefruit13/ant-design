import React from 'react';
import { Button, Space } from 'antd';

import SemanticPreview from '../../../.dumi/components/SemanticPreview';

const locales = {
  cn: {
    item: '包裹的子组件',
  },
  en: {
    item: 'Wrapped item element',
  },
  ko: {
    item: '랩핑된 아이템 요소',
  },
};

const App: React.FC = () => {
  const locale = locales.ko;
  return (
    <SemanticPreview semantics={[{ name: 'item', desc: locale.item, version: '5.6.0' }]}>
      <Space>
        <Button type="primary">Primary</Button>
        <Button>Default</Button>
        <Button type="dashed">Dashed</Button>
      </Space>
    </SemanticPreview>
  );
};

export default App;
