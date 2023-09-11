import { ProductRequestsType } from "../../types/ContextTypes";
import StatusPanelWithColoredDot from "../../components/ui/StatusPanelWithColoredDot";
import UpvoteContainer from "../../components/UpvoteContainer";
import CommentNumberContainer from "../../components/ui/CommentNumberContainer";
import CategoryWrapperNotClickable from "../../components/ui/CategoryWrapperNotClickable";
import { useNavigate } from "react-router-dom";
import Context from "../../context/Context";
import { useContext } from "react";

type PropsType = {
    statusInfo: ProductRequestsType;
    color: string;
};

const FeedbackWrapper: React.FC<PropsType> = ( {statusInfo, color} ) => {
  const context = useContext(Context);
  
  if(!context) {
    throw new Error("Does not exist in provider");
  };
  
  const { id, status, title, category, description, upvotes, comments } = statusInfo;
  const statusUppercase = status === "in-progress" ? "In Progress" : status.substring(0, 1).toLocaleUpperCase() + status.substring(1, status.length);
  const { setSelectedFeedback } = context;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/details")
    setSelectedFeedback(statusInfo)
  };
  
  return (
    <div onClick={handleClick} style={{borderColor: color}} className="cursor-pointer bg-white w-[327px] md:w-[223px] xl:w-[350px] h-[233px] md:h-[251px] xl:h-[272px] rounded-[10px] px-6 md:px-4 xl:px-[31px] pb-6 xl:pb-[32px] pt-5 xl:pt-[25px] border-t-[6px] border-orange-100">
      <StatusPanelWithColoredDot color={color} statusType={statusUppercase}/>
      <div className="flex flex-col gap-[16px] mt-2">
        <div className="flex flex-col gap-[9px]">
          <h2 className="text-[0.8125rem] tracking-[-0.181px] xl:tracking-[-0.25px] xl:text-[1.125rem] font-bold text-[#3A4374] cursor-pointer hover:text-[#4661E6]">{title}</h2>
          <p className="font-normal text-[0.8125rem] xl:text-[1rem] text-[#647196]">{description}</p>
        </div>
        <CategoryWrapperNotClickable category={category} />
        <div className="flex justify-between">
          <UpvoteContainer id = {id} upvotes={upvotes}/>
          <CommentNumberContainer comments={comments}/>
        </div>
      </div>
    </div>
  )
}

export default FeedbackWrapper