import { useState, useContext, useEffect } from "react";
import { ReactComponent as ArrowDown } from "../../assets/shared/icon-arrow-down.svg";
import { ReactComponent as ArrowUp } from "../../assets/shared/icon-arrow-up.svg";
import CategoryModal from "./CategoryModal";
import Context from "../../context/Context";

const CategoryInput = ( ) => {
  const context = useContext(Context);

  if(!context) {
      throw new Error("Does not exist in provider")
  }

  const { categoryOptionList } = context;
  
  const [isClicked, setIsClicked] = useState(false)

  const selectedCategory = categoryOptionList.find(object => object.selected)?.text;

  useEffect(() => {
    console.log(selectedCategory)
  })

  const handleClick = () => {
    setIsClicked(PrevState => !PrevState)
  };

  return (
    <div onClick={handleClick} className="relative">
      <div className='w-full rounded-[5px] h-12 bg-[#F7F8FD] outline-none cursor-pointer text-[#3A4374] px-4 md:px-6 flex items-center justify-between'>
        <p>{selectedCategory}</p>
        {isClicked ? <ArrowUp className="stroke-[#4661E6]"/> : <ArrowDown className="stroke-[#4661E6]"/>}
      </div>
      {isClicked && <CategoryModal />}
    </div>
  )
}

export default CategoryInput