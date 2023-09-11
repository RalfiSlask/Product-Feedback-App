import Context from "../../context/Context";
import { useContext } from "react";
import BigHeading from "../../components/ui/BigHeading";
import ButtonComponent from "../../components/ui/ButtonComponent";
import { useNavigate } from "react-router-dom";
import Input from "../new/Input";
import CategoryInput from "../new/CategoryInput";
import TextareaInput from "../new/TextareaInput";

const EditFeedbackContainer = () => {
    const context = useContext(Context);

    if(!context) {
        throw new Error("Does not exist in provider")
    };

    const newFeedbackArray = [
        {id: 1, label: "Feedback Title", description: "Add a short, descriptive headline", input: <Input id={1} />, error: "Can’t be empty"},
        {id: 2, label: "Category", description: "Choose a category for your feedback", input: <CategoryInput id={2}/>},
        {id: 3, label: "Feedback Detail", description: "Include any specific comments on what should be improved, added, etc.", input: <TextareaInput id={3} errorText={"Can’t be empty"}/>},
      ];

    const { selectedFeedback } = context;
    const { title } = selectedFeedback;
    const navigate = useNavigate();

    const handleClickOnCancel = () => {
        navigate(-1)
      };
    
      
  return (
    <div className='w-full bg-white rounded-[px] px-6 md:px-[42px] py-11 md:pt-[52px] md:pb-[40px] flex flex-col gap-6'>
        <BigHeading text={`Editing ‘${title}’`}/>
        {/* <Input />
        <CategoryInput /> */}
        <div className="flex flex-col justify-between gap-4 mt-4 md:flex-row">
            <ButtonComponent 
            text="Delete"
            color="#D73737"
            dimensions="w-full md:w-[93px] h-10 md:h-[44px]"
            />
            <div className="flex flex-col gap-4 md:flex-row">
                <ButtonComponent 
                text="Cancel"
                color="#3A4374"
                dimensions="w-full md:w-[93px] h-10 md:h-[44px]"
                />
                <ButtonComponent 
                text="Add Feedback"
                color="#AD1FEA"
                dimensions="w-full md:w-[144px] h-10 md:h-[44px]"
                />
            </div>
      </div>
    </div>
    
  )
}

export default EditFeedbackContainer