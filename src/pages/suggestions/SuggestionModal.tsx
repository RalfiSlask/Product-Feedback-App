import { useContext } from 'react';
import FeedbackContext from '../../context/FeedbackContext';
import ModalSelectorOption from '../../components/ModalSelectorOption';
import UIContext from '../../context/UIContext';

const SuggestionModal = () => {
  const feedbackContext = useContext(FeedbackContext);
  const uiContext = useContext(UIContext);

  if (!feedbackContext || !uiContext) {
    throw new Error('Does not exist in provider');
  }

  const { closeModal } = uiContext;
  const {
    filterList,
    selectOptionFromItemsOnClick,
    setFilterList,
    sortSuggestionsBySelectedOption
  } = feedbackContext;

  const handleClick = (text: string) => {
    closeModal('filterModal');
    selectOptionFromItemsOnClick(text, filterList, setFilterList);
    sortSuggestionsBySelectedOption(text);
  };

  return (
    <div className='bg-white rounded-[10px] z-20 w-[192px] md:w-[255px] h-[12rem] shadow-modalShadow flex flex-col justify-between overflow-hidden absolute left-4 top-16 md:top-20 md:left-52 xl:left-52 xl:top-24'>
      {filterList.map((option) => {
        return (
          <ModalSelectorOption
            key={option.id}
            option={option}
            onClick={() => {
              handleClick(option.text);
            }}
          />
        );
      })}
    </div>
  );
};

export default SuggestionModal;
