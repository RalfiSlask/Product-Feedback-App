import Context from "../../../context/Context";
import { useContext } from "react";
import RoadmapContainer from "../RoadmapContainer";
import CategoryContainer from "./CategoryContainer";

const Sidebar = () => {
  const context = useContext(Context);
  
  if(!context) {
    throw new Error("Does not exist in provider");
  }

  const { modals } = context;

  return (
    <div className={`${modals.sidebar ? "translate-x-0" : "translate-x-[279px]"} w-[279px] duration-500 h-full fixed z-50 flex flex-col gap-6 p-6 right-0 bg-[#F7F8FD] top-[72px]`}>
      <CategoryContainer />
      <RoadmapContainer />
    </div>
  )
}

export default Sidebar