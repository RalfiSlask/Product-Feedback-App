import { RepliesType } from '../../ContextTypes';
import { useEffect } from "react";
import UserContainer from './UserContainer';

const ReplyWrapper: React.FC<{reply: RepliesType}> = ( {reply} ) => {
  const { content, replyingTo, user } = reply;

    useEffect(() => {
        console.log(reply)
    })

  return (
    <div className='flex flex-col'>
      <div className='flex flex-col gap-4'>
          <div className='flex items-center justify-between w-full'>
              <UserContainer userInfo={user}/>
              <p className='text-[#4661E6] text-[0.8125rem] font-semibold'>Reply</p>
          </div>
          <p className='text-[0.8125rem] md:text-[0.9375rem] md:ml-[72px]'><span className='text-[#AD1FEA] font-bold'>@{replyingTo}</span> {content}</p>
      </div>
  </div>
  )
}

export default ReplyWrapper