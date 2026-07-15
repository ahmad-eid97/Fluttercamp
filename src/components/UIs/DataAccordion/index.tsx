'use client';
import { useState } from "react";
//= Components
import { Icon } from "@iconify/react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
//= I18n
import useDictionary from '@/dictionaries/clientDictionary';
//= Styles
import cls from "./dataAccordion.module.scss";

type Props = {
  data: any;
}

function Accordion({ data }: Props) {
  const [showSub, setShowSub] = useState("");
  const { translations, locale } = useDictionary();

  // COMPONENT HANDLERS
  const showSubList = (e: React.MouseEvent<HTMLDivElement>, list: any) => {
    if (showSub === list) {
      setShowSub("");
    } else {
      setShowSub(list);
    }

    // @ts-ignore
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
    <Box className={`${cls.accordion_link} ${showSub === "products" ? cls.showSub : ""} ${cls[locale]}`}>
      <Box className={`${cls.link} ${cls[locale]}`} onClick={(e) => showSubList(e, "products")}>
        <Box className={`${cls.label} ${cls[locale]}`}>
          <Icon icon="solar:question-circle-bold-duotone" className={cls.labelIcon} />
          {data.label}
        </Box>
        <Icon icon="solar:alt-arrow-down-linear" className={cls.chevron} />
      </Box>
      <Box className={`${cls.subMenu} ${cls[locale]} subMenu`}>
        {showSub === "products" && (
          <Box className={cls.dropLayer} onClick={(e) => showSubList(e, "")}></Box>
        )}
        <Box className={cls.accordionBody}>
          <Typography>
            <span>
              <Icon icon="mingcute:question-line" className="me-2" />
            </span>
            {data.description}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Accordion;
