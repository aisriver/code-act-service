/*
 * @文件描述: code page
 * @作者: 廖军
 * @Date: 2020-03-19 22:59:35
 * @LastEditors: 廖军
 * @LastEditTime: 2020-03-24 19:48:27
 */
import { Controller, Context } from 'egg';
import { deserialize } from '@hubcarl/json-typescript-mapper';
import Condition from '../lib/condition';

export default class CodeController extends Controller {
  public async home(ctx: Context) {
    await ctx.renderClient('code.js', { url: ctx.url });
  }

  public async list(ctx: Context) {
    const condition = deserialize(Condition, ctx.request.body);
    ctx.body = await ctx.service.article.getArtilceList(condition);
  }

  public async detail(ctx: Context) {
    const { id } = ctx.params;
    const article = await ctx.service.article.query({ id: Number(id) });
    ctx.body = { article };
  }
}
