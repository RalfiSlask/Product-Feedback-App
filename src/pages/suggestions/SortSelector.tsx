import { ReactComponent as ArrowDown } from "../../assets/shared/icon-arrow-down.svg";
import { ReactComponent as ArrowUp } from "../../assets/shared/icon-arrow-up.svg";
import { useContext, useState } from "react";
import FeedbackContext from "../../context/FeedbackContext";
import UIContext from "../../context/UIContext";

const SortSelector = () => {
  const [arrowUp, setArrowUp] = useState(false);

  const feedbackContext = useContext(FeedbackContext);
  const uiContext = useContext(UIContext)

  if(!feedbackContext || !uiContext) {
      throw new Error("Does not exist in provider")
  };

  const { toggleModal } = uiContext;
  const { filterList } = feedbackContext;

  const selectedOption = filterList.find(object => object.selected)?.text;

  const handleClick = () => {
    setArrowUp(PrevState => !PrevState)
    toggleModal("filterModal");
  };

  return (
    <div onClick={handleClick} className="flex items-center gap-2 cursor-pointer stroke-white hover:opacity-75 w-44">
        <p className='text-[0.813rem] md:text-[0.875rem] font-normal'>Sort by: <span className='font-bold'>{selectedOption}</span></p>
        <div>
          {arrowUp ? <ArrowUp /> : <ArrowDown />}
        </div>
    </div>
  )
}

export default SortSelector