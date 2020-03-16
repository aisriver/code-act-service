/*
 * @文件描述: 状态返回封装
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2020-03-16 21:48:07
 * @LastEditors: 廖军
 * @LastEditTime: 2020-03-16 21:52:56
 */

/**
 * 获取成功状态数据
 * @param data
 * @param message
 */
export const getSuccessData = <T>(data: T, message?: string) => ({
	code: 200000,
	success: true,
	data,
	message,
});

/**
 * 获取失败状态数据
 * @param data
 * @param message
 */
export const getErrorData = <T>(data: T, message: string) => ({
	code: 500000,
	success: false,
	data,
	message,
});
