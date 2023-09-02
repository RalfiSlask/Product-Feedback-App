import { useContext } from "react";
import Context from "../../context/Context";
import FilteredOption from "./FilteredOption";

const SuggestionModal = () => {
    const context = useContext(Context);

    if(!context) {
        throw new Error("Does not exist in provider")
    }

    const { filterList } = context;

  return (
    <div className="bg-white rounded-[10px] z-20 w-[12rem] md:w-[15.938rem] h-[12rem] shadow-modalShadow flex flex-col justify-between overflow-hidden absolute left-4 top-16 md:top-20 md:left-52 xl:left-52 xl:top-24">
        {filterList.map(option => {
            return <FilteredOption key={option.id} option={option}/>
        })}
    </div>
  )
}

export default SuggestionModal