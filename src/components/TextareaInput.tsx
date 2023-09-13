import { ChangeEvent, useState, useContext, useEffect } from "react";
import FeedbackContext from "../context/FeedbackContext";
import { InputListType, setInputListType } from "../types/ContextTypes";

type TextAreaInputProps = {
    id: number,
    errorText: string,
    inputList: InputListType[];
    setInputList: setInputListType;
    inputText?: string;
};

const TextareaInput: React.FC<TextAreaInputProps> = ( {id, errorText, inputList, inputText, setInputList} ) => {
  const [input, setInput] = useState(inputText);

  const context = useContext(FeedbackContext);

  if(!context) {
      throw new Error("Does not exist in provider")
  }

  const { isAddFeedbackBtnPressed, updateInputListOnChange } = context;

  const interactedWith = inputList.find(object => object.id === id)?.interacted;

  const isItError = (isAddFeedbackBtnPressed || interactedWith) && input === "";

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
    updateInputListOnChange(id, event.target.value, inputList, setInputList);
  };

  return (
    <div>
        <textarea  style={{ resize: 'none' }} spellCheck="false" value={input} onChange={(e) => handleChange(e)} className={`${isItError ? "border-[#D73737]" : "border-[#F7F8FD] hover:border-[#4661E6]"} w-full rounded-[5px] h-[120px] md:h-[96px] bg-[#F7F8FD] outline-none cursor-pointer text-[#3A4374] px-4 md:px-6 border py-4`}>{inputText}</textarea>
        <div className="h-5">
          {isItError && <p className="text-[#D73737] text-[0.8125rem] font-normal">{errorText}</p>}
        </div>
    </div>
  )
}

export default TextareaInput