import React, { useEffect, useRef, useState, CSSProperties, useCallback } from 'react';
import { Card, Button, InputNumber, Tag, Select, Modal, message } from 'antd';
import styles from './index.module.less';
import { chartColors } from '../../../../../utils/colors';

const initialBlocks = {};

const initialSize = {
  width: 500, // 1920
  height: 400,
  rowGridNum: 10,
  columnGridNum: 6,
  adapter: 'height',
};
const baseConfigs = [
  { label: '宽度', key: 'width' },
  { label: '高度', key: 'height' },
  { label: '行拆分', key: 'rowGridNum' },
  { label: '列拆分', key: 'columnGridNum' },
];
const adapters = [
  { label: '像素', value: 'px' },
  { label: '宽度自适应', value: 'width' },
  { label: '高度自适应', value: 'height' },
];
// const colors = [...green.slice(3, 10), ...volcano.slice(3, 10), ...blue.slice(3, 10)].filter(
//   (_color, index) => index % 2 === 0,
// );
const colors = [...chartColors];

interface GridAreaType {
  gridArea: string;
  color: string;
}

export interface GridGeneratorProps {
  visible?: boolean;
  onClose?: () => void;
  onConfirm?: (code: string) => void;
}

const GridGenerator: React.FC<GridGeneratorProps> = ({ visible, onClose, onConfirm }) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<HTMLDivElement>(null);
  const [screenConfig, setScreenConfig] = useState(initialSize);
  const [autoSize, setAutoSize] = useState({
    autoWidth: initialSize.width,
    autoHeight: initialSize.height,
    gridAutoWidth: initialSize.width,
    gridAutoHeight: initialSize.height,
  });
  const [activeId, setActiveId] = useState<number | null>(null);
  const [blocks, setBlocks] = useState(initialBlocks);
  const [code, setCode] = useState<string>('');
  const { rowGridNum, columnGridNum } = screenConfig;

  /**
   * 创建大屏模块
   */
  const createBlock = useCallback(() => {
    const id = new Date().getTime();
    setActiveId(id);
    const newBlocks = { ...blocks };
    const newColors = colors.filter(
      color => Object.keys(newBlocks).findIndex(key => newBlocks[key].color === color) === -1,
    );
    newBlocks[id] = {
      title: `新建${id}`,
      color: newColors[0],
    };
    setBlocks(newBlocks);
  }, [blocks]);

  useEffect(() => {
    window.onkeydown = (e: KeyboardEvent) => {
      if (e.keyCode === 65 && !activeId) {
        e.preventDefault();
        createBlock();
      }
    };
    return () => {
      window.onkeydown = null;
    };
  }, [activeId, createBlock]);

  useEffect(() => {
    const getSizeFromHtml = (dom: HTMLDivElement) => {
      const { clientWidth, clientHeight } = dom;
      const scale = screenConfig.height / screenConfig.width;
      const height = clientWidth * scale;
      const width = clientHeight / scale;
      return { width, height };
    };
    if (viewRef.current && gridRef.current) {
      setAutoSize({
        autoWidth: getSizeFromHtml(viewRef.current).width,
        autoHeight: getSizeFromHtml(viewRef.current).height,
        gridAutoWidth: getSizeFromHtml(gridRef.current).width,
        gridAutoHeight: getSizeFromHtml(gridRef.current).height,
      });
    }
  }, [screenConfig]);

  /**
   * 选区
   * @param rowIndex
   * @param columnIndex
   */
  const handleGridSelect = (rowIndex: number, columnIndex: number) => {
    if (activeId) {
      const newBlocks = { ...blocks };
      if (newBlocks[activeId].start) {
        newBlocks[activeId].end = { rowIndex, columnIndex };
        setActiveId(null);
      } else {
        newBlocks[activeId].start = { rowIndex, columnIndex };
      }
      setBlocks(newBlocks);
    }
  };

  /**
   * 获取选中的格子
   */
  const getSelectedAreas = () => {
    const selectGridAreas: GridAreaType[] = [];
    const blockResult = { ...blocks };
    Object.keys(blocks).forEach(id => {
      const config = blocks[id];
      const currentGridAreas: GridAreaType[] = [];
      if (config.start) {
        const startRowIndex = config.start.rowIndex;
        const startColumnIndex = config.start.columnIndex;
        currentGridAreas.push({
          gridArea: `a${startRowIndex}_${startColumnIndex}`,
          color: config.color,
        });
        // 从两个二维数组生成区间的点
        if (config.end) {
          const endRowIndex = config.end.rowIndex;
          const endColumnIndex = config.end.columnIndex;
          const rowDifferenceValue = endRowIndex - startRowIndex;
          const columnDifferenceValue = endColumnIndex - startColumnIndex;
          Array.from({ length: Math.abs(rowDifferenceValue) + 1 }, (_v, rowIndex) => {
            Array.from({ length: Math.abs(columnDifferenceValue) + 1 }, (_v, columnIndex) => {
              const addRowIndex = rowDifferenceValue > 0 ? rowIndex : -rowIndex;
              const addColumnIndex = columnDifferenceValue > 0 ? columnIndex : -columnIndex;
              currentGridAreas.push({
                gridArea: `a${startRowIndex + addRowIndex}_${startColumnIndex + addColumnIndex}`,
                color: config.color,
              });
            });
          });
        }
      }
      selectGridAreas.push(...currentGridAreas);
      blockResult[id].gridAreas = currentGridAreas;
    });
    return { selectGridAreas, blockResult };
  };

  const { selectGridAreas, blockResult } = getSelectedAreas();

  /**
   * 渲染像素格
   * @param rows 行的拆分 对应的是列
   * @param columns 列的拆分 对应的是行
   */
  const renderGrids = (rows: number, columns: number) => {
    const gridElements: JSX.Element[] = [];
    // grid配置使用
    const gridTemplateAreasArray: string[] = [];
    // 供view使用
    const baseTemplateAreasArray: string[] = [];
    Array.from({ length: columns }, (_vc, rowIndex) => {
      const rowElements: JSX.Element[] = [];
      const rowAreasArray: string[] = [];
      const onlySelectAreasArray: string[] = [];
      Array.from({ length: rows }, (_vr, columnIndex) => {
        const gridArea = `a${rowIndex}_${columnIndex}`;
        const selectIndex = selectGridAreas.findIndex(item => item.gridArea === gridArea);
        const isSelect = selectIndex !== -1;
        rowElements.push(
          <div
            onClick={() => handleGridSelect(rowIndex, columnIndex)}
            key={gridArea}
            className={styles.gridItem}
            style={{
              gridArea,
              backgroundColor: isSelect ? selectGridAreas[selectIndex].color : '#ecedf0',
            }}
          />,
        );
        rowAreasArray.push(gridArea);
        onlySelectAreasArray.push(isSelect ? gridArea : '.');
      });
      gridElements.push(...rowElements);
      gridTemplateAreasArray.push(`"${rowAreasArray.join(' ')}"`);
      baseTemplateAreasArray.push(`"${onlySelectAreasArray.join(' ')}"`);
    });
    return {
      gridElements,
      gridTemplateAreas: gridTemplateAreasArray.join('\n'),
      baseViewGridTemplateAreas: baseTemplateAreasArray.join('\n'),
    };
  };

  const { gridElements, gridTemplateAreas, baseViewGridTemplateAreas } = renderGrids(
    rowGridNum,
    columnGridNum,
  );

  /**
   * 获取最终的gridTemplateAreas配置
   */
  const getViewGridTemplateAreas = useCallback(() => {
    let viewGridTemplateAreas = baseViewGridTemplateAreas;
    Object.keys(blockResult).forEach(id => {
      blockResult[id].gridAreas.forEach((item: GridAreaType) => {
        viewGridTemplateAreas = viewGridTemplateAreas.replace(item.gridArea, `a${id}`);
      });
    });
    return viewGridTemplateAreas;
  }, [baseViewGridTemplateAreas, blockResult]);

  /**
   * 渲染最终预览的block
   */
  const renderViewBlock = () =>
    Object.keys(blockResult).map(id => (
      <div
        key={id}
        style={{
          gridArea: `a${id}`,
          backgroundColor: blockResult[id].color,
          color: '#fff',
        }}
      >
        {blockResult[id].title}
      </div>
    ));

  const getAdapterStyle = useCallback(() => {
    const style: CSSProperties = { width: '100%', height: autoSize.autoHeight };
    switch (screenConfig.adapter) {
      case 'px':
        style.width = `${screenConfig.width}px`;
        style.height = `${screenConfig.height}px`;
        break;
      case 'height':
        style.width = autoSize.autoWidth;
        style.height = '100%';
        break;
      case 'width':
        style.height = autoSize.autoHeight;
        style.width = '100%';
        break;
    }
    return style;
  }, [
    autoSize.autoHeight,
    autoSize.autoWidth,
    screenConfig.adapter,
    screenConfig.height,
    screenConfig.width,
  ]);

  useEffect(() => {
    const style = getAdapterStyle();
    const addPx = (size?: string | number) => (('' + size).includes('%') ? size : `${size}px`);
    const code = `
    <div
          style={{
            width: '${addPx(style.width)}',
            height: '${addPx(style.height)}',
            display: 'grid',
            gridTemplateColumns: 'repeat(${rowGridNum}, ${100 / rowGridNum}%)',
            gridTemplateRows: 'repeat(${columnGridNum}, ${100 / columnGridNum}%)',
            gridTemplateAreas: \`${getViewGridTemplateAreas()}\`,
            borderTop: '1px solid #333',
            borderLeft: '1px solid #333',
          }}
        >
          ${Object.keys(blockResult)
            .map(
              id =>
                `<div
                className={styles.blockItem}
                style={{ gridArea: 'a${id}' }}
              >
                ${blockResult[id].title}
              </div>`,
            )
            .join('\n')}
        </div>
    `;
    setCode(code);
  }, [blockResult, columnGridNum, getAdapterStyle, getViewGridTemplateAreas, rowGridNum]);

  /**
   * 渲染基本配置
   */
  const renderBaseConfigs = () =>
    baseConfigs.map(({ label, key }) => (
      <div key={key} style={{ padding: '0 8px' }}>
        <span>{label}: </span>
        <InputNumber
          disabled={!!activeId}
          value={screenConfig[key]}
          onChange={value => setScreenConfig({ ...screenConfig, [key]: +value! })}
        />
      </div>
    ));

  const removeBlock = (id: number | string) => {
    const newBlocks = { ...blocks };
    delete newBlocks[id];
    setBlocks(newBlocks);
  };

  const renderSelectedBocks = () =>
    Object.keys(blocks).map(id => (
      <Tag
        closable={!activeId}
        onClose={() => removeBlock(id)}
        key={id}
        color={blocks[id].color}
        className={styles.selectedTag}
      >
        {blocks[id].title}
      </Tag>
    ));

  const handleConfirm = () => {
    if (!code) {
      message.warning('缺少生成代码！');
      return;
    }
    onConfirm && onConfirm(code);
  };

  return (
    <Modal
      onCancel={onClose}
      onOk={handleConfirm}
      title="Grid布局生成器（快捷键“A”）"
      visible={visible}
      width="80%"
      maskClosable={false}
    >
      <div style={{ padding: 12, height: '60vh', overflowY: 'auto' }}>
        <Card title="BASE">
          <div style={{ display: 'flex' }}>{renderBaseConfigs()}</div>
          <div style={{ display: 'flex' }}>
            <div style={{ padding: '0 8px', marginTop: 12 }}>
              <span>适配: </span>
              <Select
                disabled={!!activeId}
                value={screenConfig.adapter}
                style={{ width: 120 }}
                onChange={(value: string) => setScreenConfig({ ...screenConfig, adapter: value })}
              >
                {adapters.map(({ label, value }) => (
                  <Select.Option key={value} value={value}>
                    {label}
                  </Select.Option>
                ))}
              </Select>
            </div>
          </div>
        </Card>
        <Card
          title="GRID"
          extra={
            <Button disabled={!!activeId} onClick={createBlock}>
              create block
            </Button>
          }
          style={{ marginTop: 12 }}
        >
          <div className={styles.blocks}>
            <span>CREATED BLOCKS: </span>
            <div className={styles.selectedBocks}>{renderSelectedBocks()}</div>
          </div>
          <div
            className={styles.dragContent}
            style={{ filter: activeId ? 'drop-shadow(2px 4px 6px #1990ff)' : 'none' }}
          >
            <div
              ref={gridRef}
              style={{
                width: '100%',
                height: autoSize.gridAutoHeight,
                gridTemplateColumns: `repeat(${rowGridNum}, ${100 / rowGridNum}%)`,
                gridTemplateRows: `repeat(${columnGridNum}, ${100 / columnGridNum}%)`,
                gridTemplateAreas,
              }}
              className={styles.grid}
            >
              {gridElements}
            </div>
          </div>
        </Card>
        <Card title="VIEW" style={{ marginTop: 12 }}>
          <div style={{ overflow: 'auto', height: 300 }}>
            <div
              ref={viewRef}
              style={{
                ...getAdapterStyle(),
                display: 'grid',
                gridTemplateColumns: `repeat(${rowGridNum}, ${100 / rowGridNum}%)`,
                gridTemplateRows: `repeat(${columnGridNum}, ${100 / columnGridNum}%)`,
                gridTemplateAreas: getViewGridTemplateAreas(),
              }}
            >
              {renderViewBlock()}
            </div>
          </div>
        </Card>
      </div>
    </Modal>
  );
};

export default GridGenerator;
