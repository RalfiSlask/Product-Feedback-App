import { ReactComponent as ArrowUp } from "../assets/shared/icon-arrow-up.svg";
import { useState } from "react";
import FeedbackContext from "../context/FeedbackContext";
import { useContext } from "react";

const UpvoteContainer: React.FC<{id: number, upvotes: number, suggestion?: boolean}> = ( { id, upvotes, suggestion }) => {
  const context = useContext(FeedbackContext);
  
  if(!context) {
    throw new Error("Does not exist in provider");
  };
  
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(PrevState => !PrevState)
  };

  return (
    <div onClick={handleClick} className={`${isClicked ? "bg-[#4661E6] text-white" : "bg-[#F2F4FE] text-[#3A4374]"} ${suggestion ? "left-8 md:absolute top-[28px] md:w-10 md:h-[53px] md:flex-col md:px-[6px] md:py-[9px] " : "xl:h-10"} flex rounded-[10px] w-[69px] h-8 gap-2 hover:bg-[#CFD7FF] cursor-pointer px-3 py-[6px] justify-between items-center`}>
        <ArrowUp className={`${isClicked ? "stroke-white" : "stroke-[#4661E6]"}`}/>
        <p className="font-bold ">{upvotes}</p>
    </div>
  )
}

export default UpvoteContainer