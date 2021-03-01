import React from 'react';

export interface GridItemProps {
  left: number;
  top: number;
  width: number;
  height: number;
}

const GridItem: React.FC<GridItemProps> = (props) => {
  const {
    left,
    top,
    width,
    height,
  } = props;

  return (
    <div
      style={{
        position: 'absolute',
        left,
        top,
        width,
        height,
      }}
    >
      item
    </div>
  );
};

export default GridItem;
