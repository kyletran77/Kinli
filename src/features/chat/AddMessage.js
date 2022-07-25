import React, { useCallback } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../../redux/messagesSlice';
import { ReactComponent as DirectIcon } from '../../assets/icon/direct.svg';
import avatar from '../../assets/icon/unknownUser.jpg';
const AddMessage = ({ sender, receiver }) => {
  const [content, setContent] = useState('');
  const dispatch = useDispatch();
  const photoURL = useSelector((state) => state.auth.user.photoURL);
  const canSave = content.trim() && true;

  const handleAddMessage = useCallback(
    (e) => {
      e.preventDefault();
      if (content.trim() === '') return;
      const message = {
        createdAt: new Date().toISOString(),
        sender,
        receiver,
        content,
      };
      dispatch(addMessage(message));

      setContent('');
    },
    [sender, receiver, content, dispatch]
  );
  return (
    <div className='add-comment add-message'>
      <div className='circle'>
        <img src={photoURL} title={'displayName'} alt='user' />
      </div>

      <form onSubmit={handleAddMessage}>
        <div className='add-comment-input'>
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            type='text'
            placeholder='Write a message...'
          />
          <DirectIcon
            className={canSave && 'submit'}
            type='submit'
            onClick={handleAddMessage}
          />
        </div>
      </form>
    </div>
  );
};

export default AddMessage;
