import FeedbackContext from "../../context/FeedbackContext";
import { useContext } from "react";

const StatusInfo: React.FC<{status: string, info: string}> = ( { status, info } ) => {
    const context = useContext(FeedbackContext);

    if(!context) {
        throw new Error("Does not exist in Provider")
    };

    const { feedbackList } = context;

    const numberOfFeedbacks = feedbackList.filter(object => object.status === status.toLowerCase()).length;

  return (
    <div className={`w-full`}>
        <p className="text-[#3A4374] font-bold text-[1.125rem] md:text-[0.875rem] tracking-[-0.25px] md:tracking-[-0.194px]">{status} <span>({numberOfFeedbacks})</span></p>
        <p className="">{info}</p>
    </div>
  )
}

export default StatusInfo