import { CommentsType } from '../../ContextTypes';
import UserContainer from './UserContainer';
import { useEffect } from "react";
import ReplyWrapper from './ReplyWrapper';

const CommentWrapper: React.FC<{comment: CommentsType}> = ( {comment} ) => {
    const { content, user, replies } = comment;
    
    useEffect(() => {
        console.log(replies)
    })
    
  return (
    <div className='flex flex-col'>
        <div className='flex flex-col gap-4'>
            <div className='flex items-center justify-between w-full'>
                <UserContainer userInfo={user}/>
                <p className='text-[#4661E6] text-[0.8125rem] font-semibold'>Reply</p>
            </div>
            <p className='text-[0.8125rem] md:text-[0.9375rem] md:ml-[72px]'>{content}</p>
        </div>
        { replies && replies.map((reply, index) => <ReplyWrapper key={index} reply={reply}/>)}
    </div>
  )
}

export default CommentWrapper