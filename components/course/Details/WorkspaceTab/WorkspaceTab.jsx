import cls from './workspaceTab.module.scss';

const WorkspaceTab = () => {
  return (
    <div className={cls.workplace}>
      <p><i className="fa-regular fa-circle-question"></i> يبدو أنك بحاجة إلى <a href="#">إنشاء مساحة عمل</a> لهذا الفيديو.</p>
    </div>
  )
}

export default WorkspaceTab