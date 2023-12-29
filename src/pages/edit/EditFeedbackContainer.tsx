import UIContext from '../../context/UIContext';
import FeedbackContext from '../../context/FeedbackContext';
import { useContext, useState, useEffect } from 'react';
import BigHeading from '../../components/ui/BigHeading';
import ButtonComponent from '../../components/ui/ButtonComponent';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Input';
import TextareaInput from '../../components/TextareaInput';
import SelectorModal from '../new/SelectorModal';
import FormLabelAndInfo from '../../components/FormLabelAndInfo';
import SelectorInput from '../../components/SelectorInput';

const EditFeedbackContainer = () => {
  const uiContext = useContext(UIContext);
  const feedbackContext = useContext(FeedbackContext);

  if (!uiContext || !feedbackContext) {
    throw new Error('Does not exist in provider');
  }

  const { openModal } = uiContext;
  const {
    selectedFeedback,
    editInputList,
    setIsAddFeedbackBtnPressed,
    setEditInputList,
    updateEditFeedback,
    updateInputOnStart
  } = feedbackContext;
  const { title } = selectedFeedback;
  const navigate = useNavigate();

  useEffect(() => {
    setEditInputList([
      { id: 1, label: 'title', input: selectedFeedback.title },
      { id: 2, label: 'category', input: '' },
      { id: 3, label: 'status', input: '' },
      { id: 4, label: 'description', input: selectedFeedback.description }
    ]);
  }, [selectedFeedback.title, selectedFeedback.description, setEditInputList]);

  const [categoryList, setCategoryList] = useState([
    { id: 1, text: 'UI', selected: false },
    { id: 2, text: 'UX', selected: false },
    { id: 3, text: 'Enhancement', selected: false },
    { id: 4, text: 'Bug', selected: false },
    { id: 5, text: 'Feature', selected: false }
  ]);

  const [statusList, setStatusList] = useState([
    { id: 1, text: 'Suggestion', selected: false },
    { id: 2, text: 'Planned', selected: false },
    { id: 3, text: 'In-Progress', selected: false },
    { id: 4, text: 'Live', selected: false }
  ]);

  useEffect(() => {
    updateInputOnStart(categoryList, 'category', setCategoryList);
    updateInputOnStart(statusList, 'status', setStatusList);
  }, [updateInputOnStart, categoryList, statusList]);

  const editFeedbackArray = [
    {
      id: 1,
      label: 'Feedback Title',
      description: 'Add a short, descriptive headline',
      error: 'Can’t be empty',
      input: (
        <Input
          id={1}
          inputList={editInputList}
          setInputList={setEditInputList}
          inputText={selectedFeedback.title}
        />
      )
    },
    {
      id: 2,
      label: 'Category',
      description: 'Choose a category for your feedback',
      input: (
        <SelectorInput
          id={2}
          modalList={categoryList}
          inputList={editInputList}
          setInputList={setEditInputList}
          modal={
            <SelectorModal
              optionList={categoryList}
              setOptionList={setCategoryList}
            />
          }
        />
      )
    },
    {
      id: 3,
      label: 'Update Status',
      description: 'Change feature state',
      input: (
        <SelectorInput
          id={3}
          modalList={statusList}
          inputList={editInputList}
          setInputList={setEditInputList}
          modal={
            <SelectorModal
              optionList={statusList}
              setOptionList={setStatusList}
            />
          }
        />
      )
    },
    {
      id: 4,
      label: 'Feedback Detail',
      description:
        'Include any specific comments on what should be improved, added, etc.',
      input: (
        <TextareaInput
          id={4}
          errorText={'Can’t be empty'}
          inputList={editInputList}
          setInputList={setEditInputList}
          inputText={selectedFeedback.description}
        />
      )
    }
  ];

  const handleClickOnCancel = () => {
    navigate(-1);
    setIsAddFeedbackBtnPressed(false);
  };

  const handleClickOnAddFeedback = () => {
    const allInputsNotEmpty = editInputList.every(
      (object) => object.input !== ''
    );
    if (allInputsNotEmpty) {
      setIsAddFeedbackBtnPressed(false);
      updateEditFeedback();
      navigate('/');
    } else {
      setIsAddFeedbackBtnPressed(true);
    }
  };

  return (
    <div className='w-full bg-white rounded-[px] px-6 md:px-[42px] py-11 md:pt-[52px] md:pb-[40px] flex flex-col gap-6'>
      <BigHeading text={`Editing ‘${title}’`} />
      <div className='flex flex-col gap-6'>
        {editFeedbackArray.map((feedbackInfo) => {
          const { id, input } = feedbackInfo;
          return (
            <div key={id} className='flex flex-col gap-4'>
              {' '}
              <FormLabelAndInfo
                feedbackInfo={feedbackInfo}
                inputList={editInputList}
              />
              {input}
            </div>
          );
        })}
      </div>
      <div className='flex flex-col justify-between gap-4 mt-4 md:flex-row'>
        <ButtonComponent
          text='Delete'
          color='#D73737'
          dimensions='w-full md:w-[93px] h-10 md:h-[44px]'
          onClick={() => {
            openModal('deleteModal');
          }}
        />
        <div className='flex flex-col gap-4 md:flex-row'>
          <ButtonComponent
            text='Cancel'
            color='#3A4374'
            dimensions='w-full md:w-[93px] h-10 md:h-[44px]'
            onClick={handleClickOnCancel}
          />
          <ButtonComponent
            text='Add Feedback'
            color='#AD1FEA'
            dimensions='w-full md:w-[144px] h-10 md:h-[44px]'
            onClick={handleClickOnAddFeedback}
          />
        </div>
      </div>
    </div>
  );
};

export default EditFeedbackContainer;
