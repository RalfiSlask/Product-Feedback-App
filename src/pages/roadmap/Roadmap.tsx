import RoadmapHeader from "./RoadmapHeader";
import StatusSection from "./StatusSection";
import MobileStatusSelector from "./MobileStatusSelector";
import Context from "../../context/Context";
import { useContext } from "react";

const statusSectionsArray = [
  {id: 1, status: "Planned", info: "Ideas prioritized for research", color: "#F49F85"},
  {id: 2, status: "In-Progress", info: "Features currently being developed", color: "#AD1FEA"},
  {id: 3, status: "Live", info: "Released features", color: "#62BCFA"}
]

const Roadmap = () => {
  const context = useContext(Context);

  if(!context) {
      throw new Error("Does not exist in Provider")
  };

  const { windowSize, selectedStatus } = context;

  const currIndex = statusSectionsArray.findIndex(element => element.status === selectedStatus)

  return (
    <div className="w-full flex flex-col items-center">
      <header className="flex xl:flex-col justify-between w-full md:w-[689px] xl:w-[1110px] h-[100px] md:h-[113px]">
        <RoadmapHeader />
      </header>
      <main className="bg-[#F7F8FD] w-full md:w-[689px] xl:w-[1110px] flex flex-col items-center">
        { windowSize === "mobile" && <MobileStatusSelector selectionArray = {statusSectionsArray}/> }
        { windowSize === "mobile" ?  <StatusSection sectionInfo={statusSectionsArray[currIndex]} /> :         
        <div className="w-full flex justify-between">
          {statusSectionsArray.map(section => <StatusSection key={section.id} sectionInfo={section}/>)}
        </div>}
      </main>
    </div>
  )
}

export default Roadmap