"use client";
import { useEffect } from 'react';
//= Utils
import imageLoader from '@/utils/imageLoader';

export default function ImageLoading() {
  useEffect(() => {
    imageLoader();
  }, []);

  return (<></>);
}