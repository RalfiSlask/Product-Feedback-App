import Context from "../../context/Context";
import { useContext } from "react";
import BigHeading from "../../components/ui/BigHeading";
import ButtonComponent from "../../components/ui/ButtonComponent";
import { useNavigate } from "react-router-dom";
import Input from "../new/Input";
import TextareaInput from "../new/TextareaInput";
import CategoryModal from "../new/CategoryModal";
import StatusModal from "../new/StatusModal";
import FormLabelAndInfo from "../new/FormLabelAndInfo";
import EditSelectorInput from "./EditSelectorInput";

const EditFeedbackContainer = () => {
    const context = useContext(Context);

    if(!context) {
        throw new Error("Does not exist in provider")
    };

    const editFeedbackArray = [
        {id: 1, label: "Feedback Title", description: "Add a short, descriptive headline", input: <Input id={1} />, error: "Can’t be empty"},
        {id: 2, label: "Category", description: "Choose a category for your feedback", input: <EditSelectorInput id={2} type="category" modal={<CategoryModal />}/>},
        {id: 3, label: "Update Status", description: "Change feature state", input: <EditSelectorInput id={3} type="status" modal={<StatusModal />}/>}, 
        {id: 4, label: "Feedback Detail", description: "Include any specific comments on what should be improved, added, etc.", input: <TextareaInput id={4} errorText={"Can’t be empty"}/>},
    ];

    const { selectedFeedback, setIsAddFeedbackBtnPressed, setFeedbackList, feedbackList, openModal } = context;
    const { title } = selectedFeedback;
    const navigate = useNavigate();

    const handleClickOnCancel = () => {
        navigate(-1);
        setIsAddFeedbackBtnPressed(false);
    };

    const handleClickOnDelete = () => {
      openModal("deleteModal")
    };

    

  return (
    <div className='w-full bg-white rounded-[px] px-6 md:px-[42px] py-11 md:pt-[52px] md:pb-[40px] flex flex-col gap-6'>
        <BigHeading text={`Editing ‘${title}’`}/>
        <div className="flex flex-col gap-6">
          {editFeedbackArray.map(object => {
            const { id, label, description, input, error} = object;
            return <div key={id} className="flex flex-col gap-4"> <FormLabelAndInfo id={id} title={label} description={description} errorText={error}/> 
            {input}
            </div>})}
      </div>
        {/* <Input />
        <SelectorInput /> */}
        <div className="flex flex-col justify-between gap-4 mt-4 md:flex-row">
            <ButtonComponent 
            text="Delete"
            color="#D73737"
            dimensions="w-full md:w-[93px] h-10 md:h-[44px]"
            onClick={handleClickOnDelete}
            />
            <div className="flex flex-col gap-4 md:flex-row">
                <ButtonComponent 
                text="Cancel"
                color="#3A4374"
                dimensions="w-full md:w-[93px] h-10 md:h-[44px]"
                onClick={handleClickOnCancel}
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