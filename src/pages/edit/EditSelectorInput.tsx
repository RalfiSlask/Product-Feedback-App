import { useState, useContext, useEffect } from "react";
import { ReactComponent as ArrowDown } from "../../assets/shared/icon-arrow-down.svg";
import { ReactComponent as ArrowUp } from "../../assets/shared/icon-arrow-up.svg";
import Context from "../../context/Context";
import { EditSelectorInputType } from "../../types/ContextTypes";
import { getTextWithFirstUppercaseLetter } from "../../utils/HelperFunctions";

const EditSelectorInput: React.FC<EditSelectorInputType> = ( {id, modal, type} ) => {
    const context = useContext(Context);
    const [isClicked, setIsClicked] = useState(false);

    if(!context) {
      throw new Error("Does not exist in provider")
    };

    const { selectedFeedback } = context;

    const [selectedInput, setSelectedInput] = useState("");

    useEffect(() => {
      if(type === "category") {
        const feedback = {...selectedFeedback}
        const feedbackText = getTextWithFirstUppercaseLetter(feedback[type]);
        setSelectedInput(feedbackText)
      } else if(type === "status") {
        const feedback = {...selectedFeedback}
        const feedbackText = getTextWithFirstUppercaseLetter(feedback[type]);
        setSelectedInput(feedbackText)
      }
    }, [selectedFeedback, type])

    const handleClick = () => {
      setIsClicked(PrevState => !PrevState)
    };

  return (
    <div onClick={handleClick} className="relative">
        <div className='w-full rounded-[5px] h-12 bg-[#F7F8FD] outline-none cursor-pointer text-[#3A4374] px-4 md:px-6 flex items-center justify-between border border-[#F7F8FD] hover:border-[#4661E6]'>
            <p>{selectedInput}</p>
            {isClicked ? <ArrowUp className="stroke-[#4661E6]"/> : <ArrowDown className="stroke-[#4661E6]"/>}
        </div>
        {isClicked && modal}
    </div>
  )
}

export default EditSelectorInput