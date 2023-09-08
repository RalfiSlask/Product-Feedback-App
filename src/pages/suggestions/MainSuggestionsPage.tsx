import FeedbackBoard from "./FeedbackBoard";
import SortingPanel from "./SortingPanel";
import { useContext, useEffect } from "react";
import Context from "../../context/Context";
import SuggestionContainer from "./SuggestionContainer";
import RoadmapContainer from "./RoadmapContainer";
import CategoryContainer from "./ui/CategoryContainer";
import Lightbox from "../../components/ui/Lightbox";
import Sidebar from "./ui/Sidebar";
import WhiteLightbox from "../../components/ui/WhiteLightbox";

const MainSuggestionsPage = () => {
  const context = useContext(Context);
  
  if(!context) {
    throw new Error("Does not exist in provider");
  }

  const { windowSize, isLightboxActive, suggestions, modals } = context;

  useEffect(() => {
    console.log(suggestions)
  })

  return (
    <>
    <div className="w-full md:gap-[54px] xl:w-[1110px] flex flex-col xl:flex-row items-center xl:items-start xl:gap-[30px]">
      <header className="flex xl:flex-col justify-between w-full md:w-[689px] xl:w-[255px] xl:h-[529px] md:mt-[56px] xl:mt-[94px]">
        <FeedbackBoard />
        {modals.filterModal && <WhiteLightbox />}
       { windowSize !== "mobile" ? <><CategoryContainer /><RoadmapContainer /></>: null }
      </header>
      <main className="bg-[#F7F8FD] w-full md:w-[689px] xl:w-[825px] flex flex-col items-center">
        <SortingPanel />
        <section className="w-[327px] md:w-full mt-8 md:mt-6 flex flex-col gap-4 xl:gap-5 mb-[129px]">
          {suggestions.map((suggestion, index) => {
            return <SuggestionContainer key={index} suggestion={suggestion}/>
          })}
        </section>
      </main>
      {isLightboxActive && <Lightbox />}
      <Sidebar />
    </div>
    </>
  )
}

export default MainSuggestionsPage