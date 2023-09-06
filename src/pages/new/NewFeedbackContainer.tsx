import ButtonComponent from "../../components/ui/ButtonComponent";
import BigHeading from "./BigHeading";
import { useNavigate } from "react-router-dom";
import Input from "./Input";
import CategoryInput from "./CategoryInput";
import TextareaInput from "./TextareaInput";
import FormLabelAndInfo from "./FormLabelAndInfo";
import Context from "../../context/Context";
import { useContext, useEffect } from "react";

const NewFeedbackContainer = () => {
  const context = useContext(Context);

  if(!context) {
      throw new Error("Does not exist in provider")
  }

  const { setIsAddFeedbackBtnPressed, newInputList, setNewInputList } = context;

  useEffect(() => {
    setNewInputList([
    {id: 1, label: "Feedback Title", input: ""},
    {id: 2, label: "Category", input: "Feature"},
    {id: 3, label: "Feedback Detail", input: ""},
    ])
  }, []);

  const clickOnAddFeedback = () => {
    const allInputsNotEmpty = newInputList.every((object => object.input !== ""))
    if(allInputsNotEmpty) {
      navigate("/")
      setIsAddFeedbackBtnPressed(false)
    } else {
      setIsAddFeedbackBtnPressed(true)
    }
  };
  
  const newFeedbackArray = [
    {id: 1, label: "Feedback Title", description: "Add a short, descriptive headline", input: <Input id={1} />, error: "Can’t be empty"},
    {id: 2, label: "Category", description: "Choose a category for your feedback", input: <CategoryInput id={2}/>},
    {id: 3, label: "Feedback Detail", description: "Include any specific comments on what should be improved, added, etc.", input: <TextareaInput id={3} errorText={"Can’t be empty"}/>},
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
            const { id, label, description, input, error} = object;
            return <div key={id} className="flex flex-col gap-4"> <FormLabelAndInfo id={id} title={label} description={description} errorText={error}/> 
            {input}
            </div>})}
      </div>
      <div className="flex flex-col justify-end gap-4 mt-4 md:flex-row">
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
          onClick={clickOnAddFeedback}
          />
      </div>
    </div>
  )
}

export default NewFeedbackContainer