/*
 * @文件描述: 生成器示例
 * @作者: 廖军
 * @Date: 2020-03-22 22:41:16
 * @LastEditors: 廖军
 * @LastEditTime: 2020-03-24 22:51:34
 */
import React from 'react';
import { hot } from 'react-hot-loader/root';

const Generator: React.FC = () => {
  return <div></div>;
};

export default EASY_ENV_IS_DEV ? hot(Generator) : Generator;
