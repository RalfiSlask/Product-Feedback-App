import Context from "../../context/Context"
import { useContext, useEffect } from "react"

type PropsType = {
  status: string;
  color: string;
}

const Selector: React.FC<PropsType>  = ( { status, color } ) => {
  const context = useContext(Context);

  if(!context) {
      throw new Error("Does not exist in Provider")
  };

  const { handleClickOnStatusSelector, selectedStatus, feedbackList } = context;

  const numberOfFeedbacks = feedbackList.filter(object => object.status === status.toLowerCase()).length;

  return (
    <div 
      onClick={() => handleClickOnStatusSelector(status)} 
      className={`${selectedStatus === status ? "relative opacity-100" : "opacity-40"} cursor-pointer w-[125px] text-center`}
      >
      {selectedStatus === status && (
        <div style={{
          position: "absolute",
          top: 38,
          left: 0,
          right: 0,
          borderBottom: `4px solid ${color}`,
          zIndex: 20,
        }}></div>
      )}
      <p className='tracking-[-0.181px] font-bold text-[0.8125rem]'>{status} <span>({numberOfFeedbacks})</span></p>
    </div>
  )
}

export default Selector