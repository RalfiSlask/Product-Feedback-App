import React from 'react'

const CategoryWrapperNotClickable: React.FC<{category: string}> = ( {category} ) => {
    const largeCategory = category.length === 2 ? category.toUpperCase() : category.substring(0, 1).toUpperCase() + category.substring(1, category.length);

  return (
    <div>
    <   div className="h-[30px] w-auto rounded-[10px] bg-[#F2F4FF] text-[#4661E6] inline-flex justify-center items-center font-semibold py-1 px-4">{largeCategory}</div>
    </div>
  )
}

export default CategoryWrapperNotClickable