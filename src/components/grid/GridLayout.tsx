import React, { useState, useRef, useEffect, useCallback } from 'react';
import { css } from '@emotion/react';

import { GridItemLayout, RcCommonProps, GridItemHandler } from './interface';
import getGridBackGround from './getGridBackGround';
import GridItem from './GridItem.tsx';

export interface GridLayoutProps<T=any> extends RcCommonProps{
  items: T[];
  layout: GridItemLayout[]; // layout 和 items 的顺序要数组顺序要一致
  margin: number;
  cols: number;
  rowHeight: number;
}

const GridLayout: React.FC<GridLayoutProps> = (props) => {
  const {
    className,
    margin,
    items = [],
    layout,
    cols,
    rowHeight,
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
        a.x + a.w < b.x &&
        a.y < b.y + b.h &&
        b.y < a.y + a.h
      );
    },
    [],
  );

  const handleDrag: GridItemHandler = (i, { position }) => {
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
    setPlaceholder(targetLayout);
  };

  const handleDragStop: GridItemHandler = ((i, { position }) => {
    //
    setPlaceholder(null);
  });

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
          key={l}
          onDragStart={handleDragStart}
          onDrag={handleDrag}
          onDragStop={handleDragStop}
          {...getItemLayout(layout[l])}
        />);
      })}
      {
        placeholderLayout && (
          <div
            style={getItemLayout(placeholderLayout)}
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
