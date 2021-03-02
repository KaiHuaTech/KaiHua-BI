export interface RcCommonProps {
  className?: string;
}

export interface GridItemLayout {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface GridItemPosition {
  left: number;
  top: number;
  width: number;
  height: number;
}

export type GridItemHandler = (i: number, { position: GridItemPosition }) => void;

export interface GridItemProps extends GridItemPosition {
  i: number;
  onDragStart: GridItemHandler;
  onDrag: GridItemHandler;
  onDragStop: GridItemHandler;
}
