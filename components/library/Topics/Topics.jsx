/* eslint-disable @next/next/no-img-element */
import Grid from '@mui/material/Grid';

import cls from './topics.module.scss';

const topics = [
  {
    img: 'https://topic-images.teamtreehouse.com/topics/topics-icons_data-analysis.png',
    name: 'Data Analysis'
  },
  {
    img: 'https://topic-images.teamtreehouse.com/topics/topics-icons_css.png',
    name: 'CSS'
  },
  {
    img: 'https://topic-images.teamtreehouse.com/topics/topics-icons_computer-science.png',
    name: 'Computer Science'
  },
  {
    img: 'https://topic-images.teamtreehouse.com/topics/topics-icons_csharp.png',
    name: 'C#'
  },
  {
    img: 'https://topic-images.teamtreehouse.com/topics/topics-icons_diglit.png',
    name: 'Digital Literacy'
  },
  {
    img: 'https://topic-images.teamtreehouse.com/topics/topics-icons_devtools.png',
    name: 'Development Tools'
  },
  {
    img: 'https://topic-images.teamtreehouse.com/topics/topics-icons_design2.png',
    name: 'Design'
  },
  {
    img: 'https://topic-images.teamtreehouse.com/topics/topics-icons_databases.png',
    name: 'Databases'
  },
  {
    img: 'https://topic-images.teamtreehouse.com/topics/topics-icons_java.png',
    name: 'Java'
  },
  {
    img: 'https://topic-images.teamtreehouse.com/topics/topics-icons_html.png',
    name: 'HTML'
  },
  {
    img: 'https://topic-images.teamtreehouse.com/topics/topics-icons_go.png',
    name: 'Go'
  },
  {
    img: 'https://topic-images.teamtreehouse.com/topics/topic-edi.png',
    name: 'EDI'
  },
  {
    img: 'https://topic-images.teamtreehouse.com/topics/topics-icons_php.png',
    name: 'PHP'
  },
  {
    img: 'https://topic-images.teamtreehouse.com/topics/topics-icons_machine-learning.png',
    name: 'Machine Learning'
  },
  {
    img: 'https://topic-images.teamtreehouse.com/topics/topics-icons_learning-resources.png',
    name: 'Learning Resources'
  },
  {
    img: 'https://topic-images.teamtreehouse.com/topics/topics-icons_javascript.png',
    name: 'Javascript'
  },
  {
    img: 'https://topic-images.teamtreehouse.com/topics/topics-icons_security.png',
    name: 'Security'
  },
  {
    img: 'https://topic-images.teamtreehouse.com/topics/topics-icons_ruby.png',
    name: 'Ruby'
  },
  {
    img: 'https://topic-images.teamtreehouse.com/topics/topics-icons_quality-assurance.png',
    name: 'Quality Assurance'
  },
  {
    img: 'https://topic-images.teamtreehouse.com/topics/topics-icons_python.png',
    name: 'Python'
  },
]

const Topics = () => {
  return (
    <div className={cls.topics}>
      <div className={cls.topics__header}>
        <h5>المواضيع</h5>
        <p>تصفح المحتوى حسب الموضوعات التي تهمك أكثر.</p>
      </div>

      <div className={cls.topics__topics}>
        <Grid container spacing={2}>
          {topics.map((topic, idx) => (
            <Grid key={idx} xs={6} item sm={4} md={3}>
              <div className={cls.topics__topics_topic}>
                <span className={cls.overlay}></span>
                <img src={topic.img} alt="topicImage" />
                <p>{topic.name}</p>
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  )
}

export default Topics