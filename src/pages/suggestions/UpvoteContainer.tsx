import { ReactComponent as ArrowUp } from "../../assets/shared/icon-arrow-up.svg";

const UpvoteContainer: React.FC<{upvotes: number}> = ( { upvotes }) => {
  return (
    <div className="flex bg-[#F2F4FE] rounded-[10px] w-[69px] md:w-10 h-8 md:h-[53px] md:flex-col gap-2 md:absolute top-[28px] hover:bg-[#CFD7FF] cursor-pointer left-8 px-3 py-[6px] md:px-[6px] md:py-[9px] justify-between items-center">
        <ArrowUp className= "stroke-[#4661E6]"/>
        <p className="text-[#3A4374] font-bold">{upvotes}</p>
    </div>
  )
}

export default UpvoteContainer