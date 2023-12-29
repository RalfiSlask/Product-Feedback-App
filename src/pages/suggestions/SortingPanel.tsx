import SortSelector from './SortSelector';
import SuggestionCount from './ui/SuggestionCount';
import ButtonComponent from '../../components/ui/ButtonComponent';
import SuggestionModal from './SuggestionModal';
import { useContext } from 'react';
import FeedbackContext from '../../context/FeedbackContext';
import { useNavigate } from 'react-router-dom';
import UIContext from '../../context/UIContext';

const SortingPanel = () => {
  const feedbackContext = useContext(FeedbackContext);
  const uiContext = useContext(UIContext);

  if (!feedbackContext || !uiContext) {
    throw new Error('Does not exist in provider');
  }

  const navigate = useNavigate();

  const { modals, windowSize } = uiContext;
  const { feedbackList } = feedbackContext;

  const suggestionCount = feedbackList.filter(
    (feedback) => feedback.status === 'suggestion'
  ).length;

  const handleClick = () => {
    navigate('/new');
  };

  return (
    <div
      className={`${
        modals.sidebar ? 'mt-[72px]' : 'mt-0'
      } bg-[#373F68] relative w-full md:rounded-[10px] h-14 md:h-[72px] flex items-center justify-between px-6 text-[#F2F4FE] `}
    >
      <div className='flex gap-[38px]'>
        {windowSize !== 'mobile' ? (
          <SuggestionCount count={suggestionCount} />
        ) : null}
        <SortSelector />
      </div>

      <ButtonComponent
        text={'+ Add Feedback'}
        color={'#AD1FEA'}
        dimensions={'h-10 md:h-11 w-[134px] md:w-[158px]'}
        onClick={handleClick}
      />
      {modals.filterModal && <SuggestionModal />}
    </div>
  );
};

export default SortingPanel;
