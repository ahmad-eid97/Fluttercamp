import { useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
// STYLES FILES
import cls from "./choose.module.scss";

const Choose = ({ results, choose, value }) => {
  const [open, setOpen] = useState(false);

  // SELECT CHOOSE OPTION HANDLER
  const selectChoose = (result) => {
    choose(result);
    setOpen(false);
  };

  return (
    <>
      {open && (
        <div className={cls.overlay} onClick={() => setOpen(false)}></div>
      )}

      <Box className={cls.field}>

        <button onClick={() => setOpen(true)}>{value} <i className="fa-solid fa-angle-down"></i></button>

        <Box className={`${cls.field__results} ${open ? cls.active : ""}`}>
          <Box className={cls.field__results_result}>
            {results.map((result) => (
              <Box
                className={cls.resultInside}
                onClick={() => selectChoose(result)}
                key={result.option}
              >
                <Typography key={result}>{result}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Choose;
