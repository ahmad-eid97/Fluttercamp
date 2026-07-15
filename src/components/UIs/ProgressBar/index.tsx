'use client';
import React from 'react';
import { AppProgressBar } from 'next-nprogress-bar';

function ProgressBar() {
  return (
    <AppProgressBar
      height="3px"
      color="#1671b2"
      options={{ showSpinner: false }}
      shallowRouting
    />
  );
};

export default ProgressBar;
