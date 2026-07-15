import React from 'react';
//= Styles
import cls from './skeleton.module.scss';

type Props = {
  width?: string;
  height?: string;
  rounded?: boolean;
  circle?: boolean;
  bordered?: boolean;
}

function LoadingSkeleton({ width, height, rounded, circle, bordered }: Props) {
  return (
    <span
      className={cls.skeleton_box}
      style={{
        height: height || '100px',
        width: width || '50%',
        borderRadius: circle ? '50%' : rounded ? '4px' : '0px',
        border: bordered ? '1px solid #ddd' : ''
      }}
    />
  )
}

export default LoadingSkeleton;