import { useContext } from "react";
import Context from "../../context/Context";
import ModalSelectorOption from "../../components/ModalSelectorOption";

const CategoryModal = () => {
  const context = useContext(Context);

  if(!context) {
      throw new Error("Does not exist in provider")
  }

  const { categoryOptionList, handleClickOnCategory } = context;

  return (
    <div className="bg-white rounded-[10px] h-[240px] z-20 w-[279px] md:w-[456px] shadow-modalShadow flex flex-col justify-between overflow-hidden absolute top-16">
       {categoryOptionList.map(option => {
            return <ModalSelectorOption key={option.id} option={option} onClick={handleClickOnCategory}/>
        })}
    </div>
  )
}

export default CategoryModal