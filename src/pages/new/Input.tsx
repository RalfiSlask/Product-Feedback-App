import { ChangeEvent, useState, useContext, useEffect } from "react";
import Context from "../../context/Context";

const Input: React.FC<{id: number}> = ( {id} ) => {
  const [input, setInput] = useState("");

  const context = useContext(Context);

  if(!context) {
      throw new Error("Does not exist in provider")
  }

  const { updateNewInputList, setIsAddFeedbackBtnPressed} = context;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value)
    updateNewInputList(id, event.target.value)
    setIsAddFeedbackBtnPressed(false)
  };

  return (
    <div>
        <input onChange={(e) => handleChange(e)} spellCheck="false" className='w-full rounded-[5px] h-12 bg-[#F7F8FD] outline-none cursor-pointer text-[#3A4374] px-4 md:px-6 border border-[#F7F8FD] hover:border-[#4661E6]'></input>
    </div>
  )
}

export default Input