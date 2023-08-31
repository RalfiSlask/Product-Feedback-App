import { ReactComponent as ArrowDown } from "../../assets/shared/icon-arrow-down.svg";
import { ReactComponent as ArrowUp } from "../../assets/shared/icon-arrow-up.svg";
import { useState } from "react";
import { useContext } from "react";
import Context from "../../context/Context";

const SortSelector = () => {
  const [arrowUp, setArrowUp] = useState(false);

  const context = useContext(Context);

  if(!context) {
      throw new Error("Does not exist in provider")
  };

  const { selectedOption, toggleModal } = context;

  const handleClick = () => {
    setArrowUp(PrevState => !PrevState)
    toggleModal();
  };

  return (
    <div onClick={handleClick} className="stroke-white flex items-center gap-2 cursor-pointer hover:opacity-75 w-44">
        <p className='text-[0.813rem] md:text-[0.875rem] font-normal'>Sort by: <span className='font-bold'>{selectedOption}</span></p>
        <div>
          {arrowUp ? <ArrowUp /> : <ArrowDown />}
        </div>
    </div>
  )
}

export default SortSelector