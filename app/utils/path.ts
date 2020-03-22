/*
 * @文件描述: 路径相关方法
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2020-03-16 21:57:51
 * @LastEditors: 廖军
 * @LastEditTime: 2020-03-22 16:13:51
 */

/**
 * 获取进入操作目标项目的根目录-按codeact的约定
 */
export const getToRootPathCommand = () => 'cd ..';

/**
 * 对传入的路径进行一次处理，如果开头存在/则去掉
 * @param pathStr
 */
export const getClearPath = (pathStr: string) =>
  pathStr.startsWith('/') ? pathStr.substring(1, pathStr.length) : pathStr;
