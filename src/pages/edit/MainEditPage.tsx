import GoBack from "../../components/GoBack";
import EditFeedbackContainer from "./EditFeedbackContainer";
import BlackLightbox from "../../components/ui/BlackLightbox";
import Context from "../../context/Context";
import { useContext } from "react";
import DeleteModal from "./DeleteModal";

const MainEditPage = () => {
  const context = useContext(Context);

  if(!context) {
      throw new Error("Does not exist in provider")
  };

  const { modals } = context;

  return (
    <div className="w-full flex justify-center">
     {modals.deleteModal && <BlackLightbox />}
      <div className="w-[327px] md:w-[540px] flex flex-col mt-8 md:mt-14 xl:mt-24 gap-14 md:gap-16">
        <header className="w-full">
          <GoBack 
            textColor="#647196"
            arrowColor="#4661E6"
            />
        </header>
        <main>
          {modals.deleteModal && <DeleteModal />}
          <EditFeedbackContainer />
        </main>
      </div>
    </div>
  )
}

export default MainEditPage