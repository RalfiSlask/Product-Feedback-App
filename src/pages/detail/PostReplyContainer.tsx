import PostReplyInput from './PostReplyInput';
import ButtonComponent from '../../components/ui/ButtonComponent';
import Context from '../../context/FeedbackContext';
import { useContext, useState, ChangeEvent } from 'react';
import data from "../../data/data.json";

type PropsType = {
  id: number,
  replyingTo: string;
  closeReply: () => void;
};

const PostReplyContainer: React.FC<PropsType> = ( { id, replyingTo, closeReply } ) => {
  const context = useContext(Context);
  
  if(!context) {
    throw new Error("Does not exist in provider");
  };

  const { selectedFeedback, feedbackList, setFeedbackList } = context;
  const [replyInput, setReplyInput] = useState("");

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setReplyInput(event.target.value)
  };
  
  const handleClick = () => {
    const updatedFeedbackList = [...feedbackList];
    const updatedFeedback = updatedFeedbackList.find(object => object.id === selectedFeedback.id);
    const currentComment = updatedFeedback?.comments?.find(object => object.id === id);
    const replyObject = {
      content: replyInput,
      replyingTo: replyingTo,
      user: data.currentUser,
    };
    if(currentComment) {
      currentComment.replies ? currentComment.replies.push(replyObject) : currentComment.replies = [replyObject]
    };
    setFeedbackList(updatedFeedbackList)
    closeReply();
  };

  return (
    <div className='flex items-start justify-between gap-4'>
        <PostReplyInput onChange={handleChange}/>
        <ButtonComponent 
            text="Post Reply"
            color="#AD1FEA"
            dimensions='w-[117px] h-10 md:h-[44px]'
            onClick={handleClick}
        />
    </div>
  )
}

export default PostReplyContainer