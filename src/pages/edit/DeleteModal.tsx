import ButtonComponent from '../../components/ui/ButtonComponent';
import FeedbackContext from '../../context/FeedbackContext';
import UIContext from '../../context/UIContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const DeleteModal = () => {
  const uiContext = useContext(UIContext);
  const feedbackContext = useContext(FeedbackContext);

  if (!uiContext || !feedbackContext) {
    throw new Error('Does not exist in provider');
  }

  const { closeModal } = uiContext;
  const { feedbackList, setFeedbackList, selectedFeedback } = feedbackContext;
  const navigate = useNavigate();

  const handleClickOnYes = () => {
    const filteredFeedbackList = feedbackList.filter(
      (feedback) => feedback.id !== selectedFeedback.id
    );
    setFeedbackList(filteredFeedbackList);
    closeModal('deleteModal');
    navigate('/');
  };

  const handleClickOnNo = () => {
    closeModal('deleteModal');
  };

  return (
    <div className='bg-white rounded-[10px] w-[325px] h-[180px] absolute z-50 top-1/3 left-1/2 -translate-y-1/2 -translate-x-1/2 p-6 flex flex-col items-center gap-6'>
      <h2 className='font-bold text-[1.125rem]'>
        Are you sure you want to delete this feedback?
      </h2>
      <div className='flex justify-between items-center w-[90%]'>
        <ButtonComponent
          text='Yes'
          color='#D73737'
          dimensions='h-10 w-[114px]'
          onClick={handleClickOnYes}
        />
        <ButtonComponent
          text='No'
          color='#3A4374'
          dimensions='h-10 w-[114px]'
          onClick={handleClickOnNo}
        />
      </div>
    </div>
  );
};

export default DeleteModal;
