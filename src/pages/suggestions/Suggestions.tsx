import FeedbackBoard from "./FeedbackBoard"
import SortingPanel from "./SortingPanel";
import { useContext, useState } from "react";
import Context from "../../context/Context";
import SuggestionContainer from "./SuggestionContainer";
import RoadmapContainer from "./RoadmapContainer";
import CategoryContainer from "./CategoryContainer";

const Suggestions = () => {
  const context = useContext(Context);
  
  if(!context) {
    throw new Error("Does not exist in provider");
  }
  const { feedbackList, windowSize } = context;

  const [suggestions, setSuggestions] = useState(feedbackList.filter(object => object.status === "suggestion"))


  return (
    <>
      <header className="flex xl:flex-col justify-between w-full md:w-[689px] xl:w-[255px] xl:h-[529px]">
        <FeedbackBoard />
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
    </>
  )
}

export default Suggestions