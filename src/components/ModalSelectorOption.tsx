import checkmark from "../assets/shared/icon-check.svg";
import { ListType } from "../types/ContextTypes";

type PropsType = {
  option: ListType;
  onClick: () => void;
}

const ModalSelectorOption: React.FC<PropsType> = ( { option, onClick } ) => {

  const {text, selected} = option; 

  return (
    <div onClick={onClick} className='flex justify-between h-full items-center text-base border border-[#3A4374] border-opacity-10 px-6 text-[#647196] hover:text-[#AD1FEA] cursor-pointer'>
         <div>{text}</div>
        {selected && <img src={checkmark} alt="checkmark" />}
    </div>
  )
}

export default ModalSelectorOption