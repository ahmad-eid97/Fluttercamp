import cls from './trailer.module.scss';

const Trailer = () => {
  return (
    <div className={cls.trailer}>
      <div className={cls.trailer__head}>
        <p><i className="fa-solid fa-arrow-left"></i> Techdegree Home </p>
        <div className={cls.trailer__head_time}>
          <span>3 ساعات</span>

          <div>
            <i className="fa-regular fa-circle-small"></i>
            <i className="fa-regular fa-circle-small"></i>
            <i className="fa-regular fa-circle-small"></i>
            <i className="fa-solid fa-book"></i>
          </div>
        </div>
      </div>

      <div className={cls.trailer__videoArea}>
        <div className={cls.trailer__videoArea_actions}>
          <div>
            <h1>Introduction To HTML And CSS</h1>
            <p>134-Minute HTML Course</p>
          </div>
          <div>
            <button><i className="fa-solid fa-play"></i> مشاهدة الإعلان </button>
            <button>بدأ الكورس <i className="fa-regular fa-arrow-left"></i></button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Trailer