import GoBack from '../../../components/GoBack';
import ButtonComponent from '../../../components/ui/ButtonComponent';
import { useNavigate } from 'react-router-dom';
import FeedbackContainer from '../../../components/FeedbackContainer';
import Context from '../../../context/FeedbackContext';
import { useContext } from 'react';
import CommentsContainer from '../CommentsContainer';
import AddCommentContainer from '../AddCommentContainer';

const MainDetailPage = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error('Does not exist in provider');
  }

  const { selectedFeedback } = context;
  const comments = selectedFeedback.comments
    ? selectedFeedback.comments
    : undefined;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/edit');
  };

  return (
    <div className='w-[327px] md:w-[689px] xl:w-[730px] flex flex-col mt-8 md:mt-14 xl:mt-24 gap-14 md:gap-16'>
      <header className='flex justify-between w-full'>
        <GoBack textColor='#647196' arrowColor='#4661E6' />
        <ButtonComponent
          text='Edit Feedback'
          color='#4661E6'
          dimensions='w-[119px] md:w-[142px] h-10 md:h-[44px]'
          onClick={handleClick}
        />
      </header>
      <main className='flex flex-col gap-6'>
        <FeedbackContainer feedback={selectedFeedback} />
        <CommentsContainer comments={comments} />
        <AddCommentContainer errorText='Can’t be empty' />
      </main>
    </div>
  );
};

export default MainDetailPage;
