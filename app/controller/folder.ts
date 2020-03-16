/*
 * @文件描述: 对文件夹的相关操作
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2020-03-16 18:16:28
 * @LastEditors: 廖军
 * @LastEditTime: 2020-03-16 22:46:16
 */
import { Controller, Context } from 'egg';
import { getSuccessData, getErrorData } from '../utils/status';
import { execPromise, getCommandByArray } from '../utils/process';
import { getToRootPathCommand } from '../utils/path';

export default class DemoController extends Controller {
	// 测试地址 http://localhost:7001/folder/add?path=src%2fpages&folderName=testPage
	public async add(ctx: Context) {
		const { path, folderName } = ctx.query;
		const errorParams = ['path', 'folderName'].filter(key => !ctx.query[key]);
		if (errorParams.length > 0) {
			ctx.body = getErrorData(ctx, `参数：${errorParams.join(',')} 不能为空！`);
			return;
		}
		const toRoot = getToRootPathCommand();
		// 检查文件夹是否存在
		const check = await execPromise(getCommandByArray([toRoot, `cd ${path}/${folderName}`]));
		if (!check.error) {
			ctx.body = getErrorData(null, `路径 ${path} 下已存在 ${folderName} 文件夹！`);
			return;
		}
		// 获取创建命令并创建
		const command = getCommandByArray([toRoot, `cd ${path}`, `mkdir ${folderName}`]);
		const result = await execPromise(command);
		// 创建异常
		if (result.error) {
			ctx.body = getErrorData(result.error, '创建文件夹失败！');
			return;
		}
		ctx.body = getSuccessData(null, `创建文件夹 ${folderName} 至 ${path}！`);
	}
	// 测试地址 http://localhost:7001/folder/delete?path=src%2fpages&folderName=testPage
	public async delete(ctx: Context) {
		const { path, folderName } = ctx.query;
		const errorParams = ['path', 'folderName'].filter(key => !ctx.query[key]);
		if (errorParams.length > 0) {
			ctx.body = getErrorData(ctx, `参数：${errorParams.join(',')} 不能为空！`);
			return;
		}
		const toRoot = getToRootPathCommand();
		// 检查文件夹是否存在
		const check = await execPromise(getCommandByArray([toRoot, `cd ${path}/${folderName}`]));
		if (check.error) {
			ctx.body = getErrorData(null, `路径 ${path} 未发现 ${folderName} 文件夹！`);
			return;
		}
		// 删除目标文件夹
		const command = getCommandByArray([toRoot, `cd ${path}`, `rm -fr ${folderName}`]);
		const result = await execPromise(command);
		// 删除异常
		if (result.error) {
			ctx.body = getErrorData(result.error, '删除文件夹失败！');
			return;
		}
		ctx.body = getSuccessData(null, `删除文件夹 ${folderName} 成功！`);
	}
}
