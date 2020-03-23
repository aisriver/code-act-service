/*
 * @文件描述: 文件相关操作
 * @作者: 廖军
 * @Date: 2020-03-22 17:07:00
 * @LastEditors: 廖军
 * @LastEditTime: 2020-03-24 00:50:32
 */
import { Controller, Context } from 'egg';
import { getSuccessData, getErrorData } from '../utils/status';
import { execPromise, getCommandByArray } from '../utils/process';
import { getToRootPathCommand, getClearPath, toRootPath } from '../utils/path';
import { commandConfig } from '../utils/command';
import { checkCtxParams } from '../utils/check';

const fs = require('fs');

export default class FileController extends Controller {
  /**
   * 读取指定路径文件
   * 测试地址 http://localhost:7001/file/read?path=codeact.config.js
   * @param ctx
   */
  public async read(ctx: Context) {
    const pathStr = ctx.query.path;
    if (!pathStr) {
      ctx.body = getErrorData(ctx, '参数：path 不能为空！');
      return;
    }
    try {
      const data = fs.readFileSync(`${toRootPath}${getClearPath(pathStr)}`, 'utf8');
      ctx.body = getSuccessData(data, '文件读取成功');
    } catch (error) {
      ctx.body = getErrorData(error, '文件读取异常！请检查路径是否有误');
    }
  }
  /**
   * 修改指定路径文件
   * 测试地址 http://localhost:7001/file/modify
   * 请求类型 POST
   * 参数	 { "path": "test.js", "text": "修改成功了" }
   * @param ctx
   */
  public async modify(ctx: Context) {
    const { path: pathStr, text } = ctx.request.body;
    const checkParams = checkCtxParams(ctx, ['path', 'text'], 'post');
    if (!checkParams.isPass) {
      ctx.body = checkParams.body;
      return;
    }
    try {
      fs.writeFileSync(`${toRootPath}${getClearPath(pathStr)}`, text, 'utf8');
      ctx.body = getSuccessData(null, '文件修改成功');
    } catch (error) {
      ctx.body = getErrorData(error, '文件修改异常！请检查路径是否有误');
    }
  }
  /**
   * 通过路径删除指定文件
   * 测试地址 http://localhost:7001/file/delete?path=src%2fpages%2ftestPage%2ftest.js
   * @param ctx
   */
  public async delete(ctx: Context) {
    const { path: pathStr } = ctx.query;
    const checkParams = checkCtxParams(ctx, ['path']);
    if (!checkParams.isPass) {
      ctx.body = checkParams.body;
      return;
    }
    // 检查是否存在
    if (!fs.existsSync(`${toRootPath}${getClearPath(pathStr)}`)) {
      ctx.body = getErrorData(null, '请检查路径是否正确！');
      return;
    }
    // 文件名称
    const fileName = pathStr.substring(pathStr.lastIndexOf('/') + 1, pathStr.length);
    // 文件所在路径
    const filePath = pathStr.substring(0, pathStr.lastIndexOf('/'));
    const toRoot = getToRootPathCommand();
    // 删除目标文件
    const command = getCommandByArray([
      toRoot,
      `cd ${filePath}`,
      `${commandConfig.delete} ${fileName}`,
    ]);
    const result = await execPromise(command);
    // 删除异常
    if (result.error) {
      ctx.body = getErrorData(result.error, '删除文件失败，请检查路径是否正确！');
      return;
    }
    ctx.body = getSuccessData(null, `删除文件 ${fileName} 成功！`);
  }
}
