import FeedbackBoard from "./FeedbackBoard";
import SortingPanel from "./SortingPanel";
import { useContext } from "react";
import Context from "../../context/Context";
import FeedbackContainer from "../../components/FeedbackContainer";
import RoadmapContainer from "./RoadmapContainer";
import CategoryContainer from "./ui/CategoryContainer";
import Lightbox from "../../components/ui/Lightbox";
import Sidebar from "./ui/Sidebar";
import WhiteLightbox from "../../components/ui/WhiteLightbox";
import ThereIsNoFeedbackContainer from "./ThereIsNoFeedbackContainer";
import { useNavigate } from "react-router-dom";
import { ProductRequestsType } from "../../types/ContextTypes";

const MainSuggestionsPage = () => {
  const context = useContext(Context);
  
  if(!context) {
    throw new Error("Does not exist in provider");
  };

  const navigate = useNavigate();

  const handleClick = ( suggestion: ProductRequestsType ) => {
    navigate("/details")
    setSelectedFeedback(suggestion)
  };

  const { windowSize, isLightboxActive, suggestions, modals, setSelectedFeedback } = context;

  return (
    <>
    <div className="w-full md:gap-10 xl:w-[1110px] flex flex-col xl:flex-row items-center xl:items-start xl:gap-[30px] xl:mt-[94px]">
      <header className="flex xl:flex-col justify-between w-full md:w-[689px] xl:w-[255px] xl:h-[529px] md:mt-[56px] xl:mt-0">
        <FeedbackBoard />
        {modals.filterModal && <WhiteLightbox />}
       { windowSize !== "mobile" ? <><CategoryContainer /><RoadmapContainer /></>: null }
      </header>
      <main className="bg-[#F7F8FD] w-full md:w-[689px] xl:w-[825px] flex flex-col items-center">
        <SortingPanel />
        <section className="w-[327px] md:w-full mt-8 md:mt-6 flex flex-col gap-4 xl:gap-5 mb-[129px] items-center">
          {suggestions.length > 0 ? suggestions.map((suggestion, index) => {
            return <FeedbackContainer key={index} feedback={suggestion} onClick={handleClick}
            />
          }) : 
          <ThereIsNoFeedbackContainer />}
        </section>
      </main>
      {isLightboxActive && <Lightbox />}
      <Sidebar />
    </div>
    </>
  )
}

export default MainSuggestionsPage