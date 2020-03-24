#! /usr/bin/env node
/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2020-03-16 18:20:31
 * @LastEditors: 廖军
 * @LastEditTime: 2020-03-24 21:50:36
 */
import { exec, ExecException } from 'child_process';
import colors, { Color } from 'colors';
import { ExecReturn, ExecOption } from '../interfaces/common';

/**
 * 封装exec Promise
 * @param command
 * @param option
 */
export const execPromise = (command: string, option?: ExecOption) =>
  new Promise((resolve: (result: ExecReturn) => void) => {
    const childProcess = exec(
      command,
      option,
      (error: ExecException | null, stdout: string | Buffer, stderr: string | Buffer) => {
        resolve({ error, stdout, stderr, childProcess });
      },
    );
  });

/**
 * 日志打印
 * @param message
 */
export const logMessage = (message: string, color: Color = colors.white) =>
  console.log(color(`>>>>>> ${message}`));

/**
 * 从多个命令的数组得到命令
 * @param commands
 */
export const getCommandByArray = (commands: string[]) => commands.filter(str => !!str).join(' && ');
