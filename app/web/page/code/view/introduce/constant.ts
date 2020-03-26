/*
 * @文件描述:
 * @作者: 廖军
 * @Date: 2020-03-26 09:24:20
 * @LastEditors: 廖军
 * @LastEditTime: 2020-03-26 18:16:32
 */

export const baseURL = 'http://localhose:7001';

export interface ChildProps {
  url: string;
  method: 'GET' | 'POST';
  testUrl: string;
  params: object;
  response: object;
}

export interface ListType {
  title: string;
  children: ChildProps[];
}

// 接口说明
export const interfaceList: ListType[] = [
  {
    title: 'Folder',
    children: [
      {
        url: '/folder/add',
        method: 'GET',
        testUrl: '/folder/add?path=src%2fpages&folderName=testPage',
        params: {
          path: '<string>路径',
          folderName: '<string>文件夹名',
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
          folderName: '<string>文件夹名',
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
          folderName: '<string>目标文件夹名',
          newFolderName: '<string>新文件夹名',
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
    title: 'File',
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
