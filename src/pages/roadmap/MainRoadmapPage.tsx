import RoadmapHeader from "./RoadmapHeader";
import StatusColumn from "./StatusColumn";
import MobileStatusSelector from "./MobileStatusSelector";
import Context from "../../context/Context";
import { useContext } from "react";

const statusSectionsArray = [
  {id: 1, status: "Planned", info: "Ideas prioritized for research", color: "#F49F85"},
  {id: 2, status: "In-Progress", info: "Features currently being developed", color: "#AD1FEA"},
  {id: 3, status: "Live", info: "Released features", color: "#62BCFA"}
]

const MainRoadmapPage = () => {
  const context = useContext(Context);

  if(!context) {
      throw new Error("Does not exist in Provider")
  };

  const { windowSize, selectedStatus } = context;

  const currIndex = statusSectionsArray.findIndex(element => element.status === selectedStatus)

  return (
    <div className="flex flex-col items-center w-full">
      <header className="flex xl:flex-col justify-between w-full md:w-[689px] xl:w-[1110px] h-[100px] md:h-[113px]">
        <RoadmapHeader />
      </header>
      <main className="bg-[#F7F8FD] w-full md:w-[689px] xl:w-[1110px] flex flex-col items-center mb-[96px]">
        { windowSize === "mobile" && <MobileStatusSelector selectionArray = {statusSectionsArray}/> }
        { windowSize === "mobile" ?  <StatusColumn sectionInfo={statusSectionsArray[currIndex]} /> :         
        <div className="flex justify-between w-full">
          {statusSectionsArray.map(section => <StatusColumn key={section.id} sectionInfo={section}/>)}
        </div>}
      </main>
    </div>
  )
}

export default MainRoadmapPage