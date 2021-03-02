import React, { useState, useRef, useEffect, useCallback } from 'react';
import { css } from '@emotion/react';

import { GridItemLayout, GridItemDragHandler, GridItemResizeHandler, GridLayoutProps } from './interface';
import getGridBackGround from './getGridBackGround';
import GridItem from './GridItem.tsx';

const GridLayout: React.FC<GridLayoutProps> = (props) => {
  const {
    className,
    margin,
    items = [],
    layout,
    cols,
    rowHeight,
    itemRender,
  } = props;
  const domRef = useRef<React.RefObject<HTMLDivElement>>(null);

  const [width, setWidth] = useState(0);
  const [placeholderLayout, setPlaceholder] = useState<GridItemLayout|null>(null);

  const bottom = Math.max(...[...layout, placeholderLayout].filter(Boolean).map((l) => l.y + l.h));

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (domRef.current) {
      const newWidth = domRef.current.parentNode.offsetWidth;
      if (newWidth !== width) {
        setWidth(newWidth);
      }
    }
  });

  // 单个 grid
  const cellWidth = width / cols - margin;
  const background = getGridBackGround(cellWidth, rowHeight, cols, margin);

  const getItemLayout = useCallback(
    (l) => {
      const {
        x,
        y,
        w,
        h,
      } = l;

      return {
        left: Math.round(x * (cellWidth + margin) + margin / 2),
        top: Math.round(y * (rowHeight + margin) + margin / 2),
        width: w * (cellWidth + margin) - margin,
        height: h * (rowHeight + margin) - margin,
      };
    },
    [cellWidth, rowHeight, margin],
  );

  const handleDragStart = () => {

  };

  const layoutsOverlap = useCallback(
    (a: GridItemLayout, b: GridItemLayout) => {
      return (
        a.x < b.x + b.w &&
        a.x + a.w > b.x &&
        a.y < b.y + b.h &&
        a.y + a.h > b.y
      );
    },
    [],
  );

  const handleDrag: GridItemDragHandler = (i, { position }) => {
    const originalLayout = layout[i];
    const pos = getItemLayout(originalLayout);
    pos.left += position.left;
    pos.top += position.top;

    const maxX = cols - originalLayout.w;
    const maxY = Infinity;

    const targetLayout = {
      w: originalLayout.w,
      h: originalLayout.h,
      x: Math.min(maxX, Math.max(0, Math.round(pos.left / (cellWidth + margin)))),
      y: Math.min(maxY, Math.max(0, Math.round(pos.top / (rowHeight + margin)))),
    };

    let proposedLayout = targetLayout;

    for (const otherLayout of layout) {
      if (
        originalLayout !== otherLayout &&
        layoutsOverlap(proposedLayout, otherLayout) // 冲突比较
      ) {
        proposedLayout = originalLayout;
      }
    }
    setPlaceholder({ ...proposedLayout, i: 'placeholder' });
  };

  const handleDragStop: GridItemDragHandler = ((i, { position }) => {
    setPlaceholder(null);
    // todo
    // this.props.onLayoutChange(newLayout);
  });

  const handleResize: GridItemResizeHandler = (i, { size }) => {
    const originalLayout = layout[i];

    const minW = originalLayout.minSize?.width || 1;
    const minH = originalLayout.minSize?.height || 1;
    const maxW = cols - originalLayout.x;
    const maxH = Infinity;
    // console.log('maxW', maxW);
    const targetLayout = {
      w: Math.min(
        maxW,
        Math.max(minW, Math.round(size.width / (cellWidth + margin))),
      ),
      h: Math.min(
        maxH,
        Math.max(minH, Math.round(size.height / (rowHeight + margin))),
      ),
      x: originalLayout.x,
      y: originalLayout.y,
    };

    let proposedLayout = targetLayout;
    for (const otherLayout of layout) {
      if (
        originalLayout !== otherLayout &&
        layoutsOverlap(proposedLayout, otherLayout)
      ) {
        proposedLayout = placeholderLayout || originalLayout;
      }
    }
    // console.log('resize', proposedLayout);
    setPlaceholder({ ...proposedLayout, i: 'placeholder' });
  };

  const handleResizeStart: GridItemResizeHandler = (i, { size }) => {
    handleResize(i, { size });
  };


  const handleResizeStop: GridItemResizeHandler = (i, { size }) => {
    // const { x, y, w, h } = placeholderLayout;
    // const newLayout = layout.map((l) =>
    //   (l.i === i ? { ...l, x, y, w, h } : l));
    setPlaceholder(null);
    // this.props.onLayoutChange(newLayout));
  };

  return (
    <div
      ref={domRef}
      className={className}
      css={css`
        position: relative;
        width: ${width}px;
        border: 1px solid gray;
        height: ${(rowHeight + margin) * bottom}px;
        background-image: ${background}
      `}
    >
      {items.map((item, l) => {
        return (<GridItem
          item={item}
          i={l}
          key={layout[l].i}
          {...getItemLayout(layout[l])}
          onDragStart={handleDragStart}
          onDrag={handleDrag}
          onDragStop={handleDragStop}
          onResizeStart={handleResizeStart}
          onResize={handleResize}
          onResizeStop={handleResizeStop}
          itemRender={itemRender}
          minSize={{
            width: cellWidth,
            height: rowHeight,
          }}
        />);
      })}
      {
        placeholderLayout && (
          <div
            style={getItemLayout(placeholderLayout)}
            className="placeholder"
            css={css`
              position: absolute;
              background-color: pink;
              opacity: .5
            `}
          />
        )
      }
    </div>
  );
};


export default GridLayout;
