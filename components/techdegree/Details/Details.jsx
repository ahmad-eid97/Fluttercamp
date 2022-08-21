import ListAccordion from '../../UIs/ListAccordion/ListAccordion';

import cls from './details.module.scss';

const data = [
  {
    label: 'HTML: The Structural Foundation Of Web Pages And Applications',
    desc: 'HTML is a series of tags that tells web browsers how to render, or display, a web page. You will wrap the content in these tags to describe the elements on the page and how they should be structured. Learn some useful and commonly used HTML tags and how to use them to start building your web pages.',
    steps: [
      {
        name: 'Welcome to HTML and CSS',
        time: '4.28',
        type: 'video'
      },
      {
        name: 'Building Web Pages with HTML and CSS',
        time: '4.28',
        type: 'video'
      },
      {
        name: 'Review: Getting Familiar with HTML and CSS',
        number: '5',
        type: 'practice'
      },
    ]
  },
  {
    label: 'HTML: The Structural Foundation Of Web Pages And Applications',
    desc: 'HTML is a series of tags that tells web browsers how to render, or display, a web page. You will wrap the content in these tags to describe the elements on the page and how they should be structured. Learn some useful and commonly used HTML tags and how to use them to start building your web pages.',
    steps: [
      {
        name: 'Welcome to HTML and CSS',
        time: '4.28',
        type: 'video'
      },
      {
        name: 'Building Web Pages with HTML and CSS',
        time: '4.28',
        type: 'video'
      },
      {
        name: 'Review: Getting Familiar with HTML and CSS',
        number: '5',
        type: 'practice'
      },
    ]
  },
  {
    label: 'HTML: The Structural Foundation Of Web Pages And Applications',
    desc: 'HTML is a series of tags that tells web browsers how to render, or display, a web page. You will wrap the content in these tags to describe the elements on the page and how they should be structured. Learn some useful and commonly used HTML tags and how to use them to start building your web pages.',
    steps: [
      {
        name: 'Welcome to HTML and CSS',
        time: '4.28',
        type: 'video'
      },
      {
        name: 'Building Web Pages with HTML and CSS',
        time: '4.28',
        type: 'video'
      },
      {
        name: 'Review: Getting Familiar with HTML and CSS',
        number: '5',
        type: 'practice'
      },
    ]
  },
  {
    label: 'HTML: The Structural Foundation Of Web Pages And Applications',
    desc: 'HTML is a series of tags that tells web browsers how to render, or display, a web page. You will wrap the content in these tags to describe the elements on the page and how they should be structured. Learn some useful and commonly used HTML tags and how to use them to start building your web pages.',
    steps: [
      {
        name: 'Welcome to HTML and CSS',
        time: '4.28',
        type: 'video'
      },
      {
        name: 'Building Web Pages with HTML and CSS',
        time: '4.28',
        type: 'video'
      },
      {
        name: 'Review: Getting Familiar with HTML and CSS',
        number: '5',
        type: 'practice'
      },
    ]
  },
  {
    label: 'HTML: The Structural Foundation Of Web Pages And Applications',
    desc: 'HTML is a series of tags that tells web browsers how to render, or display, a web page. You will wrap the content in these tags to describe the elements on the page and how they should be structured. Learn some useful and commonly used HTML tags and how to use them to start building your web pages.',
    steps: [
      {
        name: 'Welcome to HTML and CSS',
        time: '4.28',
        type: 'video'
      },
      {
        name: 'Building Web Pages with HTML and CSS',
        time: '4.28',
        type: 'video'
      },
      {
        name: 'Review: Getting Familiar with HTML and CSS',
        number: '5',
        type: 'practice'
      },
    ]
  },
]

const Details = () => {
  return (
    <div className={cls.details}>
      <div className={cls.details__head}>
        <span><i className="fa-solid fa-bookmark"></i></span>
        <span>Beginner</span>
        <span>HTML</span>
      </div>

      <div className={cls.details__about}>

        <h3>ماذا عن هذا الكورس</h3>

        <p>ابدأ في إنشاء صفحات ويب باستخدام HTML و CSS ، وهما اللبنات الأساسية لتطوير الويب. HTML ، أو لغة ترميز النص التشعبي ، هي مجموعة قياسية من العلامات التي ستستخدمها لإخبار متصفح الويب بكيفية تنظيم محتوى صفحات الويب والتطبيقات الخاصة بك. استخدم CSS ، أو Cascading Style Sheets ، لتحديد علامات HTML وإخبار المتصفح بالشكل الذي يجب أن يبدو عليه المحتوى الخاص بك. سواء كنت تقوم بالبرمجة من أجل المتعة أو تخطط لبدء حياتك المهنية في تطوير الويب ، فإن تعلم HTML و CSS يعد مكانًا رائعًا للبدء.</p>

        <h4>ماذا سوف تتعلم ؟</h4>

        <p><i className="fa-solid fa-check"></i> Define HTML and CSS </p>
        <p><i className="fa-solid fa-check"></i> Add and change HTML tags </p>
        <p><i className="fa-solid fa-check"></i> Modify CSS attributes </p>
        <p><i className="fa-solid fa-check"></i> Learn the structural foundation of web pages and applications </p>

        <div className={cls.accordions}>
          {data.map((single, idx) => (
            <ListAccordion key={idx} data={single} />
          ))}
        </div>

      </div>
    </div>
  )
}

export default Details