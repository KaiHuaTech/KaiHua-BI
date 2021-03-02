import React, { useState, useRef } from 'react';
import { DraggableCore, DraggableData } from 'react-draggable';
import classnames from 'classnames';
import { GridItemPosition, GridItemProps } from './interface';


const GridItem: React.FC<GridItemProps> = (props) => {
  const {
    left,
    top,
    width,
    height,
  } = props;

  const [dragging, setDragging] = useState<GridItemPosition | null>(null);

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

  const style = {
    position: 'absolute',
    left: left + (dragging?.left || 0),
    top: top + (dragging?.top || 0),
    width,
    height,
    background: 'yellowgreen',
    opacity: 0.5,
  };

  return (
    <DraggableCore
      cancel=".react-resizable-handle, .drag-disabled"
      onStart={onDragHandler('onDragStart')}
      onDrag={onDragHandler('onDrag')}
      onStop={onDragHandler('onDragStop')}
    >
      <div
        className={classnames({
          dragging: !!dragging,
        })}
        style={style}
      >
        item
      </div>
    </DraggableCore>
  );
};

export default GridItem;
