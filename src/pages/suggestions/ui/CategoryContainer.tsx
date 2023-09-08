import CategoryWrapper from "../CategoryWrapper";
import Context from "../../../context/Context";
import { useContext } from "react";

const CategoryContainer = ( ) => {
  const context = useContext(Context);
  
  if(!context) {
    throw new Error("Does not exist in provider");
  }

  const { categoryList } = context;

  return (
    <div className='bg-white w-[223px] rounded-[10px] h-[178px] p-6 flex flex-wrap gap-2'>
      {categoryList.map((category, index) => <CategoryWrapper key={index} text={category.text} selected={category.selected}/>)}
    </div>
  )
}

export default CategoryContainer