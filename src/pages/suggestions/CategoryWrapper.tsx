import Context from "../../context/Context";
import { useContext } from "react";

const CategoryWrapper: React.FC<{text: string, selected: boolean}> = ( {text, selected} ) => {
    const context = useContext(Context);
  
    if(!context) {
      throw new Error("Does not exist in provider");
    };

    const { handleClickOnCategory } = context;

  return (
    <div onClick={() => {handleClickOnCategory(text)}} className={`${selected ? "bg-[#4661E6] text-white" : "bg-[#F2F4FF] text-[#4661E6]"} h-[30px] w-auto rounded-[10px] inline-flex justify-center items-center font-semibold py-1 px-4 hover:bg-[#CFD7FF] cursor-pointer`}>{text}</div>
  )
}

export default CategoryWrapper