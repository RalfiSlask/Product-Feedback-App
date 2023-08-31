type PropsType = {
    text?: string;
    color?: string;
    dimensions?: string;
};

const ButtonComponent: React.FC<PropsType> = ( {text, color, dimensions} ) => {
  return (
    <button className={`${dimensions} ${color} flex flex-shrink-0 justify-center items-center rounded-[10px] text-[#F2F4FE] text-[0.813rem] font-bold cursor-pointer`}>{text}</button>
  )
}

export default ButtonComponent