type PropsType = {
    text: string;
    color: string;
    style: string;
};

const ButtonComponent: React.FC<PropsType> = ( {text, color, style} ) => {
  return (
    <div className={`rounded-[10px]`}>{text}</div>
  )
}

export default ButtonComponent