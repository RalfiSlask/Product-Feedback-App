import NumberOfComments from './ui/NumberOfComments';
import { CommentsType } from '../../ContextTypes';
import CommentWrapper from './CommentWrapper';

const CommentsContainer: React.FC<{comments: CommentsType[] | undefined}> = ( { comments } ) => {

  const commentCount = comments ? comments.length : 0;

  return (
    <div className='bg-white rounded-[10px] w-full p-6 md:px-8 xl:pb-10 flex flex-col gap-6'>
      <NumberOfComments commentCount={commentCount}/>
      <div className='flex flex-col gap-12'>
        { comments && comments.map(comment => <CommentWrapper key={comment.id} comment={comment}/>)}
      </div>
    </div>
  )
}

export default CommentsContainer