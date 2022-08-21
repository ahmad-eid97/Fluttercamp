import cls from "./loading.module.scss";

const Loading = () => {
  return (
    <div className={cls.wrapper}>
      <div className={cls.buildingBlocks}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
