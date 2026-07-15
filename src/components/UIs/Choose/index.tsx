'use client';
import { useState } from "react";
//= Components
import { Icon } from '@iconify/react';
// Styles
import cls from "./choose.module.scss";

type Props = {
  results: string[];
  choose: (result: string) => void;
  value: string;
}

const Choose = ({ results, choose, value }: Props) => {
  const [open, setOpen] = useState(false);

  // SELECT CHOOSE OPTION HANDLER
  const selectChoose = (result: string) => {
    choose(result);
    setOpen(false);
  };

  return (
    <>
      {open && (
        <div className={cls.overlay} onClick={() => setOpen(false)}></div>
      )}
      <div className={cls.field}>
        <button onClick={() => setOpen(true)}>{value} <Icon icon="ph:caret-down-bold" /></button>
        <div className={`${cls.field__results} ${open ? cls.active : ""}`}>
          <div className={cls.field__results_result}>
            {results.map((result) => (
              <div
                className={cls.resultInside}
                onClick={() => selectChoose(result)}
                key={result}
              >
                <p key={result}>{result}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Choose;
