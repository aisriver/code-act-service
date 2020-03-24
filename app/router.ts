/*
 * @文件描述: 路由
 * @作者: 廖军
 * @Date: 2020-03-15 19:04:38
 * @LastEditors: 廖军
 * @LastEditTime: 2020-03-24 22:21:16
 */
import { Application } from 'egg';
export default (app: Application) => {
  const { router, controller } = app;
  router.get('/file/add', controller.file.add);
  router.get('/file/delete', controller.file.delete);
  router.post('/file/modify', controller.file.modify);
  router.get('/file/read', controller.file.read);
  router.get('/folder/structure', controller.folder.structure);
  router.get('/folder/rename', controller.folder.rename);
  router.get('/folder/delete', controller.folder.delete);
  router.get('/folder/add', controller.folder.add);
  router.get('/demo/node', controller.demo.nodeData);
  router.get('/demo/async', controller.demo.asyncData);
  router.get('/demo/api/article', controller.demo.article);
  router.get('/antd', controller.antd.index);
  router.get('/api/code/list', controller.code.list);
  router.get('/api/code/:id', controller.code.detail);
  router.get('/(.*?)', controller.code.home);
};
