import React, { useState, useRef, useEffect } from 'react';
import { css } from '@emotion/react';

import { GridItemLayout, RcCommonProps } from './interface';
import getGridBackGround from './getGridBackGround';

export interface GridLayoutProps extends RcCommonProps {
  layout: GridItemLayout[];
  margin: number;
  cols: number;
  rowHeight: number;
}

const GridLayout: React.FC<GridLayoutProps> = (props) => {
  const {
    className,
    margin,
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
    />
  );
};

export default GridLayout;
