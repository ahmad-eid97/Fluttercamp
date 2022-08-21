import Tooltip from '@mui/material/Tooltip';

import cls from './preview.module.scss';

const Preview = () => {
  return (
    <div className={cls.preview}>
      <div className={cls.preview__head}>
        <p><i className="fa-solid fa-arrow-left"></i> Introduction To HTML And CSS </p>
        <div className={cls.preview__head_steps}>
          <div>
            <Tooltip title="Test: Changing the Look of a Web Page" placement="top">
              <i className="fa-regular fa-circle-play"></i>
            </Tooltip>
          </div>
          <div>
            <Tooltip title="Review: Getting Familiar with HTML and CSS" placement="top">
              <i className="fa-regular fa-circle-play"></i>
            </Tooltip>
          </div>
          <div>
            <Tooltip title="HTML,CSS, and Web Development" placement="top">
              <i className="fa-regular fa-circle-play"></i>
            </Tooltip>
          </div>
          <div>
            <Tooltip title="Building Web Pages with HTML and CSS" placement="top">
              <i className="fa-regular fa-circle-play"></i>
            </Tooltip>
          </div>
          <div>
            <Tooltip title="Video Closure" placement="top">
              <i className="fa-regular fa-circle-play"></i>
            </Tooltip>
          </div>
        </div>
      </div>

      <div className={cls.preview__videoArea}>
        <div className={cls.preview__videoArea_actions}>
          <div>
            <h1>Introduction To HTML And CSS</h1>
            <p>134-Minute HTML Course</p>
          </div>
          <div>
            <button><i className="fa-regular fa-arrow-rotate-left"></i> بدأ الفيديو</button>
            <button><i className="fa-solid fa-play"></i> متابعة المشاهدة </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Preview