type PropsType = {
    text?: string;
    color?: string;
    dimensions?: string;
    onClick?: () => void;
};

const ButtonComponent: React.FC<PropsType> = ( {text, color, dimensions, onClick} ) => {
  return (
    <button onClick={onClick} className={`${dimensions} ${color} flex flex-shrink-0 justify-center items-center rounded-[10px] text-[#F2F4FE] text-[0.813rem] font-bold cursor-pointer`}>{text}</button>
  )
}

export default ButtonComponent