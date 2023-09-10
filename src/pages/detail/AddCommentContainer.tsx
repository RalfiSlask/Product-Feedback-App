import ButtonComponent from '../../components/ui/ButtonComponent';
import { useState, ChangeEvent, useContext } from "react";
import Context from '../../context/Context';
import data from "../../data/data.json";

const AddCommentContainer = ( ) => {
    const context = useContext(Context);
  
    if(!context) {
      throw new Error("Does not exist in provider");
    };

    const { feedbackList, selectedFeedback, setFeedbackList } = context;
    const [input, setInput] = useState("");
    const [charactersLeft, setCharactersLeft] = useState(250);

    const handleClick = () => {
        const updatedFeedbackList = [...feedbackList];
        const updatedFeedback = updatedFeedbackList.find(object => object.id === selectedFeedback.id);
        
        const foundId = updatedFeedback?.comments ? updatedFeedback.comments?.length - 1 : 0;
        console.log(updatedFeedback?.comments)
   
        
        console.log(updatedFeedback?.comments)

        const commentObject = {
            id: 0,
            content: input, 
            user: data.currentUser, 
        };
        updatedFeedback?.comments?.push(commentObject);
        /* setFeedbackList(updatedFeedbackList) */
    };

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setCharactersLeft(250 - event.target.value.length)
    };

  return (
    <div className='bg-white rounded-[10px] p-6 flex flex-col gap-6'>
        <h2 className='text-[1.125rem] text-[#3A4374] tracking-[-0.25px] font-bold'>Add Comment</h2>
        <textarea onChange={handleChange} style={{resize: "none"}} placeholder='Type your comment here' className='rounded-[5px] bg-[#F7F8FD] p-4 outline-none cursor-pointer w-full h-20 hover:border-[#4661E6] border border-[#F7F8FD]'></textarea>
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