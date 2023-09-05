import GoBack from "../../components/ui/GoBack";
import NewFeedbackContainer from "./NewFeedbackContainer";

const CreateNewFeedback = () => {

  return (
    <div className="w-[327px] md:w-[540px] flex flex-col mt-8 md:mt-14 xl:mt-24 gap-14 md:gap-16">
      <header className="w-full">
        <GoBack 
          textColor="#647196"
          arrowColor="#4661E6"
          />
      </header>
      <main>
        <NewFeedbackContainer />
      </main>
    </div>
  )
}

export default CreateNewFeedback