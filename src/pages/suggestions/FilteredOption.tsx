import checkmark from "../../assets/shared/icon-check.svg";
import { FilterProp } from "../../context/Context";
import { useContext } from "react";
import Context from "../../context/Context";

const FilteredOption: React.FC<{option: FilterProp}> = ( {option} ) => {
    const context = useContext(Context);

    if(!context) {
        throw new Error("Does not exist in provider")
    }

    const { setSelectedOption } = context;

    const {text, selected} = option; 

    const handleClick = () => {
        setSelectedOption(text)
    };

  return (
    <div onClick={handleClick} className='flex justify-between h-full items-center text-base border border-[#3A4374] border-opacity-10 px-6 text-[#647196] hover:text-[#AD1FEA] cursor-pointer'>
         <div>{text}</div>
        {selected && <img src={checkmark} alt="checkmark" />}
    </div>
  )
}

export default FilteredOption