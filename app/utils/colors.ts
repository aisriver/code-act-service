/*
 * @文件描述: 颜色配置生成
 * @作者: 廖军
 * @Date: 2020-03-25 19:51:02
 * @LastEditors: 廖军
 * @LastEditTime: 2020-03-25 19:51:37
 */

import { generate, presetPrimaryColors } from '@ant-design/colors';

// 基础颜色
const BASE_COLORS = [
  'red',
  'green',
  'blue',
  'pink',
  'orange',
  'purple',
  'yellow',
  'cyan',
  'magenta',
  'lime',
  ...Object.keys(presetPrimaryColors),
];
const START_INDEX = 3;
const END_INDEX = 9;
const ROW_NUMBER = END_INDEX - START_INDEX;

interface ColorsType {
  color: string;
  sortValue: number;
}

// 图表里面用到的颜色
const colors: ColorsType[] = [];
BASE_COLORS.forEach((color, index) => {
  colors.push(
    ...generate(color)
      // .slice(START_INDEX, END_INDEX)
      // .filter((_color, i) => i % 2 === 0)
      .map((filterColor, i) => ({
        color: filterColor,
        sortValue: index + i * ROW_NUMBER,
      })),
  );
});

/**
 * 排序后的color数组
 */
export const chartColors = [...colors]
  .sort((pre, next) => pre.sortValue - next.sortValue)
  .map(({ color }) => color);
