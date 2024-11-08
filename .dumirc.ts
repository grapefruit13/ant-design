import os from 'node:os';
import path from 'path';
import { defineConfig } from 'dumi';
import * as fs from 'fs-extra';

import rehypeAntd from './.dumi/rehypeAntd';
import remarkAntd from './.dumi/remarkAntd';
import { version } from './package.json';

export default defineConfig({
  plugins: ['dumi-plugin-color-chunk'],
  manifest: {},
  conventionRoutes: {
    // to avoid generate routes for .dumi/pages/index/components/xx
    exclude: [/index\/components\//],
  },
  ssr:
    process.env.NODE_ENV === 'production'
      ? {
          builder: 'mako',
        }
      : false,
  hash: true,
  mfsu: false,
  mako: ['Darwin', 'Linux'].includes(os.type()) ? {} : false,
  crossorigin: {},
  runtimePublicPath: {},
  outputPath: '_site',
  favicons: ['https://gw.alipayobjects.com/zos/rmsportal/rlpTLlbMzTNYuZGGCVYM.png'],
  resolve: {
    docDirs: [{ type: 'doc', dir: 'docs' }],
    atomDirs: [{ type: 'component', dir: 'components' }],
    codeBlockMode: 'passive',
  },
  locales: [{ id: 'ko-KR', name: '한국어', suffix: '' }],
  define: {
    antdReproduceVersion: version,
  },
  alias: {
    'antd/lib': path.join(__dirname, 'components'),
    'antd/es': path.join(__dirname, 'components'),
    'antd/locale': path.join(__dirname, 'components/locale'),
    antd: path.join(__dirname, 'components'),
    // https://github.com/ant-design/ant-design/issues/46628
    '@ant-design/icons$': '@ant-design/icons/lib',
  },
  extraRehypePlugins: [rehypeAntd],
  extraRemarkPlugins: [remarkAntd],
  metas: [
    { name: 'theme-color', content: '#1677ff' },
    { name: 'build-time', content: Date.now().toString() },
    // https://docs.github.com/en/actions/learn-github-actions/variables#default-environment-variables
    { name: 'build-hash', content: process.env.GITHUB_SHA ?? 'unknown' },
  ],
  analytics: {
    ga_v2: 'UA-72788897-1',
  },
  analyze:
    process.env.NODE_ENV === 'production'
      ? false
      : {
          analyzerPort: 'auto',
        },
  links: [
    {
      rel: 'prefetch',
      as: 'font',
      href: '//at.alicdn.com/t/webfont_6e11e43nfj.woff2',
      type: 'font/woff2',
      crossorigin: 'anonymous',
    },
    {
      rel: 'prefetch',
      as: 'font',
      href: '//at.alicdn.com/t/webfont_6e11e43nfj.woff',
      type: 'font/woff',
      crossorigin: 'anonymous',
    },
    {
      rel: 'prefetch',
      as: 'font',
      href: '//at.alicdn.com/t/webfont_6e11e43nfj.ttf',
      type: 'font/ttf',
      crossorigin: 'anonymous',
    },
    {
      rel: 'prefetch',
      as: 'font',
      href: '//at.alicdn.com/t/webfont_exesdog9toj.woff2',
      type: 'font/woff2',
      crossorigin: 'anonymous',
    },
    {
      rel: 'prefetch',
      as: 'font',
      href: '//at.alicdn.com/t/webfont_exesdog9toj.woff',
      type: 'font/woff',
      crossorigin: 'anonymous',
    },
    {
      rel: 'prefetch',
      as: 'font',
      href: '//at.alicdn.com/t/webfont_exesdog9toj.ttf',
      type: 'font/ttf',
      crossorigin: 'anonymous',
    },
    {
      rel: 'preload',
      as: 'font',
      href: '//at.alicdn.com/wf/webfont/exMpJIukiCms/Gsw2PSKrftc1yNWMNlXgw.woff2',
      type: 'font/woff2',
      crossorigin: 'anonymous',
    },
    {
      rel: 'preload',
      as: 'font',
      href: '//at.alicdn.com/wf/webfont/exMpJIukiCms/vtu73by4O2gEBcvBuLgeu.woff',
      type: 'font/woff2',
      crossorigin: 'anonymous',
    },
  ],
  headScripts: [
    `
    (function () {
      function isLocalStorageNameSupported() {
        const testKey = 'test';
        const storage = window.localStorage;
        try {
          storage.setItem(testKey, '1');
          storage.removeItem(testKey);
          return true;
        } catch (error) {
          return false;
        }
      }
      // 优先级提高到所有静态资源的前面，语言不对，加载其他静态资源没意义
      
      const pathname = location.pathname;

      function isZhCN(pathname) {
        return /-cn\\/?$/.test(pathname);
      }

      function getLocalizedPathname() {;
        return '/';
      }

      // 兼容旧的 URL， \`?locale=...\`
      const queryString = location.search;
      if (queryString) {
        const isZhCNConfig = queryString.indexOf('zh-CN') > -1;
        if (isZhCNConfig && pathname !== '/') {
          location.pathname = getLocalizedPathname();
        }
      }
      // 首页无视链接里面的语言设置 https://github.com/ant-design/ant-design/issues/4552
    (() => {
     const isLocalStorageNameSupported = () => {
     try {
       return 'localStorage' in window && window.localStorage !== null;
     } catch (e) {
       return false;
     }
    };

    const isZhCN = (pathname) => {
     return pathname.includes('-cn');
   };

    const isKoKR = (pathname) => {
      return pathname.includes('-kr');
    };

    const getLocalizedPathname = (pathname, isZhCN, isKoKR) => {
     if (isZhCN) {
        return pathname.replace('/en', '/zh-cn');
     } else if (isKoKR) {
       return pathname.replace('/en', '/ko-kr');
     }
     return pathname.replace('/zh-cn', '/en');
    };

    if (isLocalStorageNameSupported() && (pathname === '/' || pathname === '/index-cn' || pathname === '/index-kr')) {
     const lang = 
        (window.localStorage && localStorage.getItem('locale')) || 
        ((navigator.language || navigator.browserLanguage).toLowerCase());

      if (lang === 'zh-cn') {
       location.pathname = getLocalizedPathname(pathname, true, false);
      } else if (lang === 'ko-kr') {
       location.pathname = getLocalizedPathname(pathname, false, true);
      } else {
       location.pathname = getLocalizedPathname(pathname, false, false);
      }
    }

    document.documentElement.className += isZhCN(pathname) ? 'zh-cn' : (isKoKR(pathname) ? 'ko-kr' : 'en-us');
  })();
      if (isLocalStorageNameSupported() && pathname !== "/") {
        const lang =
          (window.localStorage && localStorage.getItem('locale')) ||
          ((navigator.language || navigator.browserLanguage).toLowerCase() === 'zh-cn'
            ? 'zh-CN'
            : 'en-US');
        // safari is 'zh-cn', while other browser is 'zh-CN';
        if (pathname !== '/') {
          location.pathname = getLocalizedPathname();
        }
      }
        
    })();
    `,
  ],
  scripts: [
    {
      async: true,
      content: fs
        .readFileSync(path.join(__dirname, '.dumi', 'scripts', 'mirror-modal.js'))
        .toString(),
    },
    {
      async: true,
      content: fs.readFileSync(path.join(__dirname, '.dumi', 'scripts', 'clarity.js')).toString(),
    },
  ],
});
