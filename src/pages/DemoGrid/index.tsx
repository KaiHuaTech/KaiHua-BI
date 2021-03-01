import React from 'react';

import GridLayout from '@/components/grid/GridLayout';

export const GRID_COLS = 18;
export const GRID_ASPECT_RATIO = 4 / 3;
export const GRID_MARGIN = 6;

export default function DemoGrid() {
  /*
  *
  */
  const layout = [
    {
      x: 0,
      y: 0,
      w: 1,
      h: 1,
    },
    {
      x: 7,
      y: 0,
      w: 3,
      h: 3,
    },
  ];

  const cards = [
    {
      id: 1,
      content: '2',
    },
    {
      id: 2,
      content: '2',
    },
  ];

  const width = 500;
  const rowHeight = Math.floor(width / GRID_COLS / GRID_ASPECT_RATIO);

  return (
    <div style={{
      width: `${width}px`,
    }}
    >
      <h1>GridLayout</h1>
      <GridLayout
        className="hello grid"
        layout={layout}
        margin={GRID_MARGIN}
        cols={GRID_COLS}
        rowHeight={rowHeight}
        items={cards}
      />
    </div>
  );
}
