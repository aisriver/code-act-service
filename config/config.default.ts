/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2020-03-19 22:59:35
 * @LastEditors: 廖军
 * @LastEditTime: 2020-03-22 16:56:47
 */
import * as path from 'path';
import * as fs from 'fs';
import { EggAppConfig } from 'egg';
export default function(app: EggAppConfig) {
  const exports: any = {};

  exports.siteFile = {
    '/favicon.ico': fs.readFileSync(path.join(app.baseDir, 'app/web/asset/images/favicon.ico')),
  };

  exports.logger = {
    consoleLevel: 'DEBUG',
    dir: path.join(app.baseDir, 'logs'),
  };

  exports.static = {
    prefix: '/public/',
    dir: path.join(app.baseDir, 'public'),
  };

  exports.keys = '123456';

  exports.middleware = [
    'locals',
    // 'access'
  ];

  exports.reactssr = {
    layout: path.join(app.baseDir, 'app/web/view/layout.html'),
  };

  exports.security = {
    csrf: {
      enable: false,
      // headerName: 'x-csrf-token', // 自定义请求头
    },
  };

  return exports;
}
