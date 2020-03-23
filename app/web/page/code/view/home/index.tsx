import React, { useState, useEffect, createRef } from 'react';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader/root';
import { Tree, Row, Col, Button, message } from 'antd';
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
  const [selected, setSelected] = useState({});
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

  /**
   * 选中节点
   * @param _selectedKeys
   * @param e
   */
  const handleSelect = (_selectedKeys, e) => {
    const { item } = e.node.props;
    const { path, type } = item;
    setSelected(item);
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

  /**
   * 保存修改后的文件
   */
  const handleSaveFile = () => {
    const path = selected['path'];
    if (!path) {
      message.error('文件路径有误！');
      return false;
    }
    tryCatch(async () => {
      const result = await request.postJSON('/file/modify', {
        path,
        text: fileText,
      });
      if (!result.success) {
        throw result;
      }
      message.success(result.message);
    });
  };

  return (
    <div>
      <Row className={styles.container}>
        <Col className={styles.left} span={6} offset={2}>
          <Tree
            onSelect={handleSelect}
            switcherIcon={<FolderOpenFilled />}
            defaultExpandedKeys={[]}
          >
            {renderNodes(list)}
          </Tree>
        </Col>
        <Col className={styles.right} span={14}>
          <GenCode
            onChange={(_editor, _data, value: string) => setFileText(value)}
            ref={codeMirrorRef}
            value={fileText}
          />
        </Col>
      </Row>
      <div className={styles.footer}>
        {selected['type'] === 'file' && (
          <Button onClick={handleSaveFile} className={styles.save}>
            保存
          </Button>
        )}
      </div>
    </div>
  );
};

export default EASY_ENV_IS_DEV ? hot(Home) : Home;
