'use client';
import React, { useState, useEffect } from "react";
//= Components
// import { Tooltip } from "@mui/material";
//= Styles
import cls from "./captcha.module.scss";

function Captcha() {
  const [captcha, setCaptcha] = useState('');

  useEffect(() => {
    const cap = createCaptcha(6);
    setCaptcha(cap);
  }, []);

  function createCaptcha(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;

    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }

    return result;
  }

  function reloadCaptcha() {
    const cap = createCaptcha(6);
    setCaptcha(cap);
  }

  return (
    // <Tooltip title="Click to reload captcha">
    // </Tooltip>
    <div className={cls.captcha} id="original-captcha" onClick={reloadCaptcha}>
      {captcha.split('').map(letter => <span key={Math.floor(Math.random() * 100000)}>{letter}</span>)}
    </div>
  );
};

export default Captcha;
