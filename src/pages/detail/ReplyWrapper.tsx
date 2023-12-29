import { RepliesType } from '../../types/ContextTypes';
import UserContainer from './ui/UserContainer';
import ReplyButton from './ui/ReplyButton';
import { useState } from 'react';
import PostReplyContainer from './PostReplyContainer';

const ReplyWrapper: React.FC<{ id: number; reply: RepliesType }> = ({
  id,
  reply
}) => {
  const { content, replyingTo, user } = reply;

  const [isReplyInputActive, setIsReplyInputActive] = useState(false);

  const handleClickOnReply = () => {
    setIsReplyInputActive((PrevState) => !PrevState);
  };

  const closeReplyInput = () => {
    setIsReplyInputActive(false);
  };

  return (
    <div className='flex flex-col'>
      <div className='flex flex-col gap-4'>
        <div className='flex items-center justify-between w-full'>
          <UserContainer userInfo={user} />
          <ReplyButton onClick={handleClickOnReply} userName={user.name} />
        </div>
        <div className='flex flex-col md:ml-[72px] gap-6'>
          <p className='text-[0.8125rem] md:text-[0.9375rem]'>
            <span className='text-[#AD1FEA] font-bold'>@{replyingTo}</span>{' '}
            {content}
          </p>
          {isReplyInputActive && (
            <PostReplyContainer
              commentId={id}
              replyingTo={user.username}
              closeReply={closeReplyInput}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ReplyWrapper;
