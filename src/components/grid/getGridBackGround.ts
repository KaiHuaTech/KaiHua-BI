export default (cellWidth: number, cellHeight: number, cols: number, margin: number) => {
  const colsArr = Array.from({ length: cols }).map((_v, i) => i);
  const storkeW = 1;
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' width='${(cellWidth + margin) *
      cols}' height='${cellHeight + margin}'>${
      colsArr.map(
        (i) =>
          `<rect stroke='gray' stroke-width='${storkeW}' fill='none' x='${Math.round(
            i * (cellWidth + margin) + margin / 2 + storkeW / 2,
          )}' y='${margin / 2 + storkeW / 2}' width='${cellWidth - storkeW}' height='${cellHeight - storkeW}'/>`,
      )
        .join('')}</svg>`;

  return `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`;
};
