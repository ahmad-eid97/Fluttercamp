'use client';
import { useState, useRef } from 'react';
//= Components
import { Icon } from '@iconify/react';
//= Api
import { sendSupportMessage } from '@/api';
//= Types
import { Dictionary } from '@/types';
//= Styles
import cls from './chatBotom.module.scss';

type Props = {
  translations: Dictionary['panel']['support']['tickets']['reply'];
  ticketId: number;
  isLoading: boolean;
  message: string;
  setMessage: (message: string) => void;
  refetch: () => void;
}

function ChatBottom({ translations, ticketId, isLoading, message, setMessage, refetch }: Props) {
  const [choosedImage, setChoosedImage] = useState<File | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  function clicking() {
    imageInputRef.current?.click();
  }

  function chooseImage(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) setChoosedImage(e.target.files[0]);
    setMessage('');
  }

  function cancelImage() {
    setChoosedImage(null);
    if (imageInputRef.current) imageInputRef.current.value = '';
  }

  async function sendNewMessage() {
    const data = {
      message: message
    }
    if (isLoading) return;
    const response = await sendSupportMessage({ id: ticketId, body: data });
    if (response) setMessage('');
    refetch();
  }

  function enterSendMessage(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.keyCode === 13) {
      sendNewMessage();
    }
  }

  return (
    <div className={cls.chatBottom}>
      <div>
        <input type="text" placeholder={translations.typeMessage} value={message} onChange={(e) => setMessage(e.target.value)} onKeyUp={(e) => enterSendMessage(e)} disabled={isLoading} />
        <Icon icon="bi:image-fill" onClick={clicking} />
        <input type="file" style={{ display: 'none' }} ref={imageInputRef} onChange={(e) => chooseImage(e)} />
      </div>
      <button className={cls.ar} onClick={sendNewMessage}><Icon icon="la:telegram" /></button>
      {choosedImage &&
        <div className={cls.chatBottom__imagePreview}>
          <div>
            <img src={URL.createObjectURL(choosedImage)} alt="imagePreview" />
            <Icon icon="ic:round-close" onClick={cancelImage} />
          </div>
        </div>
      }
    </div>
  )
}

export default ChatBottom;