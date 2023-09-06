import { ChangeEvent, useState, useEffect, useContext } from "react";
import Context from "../../context/Context";

const TextareaInput: React.FC< {id: number, errorText: string} > = ( {id, errorText} ) => {
  const [input, setInput] = useState("");

  const context = useContext(Context);

  if(!context) {
      throw new Error("Does not exist in provider")
  }

   const { newInputList, isAddFeedbackBtnPressed, updateNewInputList, setIsAddFeedbackBtnPressed } = context;

  const isItError = isAddFeedbackBtnPressed && input === "";

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value)
    updateNewInputList(id, event.target.value)
    setIsAddFeedbackBtnPressed(false)
  };

  return (
    <div>
        <textarea  style={{ resize: 'none' }} spellCheck="false" onChange={(e) => handleChange(e)} className='w-full rounded-[5px] h-[120px] md:h-[96px] bg-[#F7F8FD] outline-none cursor-pointer text-[#3A4374] px-4 md:px-6 border py-4 border-[#F7F8FD] hover:border-[#4661E6]'></textarea>
        <div className="h-5">
          {isItError && <p className="text-[#D73737] text-[0.8125rem] font-normal">{errorText}</p>}
        </div>
    </div>
  )
}

export default TextareaInput