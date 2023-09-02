import Context from "../../context/Context";
import { useContext } from "react";

type StatusPropsType = {
    status: {
        id: number;
        type: string;
        color: string;
    }
};

const StatusContainer: React.FC<StatusPropsType> = ( {status} ) => {
  const { type, color } = status;
  
  const context = useContext(Context);

  if(!context) {
    throw new Error("Does not exist in Provider")
  };

  const { feedbackList } = context;

  const statusCount = feedbackList.filter(object => object.status === type.toLocaleLowerCase()).length;

  return (
    <div className="flex justify-between">
        <div className="flex items-center gap-4">
            <p style={{backgroundColor: color}} className="w-2 h-2 rounded-full"></p>
            <p className="font-normal text-[1rem]">{type}</p>
        </div>
        <p className="font-bold text-[#647196]">{statusCount}</p>
    </div>
  )
}

export default StatusContainer