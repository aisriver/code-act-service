/*
 * @文件描述: 对文件夹的相关操作
 * @作者: 廖军
 * @Date: 2020-03-16 18:16:28
 * @LastEditors: 廖军
 * @LastEditTime: 2020-03-22 17:41:08
 */
import { Controller, Context } from 'egg';
import { getSuccessData, getErrorData } from '../utils/status';
import { execPromise, getCommandByArray } from '../utils/process';
import { getToRootPathCommand, getClearPath, toRootPath } from '../utils/path';
import { commandConfig } from '../utils/command';
import { checkCtxParams } from '../utils/check';

const fs = require('fs');
const path = require('path');

export default class FolderController extends Controller {
  /**
   * 到指定目录新建文件夹
   * 测试地址 http://localhost:7001/folder/add?path=src%2fpages&folderName=testPage
   * @param ctx
   */
  public async add(ctx: Context) {
    const { path: pathStr, folderName } = ctx.query;
    const checkParams = checkCtxParams(ctx, ['path', 'folderName']);
    if (!checkParams.isPass) {
      ctx.body = checkParams.body;
      return;
    }
    const toRoot = getToRootPathCommand();
    // 检查文件夹是否存在
    const check = await execPromise(getCommandByArray([toRoot, `cd ${pathStr}/${folderName}`]));
    if (!check.error) {
      ctx.body = getErrorData(null, `路径 ${pathStr} 下已存在 ${folderName} 文件夹！`);
      return;
    }
    // 获取创建命令并创建
    const command = getCommandByArray([
      toRoot,
      `cd ${pathStr}`,
      `${commandConfig.addFolder} ${folderName}`,
    ]);
    const result = await execPromise(command);
    // 创建异常
    if (result.error) {
      ctx.body = getErrorData(result.error, '创建文件夹失败，请检查路径是否正确！');
      return;
    }
    ctx.body = getSuccessData(null, `创建文件夹 ${folderName} 至 ${pathStr}！`);
  }
  /**
   * 到指定目录删除目标文件夹
   * 测试地址 http://localhost:7001/folder/delete?path=src%2fpages&folderName=testPage
   * @param ctx
   */
  public async delete(ctx: Context) {
    const { path: pathStr, folderName } = ctx.query;
    const checkParams = checkCtxParams(ctx, ['path', 'folderName']);
    if (!checkParams.isPass) {
      ctx.body = checkParams.body;
      return;
    }
    const toRoot = getToRootPathCommand();
    // 检查文件夹是否存在
    const check = await execPromise(getCommandByArray([toRoot, `cd ${pathStr}/${folderName}`]));
    if (check.error) {
      ctx.body = getErrorData(null, `路径 ${pathStr} 未发现 ${folderName} 文件夹！`);
      return;
    }
    // 删除目标文件夹
    const command = getCommandByArray([
      toRoot,
      `cd ${pathStr}`,
      `${commandConfig.delete} ${folderName}`,
    ]);
    const result = await execPromise(command);
    // 删除异常
    if (result.error) {
      ctx.body = getErrorData(result.error, '删除文件夹失败，请检查路径是否正确！');
      return;
    }
    ctx.body = getSuccessData(null, `删除文件夹 ${folderName} 成功！`);
  }
  /**
   * 到指定目录重新命名目标文件夹
   * 测试地址 http://localhost:7001/folder/rename?path=src%2fpages&folderName=testPage&newFolderName=testPageRename
   * @param ctx
   */
  public async rename(ctx: Context) {
    const { path: pathStr, folderName, newFolderName } = ctx.query;
    const checkParams = checkCtxParams(ctx, ['path', 'folderName', 'newFolderName']);
    if (!checkParams.isPass) {
      ctx.body = checkParams.body;
      return;
    }
    const toRoot = getToRootPathCommand();
    // 检查文件夹是否存在
    const check = await execPromise(getCommandByArray([toRoot, `cd ${pathStr}/${folderName}`]));
    if (check.error) {
      ctx.body = getErrorData(null, `路径 ${pathStr} 未发现 ${folderName} 文件夹！`);
      return;
    }
    // 重新命名目标文件夹
    const command = getCommandByArray([
      toRoot,
      `cd ${pathStr}`,
      `${commandConfig.rename} ${folderName} ${newFolderName}`,
    ]);
    const result = await execPromise(command);
    // 文件夹重命名异常
    if (result.error) {
      ctx.body = getErrorData(result.error, '文件夹重命名失败，请检查路径是否正确！');
      return;
    }
    ctx.body = getSuccessData(null, `文件夹 ${folderName} 重命名为 ${newFolderName} 成功！`);
  }
  /**
   * 获取指定路径下的所有文件夹及文件
   * 测试地址 http://localhost:7001/folder/structure
   * @param ctx
   */
  public async structure(ctx: Context) {
    const pathStr = ctx.query.path;
    const toRoot = getToRootPathCommand();
    let basePath = toRootPath;
    if (pathStr) {
      // 检查文件夹是否存在
      const checkCommands = [toRoot];
      checkCommands.push(`cd ${pathStr}`);
      const check = await execPromise(getCommandByArray(checkCommands));
      if (check.error) {
        ctx.body = getErrorData(null, `路径 ${pathStr} 有误！`);
        return;
      }
      basePath += getClearPath(pathStr);
    }
    try {
      const data = [];
      const loopDirs = (dirPath, array) => {
        // 始终排除 服务器目录与node_modules
        const dirs = fs
          .readdirSync(dirPath)
          .filter(name => !['code-act-service', 'node_modules'].includes(name));
        for (let i = 0; i < dirs.length; i++) {
          const name = dirs[i];
          const dataObj = { name };
          const currentPath = path.join(dirPath, name);
          const stats = fs.statSync(currentPath);
          // 记录路径 便于直接获取文件或打开文件夹
          dataObj['path'] = currentPath.substring(3, currentPath.length);
          if (stats.isDirectory()) {
            dataObj['type'] = 'dir';
            dataObj['children'] = [];
            array.push(dataObj);
            loopDirs(currentPath, array[i].children);
          } else {
            dataObj['type'] = 'file';
            array.push(dataObj);
          }
        }
      };
      loopDirs(basePath, data);
      ctx.body = getSuccessData(data, '目录结构获取成功');
    } catch (error) {
      ctx.body = getErrorData(error, '目录结构获取异常！');
    }
  }
}
