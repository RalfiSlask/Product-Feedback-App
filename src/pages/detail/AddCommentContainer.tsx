import ButtonComponent from '../../components/ui/ButtonComponent';
import { useState, ChangeEvent, useContext, useEffect } from "react";
import Context from '../../context/FeedbackContext';
import data from "../../data/data.json";
import { getNextCommentId } from '../../utils/HelperFunctions';

const AddCommentContainer: React.FC<{errorText: string}> = ( {errorText} ) => {
    const context = useContext(Context);
    const [isClicked, setIsClicked] = useState(false)
  
    if(!context) {
      throw new Error("Does not exist in provider");
    };

    const { feedbackList, selectedFeedback, setFeedbackList } = context;
    const [input, setInput] = useState("");
    const [charactersLeft, setCharactersLeft] = useState(250);
    
    const isItError = input === "" && isClicked;

    const handleClick = () => {
        setIsClicked(true)
        const updatedFeedbackList = [...feedbackList];
        const updatedFeedback = updatedFeedbackList.find(object => object.id === selectedFeedback.id);
        const commentObject = {
            id: getNextCommentId(feedbackList),
            content: input, 
            user: data.currentUser, 
        };
        if(updatedFeedback) {
            updatedFeedback.comments ? updatedFeedback.comments.push(commentObject) : updatedFeedback.comments = [commentObject]; 
        };
        if(!isItError) {
            setFeedbackList(updatedFeedbackList)
            setInput("");
            setCharactersLeft(250)
            setIsClicked(false)
        }
    };

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setInput(event.target.value)
        setIsClicked(false)
        setCharactersLeft(250 - event.target.value.length)
    };

  return (
    <div className='bg-white rounded-[10px] p-6 flex flex-col gap-6'>
        <div className='flex items-center justify-between'>
            <h2 className='text-[1.125rem] text-[#3A4374] tracking-[-0.25px] font-bold'>Add Comment</h2>
            {isItError && <p className="text-[#D73737] text-[0.8125rem] font-normal">{errorText}</p>}
        </div>
        <textarea 
            spellCheck="false" 
            onChange={handleChange} 
            value={input}
            style={{resize: "none"}} 
            placeholder='Type your comment here' 
            className={`${isItError ? "border-[#D73737]" : "border-[#F7F8FD] hover:border-[#4661E6]"} rounded-[5px] bg-[#F7F8FD] p-4 outline-none cursor-pointer w-full h-20 border`}>
        </textarea>
        <div className='flex items-center justify-between'>
            <p className='text-[0.825rem] md:text-[0.9375rem] font-normal'>{charactersLeft}<span></span> Characters left</p>
            <ButtonComponent 
                text="Post Comment" 
                color="#AD1FEA" 
                dimensions='w-[119px] md:w-[144px] h-10 md:h-[44px]'
                onClick={handleClick}
            />
        </div>
    </div>
  )
}

export default AddCommentContainer