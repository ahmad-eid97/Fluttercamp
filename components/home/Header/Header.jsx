/* eslint-disable @next/next/no-img-element */
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import cls from "./header.module.scss";

const Header = () => {
  return (
    <div className={cls.header}>
      <Grid container spacing={3} justifyContent="center">
        <Grid item sm={6} md={6}>
          <div className={cls.textSide}>
            <h1>Transform</h1>
            <h1>Your Life Through</h1>
            <h1>Education</h1>
            <img src="/assets/imgs/home/slider-text.png" alt="textImage" />
          </div>
        </Grid>

        <Grid item sm={6} md={6}>
          <div className={cls.sideImg}>
            <img src="/assets/imgs/home/slide-img.png" alt="headerImg" />
            <img
              src="/assets/imgs/home/slider-img-after.png"
              alt="headerImg"
              className={cls.secondImage}
            />
          </div>
        </Grid>

        <Grid item sm={10} md={8} lg={6}>
          <div className={cls.smallTextSide}>
            <div>
              <h1>Full Stack</h1>
            </div>
            <div>
              <h1>Back End</h1>
            </div>
            <div>
              <h1>Front End</h1>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Header;
