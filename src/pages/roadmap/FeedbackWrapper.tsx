import { ProductRequestsType } from "../../context/Context"

type PropsType = {
    statusInfo: ProductRequestsType;
    color: string;
}

const FeedbackWrapper: React.FC<PropsType> = ( {statusInfo, color} ) => {
  return (
    <div>FeedbackWrapper</div>
  )
}

export default FeedbackWrapper