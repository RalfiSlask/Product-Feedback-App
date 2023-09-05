import ButtonComponent from "../../components/ui/ButtonComponent";
import BigHeading from "./BigHeading";
import { useNavigate } from "react-router-dom";
import Input from "./Input";
import SelectorInput from "./SelectorInput";
import TextareaInput from "./TextareaInput";
import FormLabelAndInfo from "./FormLabelAndInfo";

const NewFeedbackContainer = () => {
  const newFeedbackArray = [
    {id: 1, label: "Feedback Title", description: "Add a short, descriptive headline", input: <Input />},
    {id: 1, label: "Category", description: "Choose a category for your feedback", input: <SelectorInput />},
    {id: 1, label: "Feedback Detail", description: "Include any specific comments on what should be improved, added, etc.", input: <TextareaInput />},
  ];

  const navigate = useNavigate();

  const handleClickOnCancel = () => {
    navigate(-1)
  };

  return (
    <div className='w-full bg-white rounded-[px] px-6 md:px-[42px] py-11 md:pt-[52px] md:pb-[40px] flex flex-col gap-6'>
      <BigHeading text="Create New Feedback"/>
      <div className="flex flex-col gap-6">
          {newFeedbackArray.map((object, index) => {
            const { id, label, description, input} = object;
            return <div className="flex flex-col gap-4"> <FormLabelAndInfo key={id} title={label} description={description} /> 
            {input}
            </div>})}
      </div>
      <div className="flex flex-col md:flex-row gap-4 mt-4 justify-end">
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
  )
}

export default NewFeedbackContainer