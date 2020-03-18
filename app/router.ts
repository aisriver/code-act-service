/*
 * @文件描述: 路由
 * @作者: 廖军
 * @Date: 2020-03-15 19:04:38
 * @LastEditors: 廖军
 * @LastEditTime: 2020-03-18 22:51:13
 */
import { Application } from 'egg';
export default (app: Application) => {
	const { router, controller } = app;
	router.get('/folder/rename', controller.folder.rename);
	router.get('/folder/delete', controller.folder.delete);
	router.get('/folder/add', controller.folder.add);
	router.get('/demo/node', controller.demo.nodeData);
	router.get('/demo/async', controller.demo.asyncData);
	router.get('/demo/api/article', controller.demo.article);
	router.get('/antd', controller.antd.index);
	router.get('/api/blog/list', controller.blog.list);
	router.get('/api/blog/:id', controller.blog.detail);
	router.get('/(.*?)', controller.blog.home);
};
