import { useState, useContext, useEffect } from "react";
import { ReactComponent as ArrowDown } from "../../assets/shared/icon-arrow-down.svg";
import { ReactComponent as ArrowUp } from "../../assets/shared/icon-arrow-up.svg";
import Context from "../../context/Context";
import { NewSelectorInputType } from "../../types/ContextTypes";

const CategoryInput: React.FC<NewSelectorInputType> = ({id, modal}) => {
  const context = useContext(Context);

  if(!context) {
      throw new Error("Does not exist in provider")
  };

  const { categoryOptionList, updateNewInputList } = context;

  const selectedCategory = categoryOptionList.find(object => object.selected)?.text;

  const [isClicked, setIsClicked] = useState(false)

  const handleClick = () => {
    setIsClicked(PrevState => !PrevState)
  };

  useEffect(() => {
    if(selectedCategory) {
      updateNewInputList(id, selectedCategory, true)
    }
  }, [selectedCategory])

  return (
    <div onClick={handleClick} className="relative">
      <div className='w-full rounded-[5px] h-12 bg-[#F7F8FD] outline-none cursor-pointer text-[#3A4374] px-4 md:px-6 flex items-center justify-between border border-[#F7F8FD] hover:border-[#4661E6]'>
        <p>{selectedCategory}</p>
        {isClicked ? <ArrowUp className="stroke-[#4661E6]"/> : <ArrowDown className="stroke-[#4661E6]"/>}
      </div>
      {isClicked && modal}
    </div>
  )
}

export default CategoryInput