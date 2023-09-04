import CategoryWrapper from "../CategoryWrapper";
import { CategoryListType } from "../../../context/Context";

const CategoryContainer: React.FC<{categories: CategoryListType[]}> = ( {categories} ) => {

  return (
    <div className='bg-white w-[223px] rounded-[10px] h-[178px] p-6 flex flex-wrap gap-2'>
      {categories.map((category, index) => <CategoryWrapper key={index} text={category.text} selected={category.selected}/>)}
    </div>
  )
}

export default CategoryContainer