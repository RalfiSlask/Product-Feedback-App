import ButtonComponent from "../../components/ui/ButtonComponent";
import BigHeading from "../../components/ui/BigHeading";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import TextareaInput from "../../components/TextareaInput";
import FormLabelAndInfo from "../../components/FormLabelAndInfo";
import FeedbackContext from "../../context/FeedbackContext";
import { useContext, useEffect, useState } from "react";
import SelectorModal from "./SelectorModal";
import SelectorInput from "../../components/SelectorInput";

const NewFeedbackContainer = () => {
  const context = useContext(FeedbackContext);
  const navigate = useNavigate();

  if(!context) {
      throw new Error("Does not exist in provider")
  };

  const { setIsAddFeedbackBtnPressed, newInputList, setNewInputList, createNewFeedbackAndAddToList } = context;


  const [categoryList, setCategoryList] = useState([
    {id: 1, text: "UI", selected: false},
    {id: 2, text: "UX", selected: false},
    {id: 3, text: "Enhancement", selected: false},
    {id: 4, text: "Bug", selected: false},
    {id: 5, text: "Feature", selected: true},
  ]);

  const newFeedbackArray = [
    { id: 1, label: "Feedback Title", description: "Add a short, descriptive headline", error: "Can’t be empty",
      input: 
      <Input 
        id={1} 
        inputList={newInputList} 
        setInputList={setNewInputList}
      />,
    },
    { id: 2, label: "Category", description: "Choose a category for your feedback", 
      input: 
      <SelectorInput 
        id={2} 
        modalList={categoryList} 
        inputList={newInputList} 
        setInputList={setNewInputList} 
        modal={<SelectorModal optionList={categoryList} setOptionList={setCategoryList}/>}
      />
    },
    { id: 3, label: "Feedback Detail", description: "Include any specific comments on what should be improved, added, etc.", 
      input: 
      <TextareaInput 
        id={3} 
        errorText={"Can’t be empty"} 
        inputList={newInputList} 
        setInputList={setNewInputList}
      />
    },
  ];

  const clickOnAddFeedback = () => {
    const allInputsNotEmpty = newInputList.every((object => object.input !== ""))
    if(allInputsNotEmpty) {
      createNewFeedbackAndAddToList();
      navigate("/")
      setIsAddFeedbackBtnPressed(false)
    } else {
      setIsAddFeedbackBtnPressed(true)
    }
  };

  const handleClickOnCancel = () => {
    setNewInputList([
      {id: 1, label: "title", input: ""},
      {id: 2, label: "category", input: "Feature"},
      {id: 3, label: "description", input: ""},
      ])
    navigate(-1)
    setIsAddFeedbackBtnPressed(false)
  };

  return (
    <div className='w-full bg-white rounded-[px] px-6 md:px-[42px] py-11 md:pt-[52px] md:pb-[40px] flex flex-col gap-6'>
      <BigHeading text="Create New Feedback"/>
      <div className="flex flex-col gap-6">
          {newFeedbackArray.map(feedbackInfo => {
            const { id, input } = feedbackInfo;
            return <div key={id} className="flex flex-col gap-4"> <FormLabelAndInfo feedbackInfo={feedbackInfo} inputList={newInputList}/> 
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