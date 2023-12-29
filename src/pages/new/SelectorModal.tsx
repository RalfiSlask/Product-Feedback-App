import { useContext } from 'react';
import FeedbackContext from '../../context/FeedbackContext';
import UIContext from '../../context/UIContext';
import ModalSelectorOption from '../../components/ModalSelectorOption';
import { ListType, setListType } from '../../types/ContextTypes';

type SelectorModalType = {
  optionList: ListType[];
  setOptionList: setListType;
};

const SelectorModal: React.FC<SelectorModalType> = ({
  optionList,
  setOptionList
}) => {
  const feedbackContext = useContext(FeedbackContext);
  const uiContext = useContext(UIContext);

  if (!feedbackContext || !uiContext) {
    throw new Error('Does not exist in provider');
  }

  const { closeModal } = uiContext;
  const { selectOptionFromItemsOnClick } = feedbackContext;

  const handleClick = (text: string) => {
    closeModal('filterModal');
    selectOptionFromItemsOnClick(text, optionList, setOptionList);
  };

  return (
    <div className='bg-white rounded-[10px] h-[240px] z-20 w-[279px] md:w-[456px] shadow-modalShadow flex flex-col justify-between overflow-hidden absolute top-16'>
      {optionList.map((option) => {
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

export default SelectorModal;
