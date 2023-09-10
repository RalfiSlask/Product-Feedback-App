import GoBack from "../../components/GoBack";
import EditFeedbackContainer from "./EditFeedbackContainer";

const MainEditPage = () => {

  return (
    <div className="w-[327px] md:w-[540px] flex flex-col mt-8 md:mt-14 xl:mt-24 gap-14 md:gap-16">
    <header className="w-full">
      <GoBack 
        textColor="#647196"
        arrowColor="#4661E6"
        />
    </header>
    <main>
      <EditFeedbackContainer />
    </main>
  </div>
  )
}

export default MainEditPage