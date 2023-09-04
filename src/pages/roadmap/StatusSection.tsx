import StatusInfo from "./StatusInfo";
import Context from "../../context/Context";
import { useContext } from "react";
import FeedbackWrapper from "./FeedbackWrapper";

type SectionInfoType = {
    sectionInfo: {
        id: number;
        status: string;
        info: string;
        color: string;
    }
};

const StatusSection: React.FC<SectionInfoType> = ( {sectionInfo} ) => {
    const { status, info, color } = sectionInfo;
    const context = useContext(Context);

    if(!context) {
        throw new Error("Does not exist in Provider")
    };

    const { feedbackList } = context;

  
  return (
    <div className="w-[327px] md:w-[223px] xl:w-[350px] flex flex-col my-6">
        <StatusInfo status={status} info={info}/>
        {feedbackList.filter(object => object.status === status.toLocaleLowerCase()).map(object => 
        <FeedbackWrapper key={object.id} statusInfo={object} color={color} />)}
    </div>
  )
}

export default StatusSection