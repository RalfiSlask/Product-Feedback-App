import GoBack from "../../components/GoBack";
import ButtonComponent from "../../components/ui/ButtonComponent";
import { useNavigate } from "react-router-dom";

const MainDetailPage = () => {
    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate("/edit")
    };

  return (
    <div className="w-[327px] md:w-[689px] flex flex-col mt-8 md:mt-14 xl:mt-24 gap-14 md:gap-16">
    <header className="flex justify-between w-full">
        <GoBack 
            textColor="#647196"
            arrowColor="#4661E6"
        />
        <ButtonComponent 
            text="Edit Feedback" 
            color="#4661E6" 
            dimensions="w-[119px] md:w-[142px] h-10 md:h-[44px]" 
            onClick={handleClick}
        />
    </header>
    <main>
    </main>
  </div>
  )
}

export default MainDetailPage