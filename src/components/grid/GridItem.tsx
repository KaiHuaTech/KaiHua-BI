import React, { useState, useRef, SyntheticEvent } from 'react';
import { DraggableCore, DraggableData } from 'react-draggable';
import { Resizable } from 'react-resizable';
import { css } from '@emotion/react';
import classnames from 'classnames';
import { GridItemPosition, GridItemProps, ResizeCallbackData } from './interface';


const GridItem: React.FC<GridItemProps> = (props) => {
  const {
    left,
    top,
    width,
    height,
    minSize,
  } = props;

  const [dragging, setDragging] = useState<GridItemPosition | null>(null);
  const [resizing, setResizing] = useState(null);

  const dragStartRef = useRef<{
    dragStartPosition: GridItemPosition;
    dragStartScrollTop: number;
  }>({
    dragStartPosition: { left: 0, top: 0 },
    dragStartScrollTop: 0,
  });

  /* todo: 性能优化 */
  const onDragHandler = (handlerName: string) => {
    return (e: DragEvent, { node, x, y }: DraggableData) => {
      // react-draggle seems to return undefined/NaN occasionally, which breaks things
      if (isNaN(x) || isNaN(y)) {
        return;
      }

      let { dragStartPosition, dragStartScrollTop } = dragStartRef.current;
      if (handlerName === 'onDragStart') {
        dragStartPosition = { left: x, top: y };
        dragStartScrollTop = document.body.scrollTop;
        dragStartRef.current = {
          dragStartPosition,
          dragStartScrollTop,
        };
      }

      // track vertical scroll. we don't need horizontal  allow horizontal scrolling
      const scrollTopDelta = document.body.scrollTop - dragStartScrollTop;
      // compute new position
      const pos = {
        left: x - dragStartPosition.left,
        top: y - dragStartPosition.top + scrollTopDelta,
      };

      if (handlerName === 'onDragStop') {
        setDragging(null);
      } else {
        setDragging(pos);
      }

      props[handlerName] && props[handlerName](props.i, { e, node, position: pos });
    };
  };

  const onResizeHandler = (handlerName: string) => {
    return (e: SyntheticEvent, { element, size }: ResizeCallbackData) => {
      if (handlerName === 'onResize') {
        setResizing(size);
      }
      if (handlerName === 'onResizeStop') {
        setResizing(null);
      }

      props[handlerName](props.i, { e, element, size });
    };
  };

  const style = {
    position: 'absolute',
    left: left + (dragging?.left || 0),
    top: top + (dragging?.top || 0),
    width: resizing ? Math.max(resizing.width, minSize.width) : width,
    height: resizing ? Math.max(resizing.height, minSize.height) : height,
    background: 'gray',
    opacity: 0.5,
    overflow: 'hidden', // 解决子元素内部的问题
  };

  return (
    <DraggableCore
      cancel=".react-resizable-handle, .drag-disabled"
      onStart={onDragHandler('onDragStart')}
      onDrag={onDragHandler('onDrag')}
      onStop={onDragHandler('onDragStop')}
    >
      <Resizable
        width={style.width}
        height={style.height}
        onResizeStart={onResizeHandler('onResizeStart')}
        onResize={onResizeHandler('onResize')}
        onResizeStop={onResizeHandler('onResizeStop')}
        css={css`
          .react-resizable-handle {
            position: absolute;
            width: 20px;
            height: 20px;
            bottom: 0;
            right: 0;
            cursor: nwse-resize;
            z-index: 1; /* ensure the handle is above the card contents */
          }
          .react-resizable-handle:after {
            content: "";
            position: absolute;
            width: 8px;
            height: 8px;
            bottom: 5px;
            right: 5px;
            border-bottom: 2px solid red;
            border-right: 2px solid red;
            border-bottom-right-radius: 2px;
            transition: opacity 0.2s;
            opacity: 0.01;
          }
          .react-resizable-handle:hover:after {
            opacity: 1
          }
        `}
      >
        <div
          className={classnames({
            dragging: !!dragging,
            resizing: !!resizing,
          })}
          style={style}
        >
          i
        </div>
      </Resizable>
    </DraggableCore>
  );
};

export default GridItem;
