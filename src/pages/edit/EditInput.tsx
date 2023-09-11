import { ChangeEvent, useState, useContext } from "react";
import Context from "../../context/Context";

const Input: React.FC<{id: number}> = ( {id} ) => {
  const [input, setInput] = useState("");

  const context = useContext(Context);

  if(!context) {
      throw new Error("Does not exist in provider")
  }

  const { updateNewInputList, newInputList, isAddFeedbackBtnPressed } = context;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value)
    updateNewInputList(id, event.target.value, true)
  };

  const interactedWith = newInputList.find(object => object.id === id)?.interacted;

  const isItError = (isAddFeedbackBtnPressed || interactedWith)  && input === "";

  return (
    <div>
        <input onChange={(e) => handleChange(e)} spellCheck="false" className={`${isItError ? "border-[#D73737]" : "border-[#F7F8FD] hover:border-[#4661E6]"} w-full rounded-[5px] h-12 bg-[#F7F8FD] outline-none cursor-pointer text-[#3A4374] px-4 md:px-6 border`}></input>
    </div>
  )
}

export default Input