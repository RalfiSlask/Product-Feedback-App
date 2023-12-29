type PropsType = {
  onClick: () => void;
  userName: string;
};

const ReplyButton: React.FC<PropsType> = ({ onClick, userName }) => {
  return (
    <>
      {userName !== 'Zena Kelley' && (
        <p
          onClick={onClick}
          className='text-[#4661E6] text-[0.8125rem] font-semibold hover:underline cursor-pointer'
        >
          Reply
        </p>
      )}
    </>
  );
};

export default ReplyButton;
