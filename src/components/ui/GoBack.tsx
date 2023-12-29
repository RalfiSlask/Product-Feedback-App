import { ReactComponent as ArrowLeft } from '../../assets/shared/icon-arrow-left.svg';
import { useNavigate } from 'react-router-dom';

type PropsType = {
  textColor: string;
  arrowColor: string;
};

const GoBack: React.FC<PropsType> = ({ textColor, arrowColor }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <div
      onClick={handleClick}
      className='w-[73px] flex justify-between items-center cursor-pointer hover:underline'
    >
      <ArrowLeft style={{ stroke: arrowColor }} />
      <p style={{ color: textColor }} className={`font-bold text-[0.875rem]`}>
        Go Back
      </p>
    </div>
  );
};

export default GoBack;
