import PostReplyInput from './PostReplyInput';
import ButtonComponent from '../../components/ui/ButtonComponent';
import Context from '../../context/FeedbackContext';
import { useContext, useState, ChangeEvent } from 'react';
import data from "../../data/data.json";

type PropsType = {
  commentId: number,
  replyingTo: string;
  closeReply: () => void;
};

const PostReplyContainer: React.FC<PropsType> = ( { commentId, replyingTo, closeReply } ) => {
  const [isError, setIsError] = useState(false);
  const [replyInput, setReplyInput] = useState("");
  const context = useContext(Context);
  
  if(!context) {
    throw new Error("Does not exist in provider");
  };

  const { addReplyToComment } = context;

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setReplyInput(event.target.value)
    setIsError(false)
  };
  
  const handleClick = () => {
    if(replyInput === "") {
      setIsError(true)
      return
    }
    const replyObject = {
      content: replyInput,
      replyingTo: replyingTo,
      user: data.currentUser,
    };
    addReplyToComment(replyObject, commentId)
    closeReply();
    setIsError(false)
  };

  return (
    <div className='flex items-start justify-between gap-4'>
        <PostReplyInput onChange={handleChange} isError={isError}/>
        <div className='flex flex-col items-center justify-between h-full'>
        <ButtonComponent 
            text="Post Reply"
            color="#AD1FEA"
            dimensions='w-[117px] h-10 md:h-[44px]'
            onClick={handleClick}
        />
         {isError && <p className="text-[#D73737] text-[0.8125rem] font-normal">Can’t be empty</p>}
        </div>
 
    </div>
  )
}

export default PostReplyContainer