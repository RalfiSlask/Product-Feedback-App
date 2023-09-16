import { CommentsType } from '../../types/ContextTypes';
import UserContainer from './ui/UserContainer';
import ReplyWrapper from './ReplyWrapper';
import ReplyButton from './ui/ReplyButton';
import { useState } from "react";
import PostReplyContainer from './PostReplyContainer';

const CommentWrapper: React.FC<{comment: CommentsType}> = ( {comment} ) => {
    const { id, content, user, replies } = comment;
    const [isReplyInputActive, setIsReplyInputActive] = useState(false); 

    const handleClickOnReply = () => {
        setIsReplyInputActive(PrevState => !PrevState)
    };

    const closeReplyInput = () => {
        setIsReplyInputActive(false);  
    };
    
  return (
    <div className='flex flex-col items-end w-full gap-6 md:gap-8'>
        <div className='flex flex-col w-full gap-4'>
            <div className='flex items-center justify-between w-full'>
                <UserContainer userInfo={user}/>
                <ReplyButton onClick={handleClickOnReply} userName={user.name}/>
            </div>
            <div className='flex flex-col md:ml-[72px] gap-6'>
                <p className='text-[0.8125rem] md:text-[0.9375rem]'>{content}</p>
                {isReplyInputActive && <PostReplyContainer commentId={id} replyingTo={user.username} closeReply={closeReplyInput}/>}
            </div>
        </div>
        <div className='flex flex-col gap-6 md:gap-4 xl:gap-8 w-[93%]'>
            { replies && replies.map((reply, index) => <ReplyWrapper key={index} id={id} reply={reply}/>)}
        </div>
    </div>
  )
}

export default CommentWrapper