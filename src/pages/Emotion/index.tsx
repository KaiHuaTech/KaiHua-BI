import React from 'react';

import { css } from '@emotion/react';


export default function EmotionPage() {
  const base = css`
    color: hotpink;
  `;
  return (
    <div
      css={css`
        ${base};
        background-color: #eee;
      `}
    >
      This is hotpink.
      <>
        <span>Fragement1</span>
        <span>Fragement2</span>
      </>
    </div>
  );
}
