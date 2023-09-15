import { ReactComponent as ArrowUp } from "../assets/shared/icon-arrow-up.svg";
import { useState, MouseEvent, useEffect } from "react";
import FeedbackContext from "../context/FeedbackContext";
import { useContext } from "react";

const UpvoteContainer: React.FC<{id: number, upvotes: number, suggestion?: boolean}> = ( { id, upvotes, suggestion }) => {
  const context = useContext(FeedbackContext);
  const [currUpvotes, setCurrUpvotes] = useState(upvotes)
  const [isClicked, setIsClicked] = useState(false);
  
  if(!context) {
    throw new Error("Does not exist in provider");
  };

  const { upvotedList, setUpvotedList } = context;

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    if(!upvotedList.includes(id)) {
      setUpvotedList(prev => [...prev, id])
    } else {
      const filteredList = upvotedList.filter(upvoteId => upvoteId !== id)
      setUpvotedList(filteredList)
    }
    event.stopPropagation();
  };

  useEffect(() => {
    if(upvotedList.includes(id)) {
      setIsClicked(true)
    } else {
      setIsClicked(false)
    }
  }, [upvotedList, id])

  useEffect(() => {
    if(isClicked) {
      setCurrUpvotes(upvotes + 1)
    } else {
      setCurrUpvotes(upvotes) 
    }
  }, [isClicked, upvotes])


  return (
    <div onClick={handleClick} className={`${isClicked ? "bg-[#4661E6] text-white" : "bg-[#F2F4FE] text-[#3A4374]"} ${suggestion ? "left-8 md:absolute top-[28px] md:w-10 md:h-[53px] md:flex-col md:px-[6px] md:py-[9px] " : "xl:h-10"} flex rounded-[10px] w-[69px] h-8 gap-2 hover:bg-[#CFD7FF] cursor-pointer px-3 py-[6px] justify-between items-center`}>
        <ArrowUp className={`${isClicked ? "stroke-white" : "stroke-[#4661E6]"}`}/>
        <p className="font-bold ">{currUpvotes}</p>
    </div>
  )
}

export default UpvoteContainer