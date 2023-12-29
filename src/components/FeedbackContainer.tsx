import HeadingMedium from './ui/HeadingMedium';
import { ProductRequestsType } from '../types/ContextTypes';
import CommentNumberContainer from './ui/CommentNumberContainer';
import UpvoteContainer from './UpvoteContainer';
import CategoryWrapperNotClickable from './ui/CategoryWrapperNotClickable';

type PropsType = {
  feedback: ProductRequestsType;
  onClick?: (feedback: ProductRequestsType) => void;
};

const FeedbackContainer: React.FC<PropsType> = ({
  feedback,
  onClick
}): JSX.Element => {
  const { id, title, category, comments, description, upvotes } = feedback;

  const handleClick = () => {
    if (onClick) {
      onClick(feedback);
    }
  };

  return (
    <div
      onClick={handleClick}
      className='w-full h-[200px] md:h-[151px] bg-white rounded-[10px] p-6 md:px-[32px] md:py-[28px] relative flex flex-col justify-between cursor-pointer'
    >
      <div className='flex flex-col gap-1 md:ml-20'>
        <HeadingMedium text={title} />
        <p className='text-[0.8125rem] md:text-[1rem] font-normal mb-2'>
          {description}
        </p>
        <CategoryWrapperNotClickable category={category} />
      </div>
      <div className='flex items-center justify-between'>
        <UpvoteContainer upvotes={upvotes} suggestion={true} id={id} />
        <CommentNumberContainer comments={comments} suggestion={true} />
      </div>
    </div>
  );
};

export default FeedbackContainer;
