import { useState, useContext, useEffect } from "react";
import { ReactComponent as ArrowDown } from "../assets/shared/icon-arrow-down.svg";
import { ReactComponent as ArrowUp } from "../assets/shared/icon-arrow-up.svg";
import FeedbackContext from "../context/FeedbackContext";
import { SelectorInputType } from "../types/ContextTypes";

const SelectorInput: React.FC<SelectorInputType> = ( { id, modal, modalList, inputList, setInputList } ) => {
  const context = useContext(FeedbackContext);

  if(!context) {
      throw new Error("Does not exist in provider")
  };

  const { updateInputListOnChange } = context;
  const [isClicked, setIsClicked] = useState(false)
  const selectedCategory = modalList.find(object => object.selected)?.text;

  const handleClick = () => {
    setIsClicked(PrevState => !PrevState)
  };

  useEffect(() => {
    if(selectedCategory) {
      updateInputListOnChange(id, selectedCategory, inputList, setInputList)
    }
  }, [selectedCategory, updateInputListOnChange, id, setInputList, inputList])

  return (
    <div onClick={handleClick} className="relative">
      <div className='w-full rounded-[5px] h-12 bg-[#F7F8FD] outline-none cursor-pointer text-[#3A4374] px-4 md:px-6 flex items-center justify-between border border-[#F7F8FD] hover:border-[#4661E6]'>
        <p>{selectedCategory}</p>
        {isClicked ? <ArrowUp className="stroke-[#4661E6]"/> : <ArrowDown className="stroke-[#4661E6]"/>}
      </div>
      {isClicked && modal}
    </div>
  )
}

export default SelectorInput