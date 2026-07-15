'use client';
import { useState } from 'react';
//= Components
import Modal from '@/components/UIs/Modal'
import Input from '@/components/UIs/Input'
//= Types
import type { Dictionary } from '@/types';
//= Styles
import cls from './addEducationModal.module.scss'

type Props = {
  translations: Dictionary['panel']['settings']['tabs']['educationTab'];
  setOpenModal: (open: boolean) => void;
  selectedDegree: string
}

function AddEducationModal({ setOpenModal, selectedDegree, translations }: Props) {
  const [degree, setDegree] = useState(selectedDegree ? selectedDegree : '');

  return (
    <Modal setOpenModal={setOpenModal}>
      <div className={cls.addEducationModal}>
        <h4>{translations.modal.title}</h4>
        <p>{translations.modal.description}</p>
        <Input placeholder={translations.modal.placeholder} name="degree" value={degree} onChange={(e) => setDegree(e.target.value)} />
        <div className={cls.actions}>
          <button onClick={() => setOpenModal(false)}>{translations.modal.cancel}</button>
          <button>{translations.modal.save}</button>
        </div>
      </div>
    </Modal>
  )
}

export default AddEducationModal
