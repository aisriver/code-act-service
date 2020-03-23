import React, { useState, useEffect, createRef } from 'react';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader/root';
import { Tree, Row, Col } from 'antd';
import { FolderOpenFilled, FileTextOutlined } from '@ant-design/icons';
import { UnControlled } from 'react-codemirror2';
import request from '../../../../framework/request';
import { tryCatch } from '../../../../../utils/exception-handling';
import GenCode from '../../components/GenCode';
import styles from './index.module.less';

const { TreeNode } = Tree;

export interface ListType {
  name: string;
  path: string;
  type: 'file' | 'dir';
  children?: ListType[];
}

const Home: React.FC = () => {
  const [list, setList] = useState<ListType[]>([]);
  const [fileText, setFileText] = useState('');
  const codeMirrorRef = createRef<UnControlled>();

  useEffect(() => {
    tryCatch(async () => {
      const result = await request.get<ListType[]>('/folder/structure');
      if (!result.success) {
        throw result;
      }
      setList(result.data);
    });
  }, []);

  /**
   * 渲染节点
   * @param list
   */
  const renderNodes = (list: ListType[]) =>
    [...list.filter(item => item.type === 'dir'), ...list.filter(item => item.type === 'file')].map(
      item => {
        const { name, path, type, children } = item;
        return (
          <TreeNode
            className={styles.tree}
            title={name}
            key={path}
            item={item}
            icon={type === 'dir' ? <FolderOpenFilled /> : <FileTextOutlined />}
          >
            {children && renderNodes(children)}
          </TreeNode>
        );
      },
    );

  const handleSelect = (_selectedKeys, e) => {
    const { path, type } = e.node.props.item;
    if (type === 'file') {
      tryCatch(async () => {
        const result = await request.get<string>('/file/read', { path });
        if (!result.success) {
          throw result;
        }
        setFileText(result.data);
      });
    }
  };

  return (
    <Row className={styles.container}>
      <Col className={styles.left} span={6} offset={2}>
        <Tree onSelect={handleSelect} switcherIcon={<FolderOpenFilled />} defaultExpandedKeys={[]}>
          {renderNodes(list)}
        </Tree>
      </Col>
      <Col className={styles.right} span={14}>
        <GenCode ref={codeMirrorRef} value={fileText} />
      </Col>
    </Row>
  );
};

export default EASY_ENV_IS_DEV ? hot(Home) : Home;
