/*
 * @文件描述: 参数校验
 * @作者: 廖军
 * @Date: 2020-03-22 17:17:04
 * @LastEditors: 廖军
 * @LastEditTime: 2020-03-22 17:32:47
 */
import { Context } from 'egg';
import { getErrorData } from './status';

/**
 * 检查GET必传项
 * @param ctx
 * @param params
 */
export const checkCtxParams = (ctx: Context, params: string[], type: string = 'get') => {
  let payload = ctx.request.body;
  if (type === 'get') {
    payload = ctx.query;
  }
  const errorParams = params.filter(key => !payload[key]);
  let result: { isPass: boolean; body?: object } = { isPass: true };
  if (errorParams.length > 0) {
    result = {
      isPass: false,
      body: getErrorData(ctx, `参数：${errorParams.join(',')} 不能为空！`),
    };
  }
  return result;
};
