import { useState } from 'react';

import TeacherNotes from './TeacherNotes/TeacherNotes';
import QuestionsTab from './QuestionsTab/QuestionsTab';
import VideoTextTab from './VideoTextTab/VideoTextTab';
import DownloadsTab from './DownloadsTab/DownloadsTab';
import WorkspaceTab from './WorkspaceTab/WorkspaceTab';

import cls from './details.module.scss';

const Details = () => {
  const [currentStep, setCurrentStep] = useState(1)

  const renderView = () => {
    if (currentStep === 1) return <TeacherNotes />
    else if (currentStep === 2) return <QuestionsTab />
    else if (currentStep === 3) return <VideoTextTab />
    else if (currentStep === 4) return <DownloadsTab />
    else if (currentStep === 5) return <WorkspaceTab />
  }

  return (
    <div className={cls.details}>
      <div className={cls.details__head}>
        <div>
          <h4>Welcome To HTML And CSS</h4>
          <p>This lesson defines HTML and CSS, shows where and how it’s used on websites you visit everyday, and looks at the example project you will be working on throughout the course.</p>
        </div>
        <span>4:23</span>
      </div>

      <div className={cls.tabs}>

        <p onClick={() => setCurrentStep(1)} className={currentStep === 1 ? cls.active : ''}>نصائح المدرس</p>

        <p onClick={() => setCurrentStep(2)} className={currentStep === 2 ? cls.active : ''}>16 سؤال</p>

        <p onClick={() => setCurrentStep(3)} className={currentStep === 3 ? cls.active : ''}>نص الفيديو</p>

        <p onClick={() => setCurrentStep(4)} className={currentStep === 4 ? cls.active : ''}>التحميل</p>

        <p onClick={() => setCurrentStep(5)} className={currentStep === 5 ? cls.active : ''}>مكان العمل</p>

      </div>

      <div className={cls.tab}>
        {renderView()}
      </div>
    </div>
  )
}

export default Details