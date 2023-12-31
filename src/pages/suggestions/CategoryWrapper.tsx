import FeedbackContext from '../../context/FeedbackContext';
import { useContext } from 'react';

const CategoryWrapper: React.FC<{ text: string; selected: boolean }> = ({
  text,
  selected
}) => {
  const context = useContext(FeedbackContext);

  if (!context) {
    throw new Error('Does not exist in provider');
  }

  const {
    selectOptionFromItemsOnClick,
    categoryList,
    setCategoryList,
    filterSuggestionsByCategory
  } = context;

  const handleClick = () => {
    selectOptionFromItemsOnClick(text, categoryList, setCategoryList);
    filterSuggestionsByCategory(text);
  };

  return (
    <div
      onClick={handleClick}
      className={`${
        selected ? 'bg-[#4661E6] text-white' : 'bg-[#F2F4FF] text-[#4661E6]'
      } h-[30px] w-auto rounded-[10px] inline-flex justify-center items-center font-semibold py-1 px-4 hover:bg-[#CFD7FF] cursor-pointer`}
    >
      {text}
    </div>
  );
};

export default CategoryWrapper;
