import cls from './videoTextTab.module.scss';

const tanscripts = [
  {
    text: 'Hi, iam treasure',
    time: '0:05'
  },
  {
    text: 'Hi, iam treasure',
    time: '0:05'
  },
  {
    text: 'Hi, iam treasure',
    time: '0:05'
  },
  {
    text: 'Hi, iam treasure',
    time: '0:05'
  },
  {
    text: 'Hi, iam treasure',
    time: '0:05'
  },
  {
    text: 'Hi, iam treasure',
    time: '0:05'
  },
  {
    text: 'Hi, iam treasure',
    time: '0:05'
  },
  {
    text: 'Hi, iam treasure',
    time: '0:05'
  },
  {
    text: 'Hi, iam treasure',
    time: '0:05'
  },
  {
    text: 'Hi, iam treasure',
    time: '0:05'
  },
  {
    text: 'Hi, iam treasure',
    time: '0:05'
  },
  {
    text: 'Hi, iam treasure',
    time: '0:05'
  },
]

const VideoTextTab = () => {
  return (
    <div className={cls.videoTextTab}>
      {tanscripts.map((tanscript, idx) => (
        <div key={idx} className={cls.single}>
          <p>{tanscript.text}</p>
          <span>{tanscript.time}</span>
        </div>
      ))}
    </div>
  )
}

export default VideoTextTab