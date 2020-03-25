/*
 * @文件描述: 文档
 * @作者: 廖军
 * @Date: 2020-03-22 22:41:16
 * @LastEditors: 廖军
 * @LastEditTime: 2020-03-25 23:29:36
 */
import React from 'react';
import { hot } from 'react-hot-loader/root';
import styles from './index.module.less';

// 接口内容
export const interfaceList = [
  {
    title: 'Folder',
    children: [
      {
        url: '/folder/add',
        method: 'GET',
        testUrl: '/folder/add?path=src%2fpages&folderName=testPage',
        params: {
          path: '<string>路径',
          folderName: '<string>文件名',
        },
        response: {
          code: '<number>',
          message: '提示信息',
          success: '<boolean>',
          data: 'null',
        },
      },
      {
        url: '/folder/delete',
        method: 'GET',
        testUrl: '/folder/delete?path=src%2fpages&folderName=testPage',
        params: {
          path: '<string>路径',
          folderName: '<string>文件名',
        },
        response: {
          code: '<number>',
          message: '提示信息',
          success: '<boolean>',
          data: 'null',
        },
      },
      {
        url: '/folder/rename',
        method: 'GET',
        testUrl: '/folder/rename?path=src%2fpages&folderName=testPage&newFolderName=testPageRename',
        params: {
          path: '<string>路径',
          folderName: '<string>目标文件名',
          newFolderName: '<string>新文件名',
        },
        response: {
          code: '<number>',
          message: '提示信息',
          success: '<boolean>',
          data: 'null',
        },
      },
      {
        url: '/folder/structure',
        method: 'GET',
        testUrl: 'folder/structure',
        params: {},
        response: {
          code: '<number>',
          message: '提示信息',
          success: '<boolean>',
          data: `[
            {
                "name": "mock",
                "path": "mock",
                "type": "dir",
                "children": [
                    {
                        "name": ".gitkeep",
                        "path": "mock/.gitkeep",
                        "type": "file"
                    }
                ]
            },
            {
                "name": "package-lock.json",
                "path": "package-lock.json",
                "type": "file"
            },
            {
                "name": "package.json",
                "path": "package.json",
                "type": "file"
            }
        ],`,
        },
      },
    ],
  },
  {
    name: 'File',
    children: [
      {
        url: '/file/add',
        method: 'GET',
        testUrl: '/file/add?path=src%2fpages&fileName=test.js',
        params: {
          path: '<string>路径',
          fileName: '<string>文件名',
        },
        response: {
          code: '<number>',
          message: '提示信息',
          success: '<boolean>',
          data: 'null',
        },
      },
      {
        url: '/file/read',
        method: 'GET',
        testUrl: '/file/read?path=codeact.config.js',
        params: {
          path: '<string>路径',
        },
        response: {
          code: '<number>',
          message: '提示信息',
          success: '<boolean>',
          data: 'text',
        },
      },
      {
        url: '/file/modify',
        method: 'POST',
        testUrl: '/file/modify',
        params: {
          path: '<string>路径',
          text: '<string>文件内容',
        },
        response: {
          code: '<number>',
          message: '提示信息',
          success: '<boolean>',
          data: 'null',
        },
      },
      {
        url: '/file/delete',
        method: 'POST',
        testUrl: '/file/delete?path=src%2fpages%2ftestPage%2ftest.js',
        params: {
          path: '<string>路径',
        },
        response: {
          code: '<number>',
          message: '提示信息',
          success: '<boolean>',
          data: 'null',
        },
      },
    ],
  },
];

const Introduce: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div>接口</div>
        <div>Folder</div>
        <div></div>
        <div>File</div>
        <div></div>
      </div>
      <div className={styles.footer}>
        <div className={styles.info}>
          <div>遇到问题？或者你有更好的建议，欢迎一起讨论！</div>
          <div className={styles.contact}>
            WeChat：mrliaojun&nbsp;&nbsp;&nbsp; Email：767882503@qq.com
          </div>
        </div>
      </div>
    </div>
  );
};

export default EASY_ENV_IS_DEV ? hot(Introduce) : Introduce;
