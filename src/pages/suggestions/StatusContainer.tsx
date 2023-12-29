import FeedbackContext from '../../context/FeedbackContext';
import { useContext } from 'react';
import StatusPanelWithColoredDot from '../../components/ui/StatusPanelWithColoredDot';

type StatusPropsType = {
  status: {
    id: number;
    type: string;
    color: string;
  };
};

const StatusContainer: React.FC<StatusPropsType> = ({ status }) => {
  const { type, color } = status;

  const context = useContext(FeedbackContext);

  if (!context) {
    throw new Error('Does not exist in Provider');
  }

  const { feedbackList } = context;

  const statusCount = feedbackList.filter(
    (object) => object.status === type.toLocaleLowerCase()
  ).length;

  return (
    <div className='flex justify-between'>
      <StatusPanelWithColoredDot color={color} statusType={type} />
      <p className='font-bold text-[#647196]'>{statusCount}</p>
    </div>
  );
};

export default StatusContainer;
