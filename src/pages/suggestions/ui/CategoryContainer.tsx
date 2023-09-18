import CategoryWrapper from "../CategoryWrapper";
import FeedbackContext from "../../../context/FeedbackContext";
import { useContext } from "react";

const CategoryContainer = ( ) => {
  const context = useContext(FeedbackContext);
  
  if(!context) {
    throw new Error("Does not exist in provider");
  }

  const { categoryList } = context;

  return (
    <div className='bg-white w-[223px] xl:w-[255px] rounded-[10px] h-[178px] p-6 flex flex-wrap gap-2'>
      {categoryList.map((category, index) => <CategoryWrapper key={index} text={category.text} selected={category.selected}/>)}
    </div>
  )
}

export default CategoryContainer