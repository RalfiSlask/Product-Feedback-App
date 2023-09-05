import { ReactComponent as ArrowUp } from "../assets/shared/icon-arrow-up.svg";
import { useEffect, useState } from "react";

const UpvoteContainer: React.FC<{upvotes: number, suggestion?: boolean}> = ( { upvotes, suggestion }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [votes, setVotes] = useState(upvotes)

  const handleClick = () => {
    setIsClicked(PrevState => !PrevState)
  };

  useEffect(() => {
    isClicked ? setVotes(prev => prev + 1) : setVotes(prev => prev - 1)
  }, [isClicked])

  return (
    <div onClick={handleClick} className={`${isClicked ? "bg-[#4661E6] text-white" : "bg-[#F2F4FE] text-[#3A4374]"} ${suggestion ? "left-8 md:absolute top-[28px] md:w-10 md:h-[53px] md:flex-col md:px-[6px] md:py-[9px] " : "xl:h-10"} flex rounded-[10px] w-[69px] h-8 gap-2 hover:bg-[#CFD7FF] cursor-pointer px-3 py-[6px] justify-between items-center`}>
        <ArrowUp className={`${isClicked ? "stroke-white" : "stroke-[#4661E6]"}`}/>
        <p className="font-bold ">{votes}</p>
    </div>
  )
}

export default UpvoteContainer