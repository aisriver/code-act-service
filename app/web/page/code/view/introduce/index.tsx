/*
 * @文件描述: 文档
 * @作者: 廖军
 * @Date: 2020-03-22 22:41:16
 * @LastEditors: 廖军
 * @LastEditTime: 2020-03-26 18:48:15
 */
import React from 'react';
import { hot } from 'react-hot-loader/root';
import { interfaceList, baseURL } from './constant';
import styles from './index.module.less';

const Introduce: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>文件操作类接口说明</div>
        {interfaceList.map(({ title, children = [] }) => (
          <div key={title}>
            <div className={styles.title}>{title}</div>
            <div>
              {children.map(({ url, method, testUrl, params, response }) => (
                <div className={styles.item} key={url}>
                  <div className={styles.info}>
                    <span className={styles.name}>请求地址：</span>
                    {url}
                  </div>
                  <div className={styles.info}>
                    <span className={styles.name}>请求类型：</span>
                    {method}
                  </div>
                  <div className={styles.info}>
                    <span className={styles.name}>测试地址：</span>
                    {`${baseURL}${testUrl}`}
                  </div>
                  <div>
                    <div className={styles.info}>
                      <span className={styles.name}>请求参数：</span>
                    </div>
                    <div>
                      {Object.keys(params).map(key => (
                        <div className={styles.params} key={key}>
                          {key}：{params[key]}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className={styles.info}>
                      <span className={styles.name}>返回内容：</span>
                    </div>
                    <div>
                      {Object.keys(response).map(key => (
                        <div className={styles.params} key={key}>
                          {key}：{response[key]}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.footer}>
        <div className={styles.info}>
          <div>遇到问题？或者你有更好的建议，欢迎一起讨论！</div>
          <div className={styles.contact}>
            WeChat：mrliaojun&nbsp;&nbsp;&nbsp; Email：767882503@qq.com
          </div>
        </div>
      </div>
    </div>
  );
};

export default EASY_ENV_IS_DEV ? hot(Introduce) : Introduce;
