import { ChangeEvent, useState, useContext } from "react";
import FeedbackContext from "../context/FeedbackContext";
import { InputListType, setInputListType } from "../types/ContextTypes";

type InputPropsType = {
  id: number; 
  inputList: InputListType[];
  setInputList: setInputListType;
  inputText?: string;
};

const Input: React.FC<InputPropsType> = ( { id, inputList, setInputList, inputText } ) => {
  const [input, setInput] = useState(inputText);

  const context = useContext(FeedbackContext);

  if(!context) {
      throw new Error("Does not exist in provider")
  }

  const { updateInputListOnChange, isAddFeedbackBtnPressed } = context;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value)
    updateInputListOnChange(id, event.target.value, inputList, setInputList)
  };

  const interactedWith = inputList.find(object => object.id === id)?.interacted;

  const isItError = (isAddFeedbackBtnPressed || interactedWith) && input === "";

  return (
    <div>
        <input onChange={(e) => handleChange(e)} spellCheck="false" value={input} className={`${isItError ? "border-[#D73737]" : "border-[#F7F8FD] hover:border-[#4661E6]"} w-full rounded-[5px] h-12 bg-[#F7F8FD] outline-none cursor-pointer text-[#3A4374] px-4 md:px-6 border`}></input>
    </div>
  )
}

export default Input