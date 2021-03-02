import { SyntheticEvent } from 'react';

export interface RcCommonProps {
  className?: string;
}

export interface GridItemLayout {
  i: string; // 唯一标记
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

export type GridItemDragHandler = (i: number, { position }: {position: GridItemPosition}) => void;
export interface ResizeCallbackData {
  element: HTMLElement;
  size: {width: number; height: number};
}

export type GridItemResizeHandler = (i: number, { e, element, size }: ResizeCallbackData & {e: SyntheticEvent}) => void;
export interface GridItemProps extends GridItemPosition {
  i: number;
  onDragStart: GridItemDragHandler;
  onDrag: GridItemDragHandler;
  onDragStop: GridItemDragHandler;
  onResizeStart: GridItemResizeHandler;
  onResize: GridItemResizeHandler;
  onResizeStop: GridItemResizeHandler;
}
