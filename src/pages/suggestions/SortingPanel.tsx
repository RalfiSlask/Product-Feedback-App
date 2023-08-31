import SortSelector from './SortSelector';
import SuggestionCount from './SuggestionCount';
import ButtonComponent from '../../components/ui/ButtonComponent';
import SuggestionModal from './SuggestionModal';
import { useContext } from "react";
import Context from "../../context/Context";

const SortingPanel = () => {
  const context = useContext(Context);

  if(!context) {
      throw new Error("Does not exist in provider")
  };

  const { modalActive, windowSize } = context;

  return (
    <div className='bg-[#373F68] relative w-full md:w-[43.063rem] xl:w-[51.563rem] md:rounded-[10px] h-14 md:h-[4.5rem] flex items-center justify-between px-6 text-[#F2F4FE]'>
      {windowSize !== "mobile" ? <SuggestionCount /> : null}
      <SortSelector />
      <ButtonComponent 
        text={"+ Add Feedback"} 
        color={"bg-buttonPurple hover:bg-buttonPurpleHover"} 
        dimensions={"h-10 md:h-11 w-[8.375rem] md:w-[9.875rem]"}/>
      {modalActive && <SuggestionModal />}
    </div>
  )
}

export default SortingPanel