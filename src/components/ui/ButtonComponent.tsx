type PropsType = {
  text?: string;
  color?: string;
  textColor?: string;
  dimensions?: string;
  onClick?: () => void;
};

const ButtonComponent: React.FC<PropsType> = ({
  text,
  color,
  textColor,
  dimensions,
  onClick
}) => {
  return (
    <button
      style={{ backgroundColor: color }}
      onClick={onClick}
      className={`${dimensions} ${
        textColor ? '' : 'text-white'
      } hover:opacity-75 flex flex-shrink-0 justify-center items-center rounded-[10px] text-[0.813rem] font-bold cursor-pointer`}
    >
      {text}
    </button>
  );
};

export default ButtonComponent;
