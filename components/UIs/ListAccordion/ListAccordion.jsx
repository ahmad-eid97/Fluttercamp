import { useState } from "react";

import Box from "@mui/material/Box";

import { useTranslation } from "react-i18next";

import cls from "./listAccordion.module.scss";
import { Typography } from "@mui/material";

const Accordion = ({ data }) => {
  // COMPONENT HOOKS
  const [showSub, setShowSub] = useState("");
  const { i18n } = useTranslation();

  // COMPONENT HANDLERS
  const showSubList = (e, list) => {
    if (showSub === list) {
      setShowSub("");
    } else {
      setShowSub(list);
    }

    let subMenu = e.target.nextElementSibling;

    if (subMenu) {
      let maxHeight = subMenu.scrollHeight;

      if (!subMenu.style.maxHeight) {
        subMenu.style.maxHeight = maxHeight + "px";
      } else {
        subMenu.style.maxHeight = null;
      }
    }
  };

  return (
    <Box
      className={`${cls.accordion_link} ${
        showSub === "products" ? cls.showSub : ""
      } ${cls[i18n.language]}`}
    >
      <Box
        className={`${cls.link} ${cls[i18n.language]}`}
        onClick={(e) => showSubList(e, "products")}
      >

      <Box className={cls.icon}>
        {/* <span>{format(data.date, 'H:m a')}</span> */}

        <i className={`${cls[i18n.language]} fa-solid fa-arrow-down-long`}></i>
      </Box>

        <Box className={`${cls.label} ${cls[i18n.language]}`}>

          <h6>{data.label}</h6>

          <p>{data.desc}</p>

          <span className={cls.steps}>{data.steps.length} خطوات</span>

        </Box>
      </Box>

      <Box className={`${cls.subMenu} ${cls[i18n.language]} subMenu`}>
        {showSub === "products" && (
          <Box
            className={cls.dropLayer}
            onClick={(e) => showSubList(e, "")}
          ></Box>
        )}

        <Box className={cls.accordionBody}>
            {data.steps.map((step, idx) => (
              <div key={idx} className={cls.step}>

                {step.type === 'video' ?
                  <i className="fa-solid fa-play"></i>
                :
                  <i className="fa-solid fa-question"></i>
                }

                <div>

                  <h6>{step.name}</h6>

                  {step.type === 'video' ?
                    <span>{step.time}</span>
                  :
                    <span>{step.number} اسئلة</span>
                  }

                </div>

              </div>
            ))}

          <Typography className={cls.time}>
            {/* <i className="fa-light fa-stopwatch"></i> Order placed on {format(data.data.date, 'EEEE')} {format(data.data.date, 'dd/MM/yyyy')} */}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Accordion;
