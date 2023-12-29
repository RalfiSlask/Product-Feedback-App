import { useContext } from 'react';
import FeedbackContext from '../context/FeedbackContext';
import { FeedbackInfoType, InputListType } from '../types/ContextTypes';

type PropsType = {
  feedbackInfo: FeedbackInfoType;
  inputList: InputListType[];
};

const FormLabelAndInfo: React.FC<PropsType> = ({ feedbackInfo, inputList }) => {
  const { id, error, description, label } = feedbackInfo;
  const context = useContext(FeedbackContext);

  if (!context) {
    throw new Error('Does not exist in provider');
  }

  const { isAddFeedbackBtnPressed } = context;
  const input = inputList.find((object) => object.id === id)?.input;
  const isItError = isAddFeedbackBtnPressed && input === '';

  return (
    <div className='flex flex-col gap-[2px]'>
      <label className='font-bold text-[0.8125rem] md:text-[0.875rem] tracking-[-0.181px] text-[#3A4374]'>
        {label}
      </label>
      <div className='flex items-center justify-between'>
        <p className='text-[0.8125rem] md:text-[0.875rem] font-normal'>
          {description}
        </p>
        {isItError && (
          <p className='text-[#D73737] text-[0.8125rem] font-normal'>{error}</p>
        )}
      </div>
    </div>
  );
};

export default FormLabelAndInfo;
