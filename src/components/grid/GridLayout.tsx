import React, { useState, useRef, useEffect, useCallback } from 'react';
import { css } from '@emotion/react';

import { GridItemLayout, RcCommonProps } from './interface';
import getGridBackGround from './getGridBackGround';
import GridItem from './GridItem';

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
  const bottom = Math.max(...layout.map((l) => l.y + l.h));

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
        return <GridItem item={item} {...getItemLayout(layout[l])} />;
      })}
    </div>
  );
};

export default GridLayout;
