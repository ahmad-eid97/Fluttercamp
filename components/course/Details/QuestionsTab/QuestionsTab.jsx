/* eslint-disable @next/next/no-img-element */
import Grid from '@mui/material/Grid';

import cls from './questionsTab.module.scss';

const questions = [
  {
    name: 'ahmad eid',
    on: 'Dec 14',
    qs: "Why Don't My Edits In The WORKSPACE Show Up On The Example Website They Provide?",
    specs: ['HTML', 'Introduction to HTML and CSS', 'Getting familiar with HTML and CSS'],
    answers: 2
  },
  {
    name: 'ahmad eid',
    on: 'Dec 14',
    qs: "Why Don't My Edits In The WORKSPACE Show Up On The Example Website They Provide?",
    specs: ['HTML', 'Introduction to HTML and CSS', 'Getting familiar with HTML and CSS'],
    answers: 2
  },
  {
    name: 'ahmad eid',
    on: 'Dec 14',
    qs: "Why Don't My Edits In The WORKSPACE Show Up On The Example Website They Provide?",
    specs: ['HTML', 'Introduction to HTML and CSS', 'Getting familiar with HTML and CSS'],
    answers: 2
  },
  {
    name: 'ahmad eid',
    on: 'Dec 14',
    qs: "Why Don't My Edits In The WORKSPACE Show Up On The Example Website They Provide?",
    specs: ['HTML', 'Introduction to HTML and CSS', 'Getting familiar with HTML and CSS'],
    answers: 2
  },
  {
    name: 'ahmad eid',
    on: 'Dec 14',
    qs: "Why Don't My Edits In The WORKSPACE Show Up On The Example Website They Provide?",
    specs: ['HTML', 'Introduction to HTML and CSS', 'Getting familiar with HTML and CSS'],
    answers: 2
  },
  {
    name: 'ahmad eid',
    on: 'Dec 14',
    qs: "Why Don't My Edits In The WORKSPACE Show Up On The Example Website They Provide?",
    specs: ['HTML', 'Introduction to HTML and CSS', 'Getting familiar with HTML and CSS'],
    answers: 2
  },
  {
    name: 'ahmad eid',
    on: 'Dec 14',
    qs: "Why Don't My Edits In The WORKSPACE Show Up On The Example Website They Provide?",
    specs: ['HTML', 'Introduction to HTML and CSS', 'Getting familiar with HTML and CSS'],
    answers: 2
  },
]

const QuestionsTab = () => {
  return (
    <div className={cls.questions}>
      <Grid container spacing={3}>

        <Grid item md={8}>

          {questions.map((question, idx) => (

            <div key={idx} className={cls.questions__question}>

              <div className={cls.questionSide}>

                <img src="/assets/imgs/techdegree/teacher.jpg" alt="user" />

                <div>
                  <h6>{question.qs}</h6>
                  <p>Posted on {question.on} by {question.name}</p>
                  <div className={cls.specs}>
                    {question.specs.map((spec, indx) => (
                      <span key={indx}>{spec}</span>
                    ))}
                  </div>
                </div>

              </div>

              <div className={cls.answers}>
                <h5><i className="fa-solid fa-check"></i> {question.answers}</h5>
                <h5>إجابات</h5>
              </div>

            </div>

          ))}

          <div className={cls.btn}>
            <button>عرض حميع الاسئلة</button>
          </div>

        </Grid>

        <Grid item md={4}>

          <div className={cls.help}>

            <p>هل لديك أسئلة حول هذا الفيديو؟ ابدأ مناقشة مع المجتمع وموظفي Treehouse.</p>

            <button>المساعدة</button>

          </div>
          
        </Grid>

      </Grid>
    </div>
  )
}

export default QuestionsTab