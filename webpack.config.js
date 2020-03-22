/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2020-03-19 22:59:35
 * @LastEditors: 廖军
 * @LastEditTime: 2020-03-22 21:34:42
 */
'use strict';
// https://www.yuque.com/easy-team/egg-react/config
const path = require('path');
const resolve = filepath => path.resolve(__dirname, filepath);
module.exports = {
  entry: {
    code: 'app/web/page/code/index.tsx',
    antd: 'app/web/page/antd/index.tsx',
    'demo/node': 'app/web/page/demo/node.tsx',
    'demo/async': 'app/web/page/demo/async.tsx',
  },
  module: {
    rules: [
      {
        less: {
          include: [resolve('app/web'), resolve('node_modules')],
          options: {
            javascriptEnabled: true,
            modifyVars: {
              'primary-color': 'red',
              'link-color': '#1DA57A',
              'border-radius-base': '2px',
            },
          },
        },
      },
      {
        typescript: true,
      },
    ],
  },
  plugins: [{ imagemini: false }],
};
