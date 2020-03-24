import React, { useState, useEffect, createRef } from 'react';
import { hot } from 'react-hot-loader/root';
import { Tree, Row, Col, Button, message, Modal, Input } from 'antd';
import { FolderOpenFilled, FileTextOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { UnControlled } from 'react-codemirror2';
import classnames from 'classnames';
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
  const [selected, setSelected] = useState<ListType>();
  const codeMirrorRef = createRef<UnControlled>();

  /**
   * 获取工程结构
   */
  const getStructure = () =>
    tryCatch(async () => {
      const result = await request.get<ListType[]>('/folder/structure');
      if (!result.success) {
        throw result;
      }
      setList(result.data);
    });

  useEffect(() => {
    getStructure();
  }, [getStructure]);

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
    if (!e.selected) {
      setSelected(undefined);
      setFileText('');
      return;
    }
    setSelected(item);
    if (type === 'file') {
      tryCatch(async () => {
        const result = await request.get<string>('/file/read', { path });
        if (!result.success) {
          throw result;
        }
        setFileText(result.data);
      });
    } else {
      setFileText('');
    }
  };

  /**
   * 保存修改后的文件
   */
  const handleSaveFile = () => {
    const path = selected?.path;
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

  /**
   * 删除文件或文件夹
   */
  const handleDelete = () =>
    Modal.confirm({
      title: '你确定要删除吗?',
      icon: <ExclamationCircleOutlined />,
      content: '删除后只能从git中恢复',
      onOk: () => {
        const { path = '', type, name } = selected || {};
        tryCatch(async () => {
          let result;
          if (type === 'file') {
            result = await request.get('/file/delete', { path });
          }
          if (type === 'dir') {
            result = await request.get('/folder/delete', {
              path: path.substring(0, path.lastIndexOf('/')),
              folderName: name,
            });
          }
          if (!result?.success) {
            throw result;
          }
          message.success(result?.message);
          getStructure();
          setSelected(undefined);
        });
      },
    });

  /**
   * 新建文件夹
   */
  const handleAdd = (type: 'dir' | 'file') => {
    const path = selected?.type === 'dir' ? selected.path : '';
    let addName = '';
    const content = () => (
      <div>
        <Input
          value={addName}
          onChange={e => {
            addName = e.target.value;
            modal.update({
              okButtonProps: { disabled: !addName },
              content: content(),
            });
          }}
        />
      </div>
    );
    const modal = Modal.confirm({
      title: type === 'dir' ? '请输入文件夹名称' : '请输入文件名，携带后缀（如index.tsx）',
      content: content(),
      okButtonProps: { disabled: !addName },
      onOk: () =>
        tryCatch(async () => {
          let result;
          if (type === 'dir') {
            result = await request.get('/folder/add', { path, folderName: addName });
          }
          if (type === 'file') {
            result = await request.get('/file/add', { path, fileName: addName });
          }
          if (!result?.success) {
            throw result;
          }
          getStructure();
          message.success(result?.message);
        }),
    });
  };

  return (
    <div>
      <Row className={styles.container}>
        <Col className={styles.left} span={6} offset={2}>
          <Tree
            onSelect={handleSelect}
            showIcon
            icon={<FileTextOutlined />}
            // switcherIcon={<FolderOpenFilled />}
            defaultExpandedKeys={[]}
          >
            {renderNodes(list)}
          </Tree>
        </Col>
        <Col className={styles.right} span={14}>
          <GenCode
            onChange={(_editor, _data, value: string) => selected?.type && setFileText(value)}
            ref={codeMirrorRef}
            value={fileText}
          />
        </Col>
      </Row>
      <div className={styles.footer}>
        {selected?.type !== 'file' && (
          <>
            <Button
              onClick={() => handleAdd('dir')}
              className={classnames(styles.btn, styles.default)}
            >
              新建文件夹
            </Button>
            <Button
              onClick={() => handleAdd('file')}
              className={classnames(styles.btn, styles.default)}
            >
              新建文件
            </Button>
          </>
        )}
        {selected?.type === 'file' && (
          <Button onClick={handleSaveFile} className={classnames(styles.btn, styles.default)}>
            保存
          </Button>
        )}
        {selected?.type && (
          <Button type="danger" onClick={handleDelete} className={styles.btn}>
            删除
          </Button>
        )}
      </div>
    </div>
  );
};

export default EASY_ENV_IS_DEV ? hot(Home) : Home;
