import HeadingMedium from "../../components/ui/HeadingMedium";
import { ProductRequestsType } from "../../ContextTypes";
import CommentNumberContainer from "../../components/ui/CommentNumberContainer";
import UpvoteContainer from "../../components/UpvoteContainer";
import CategoryWrapperNotClickable from "../../components/ui/CategoryWrapperNotClickable";
import { useNavigate } from "react-router-dom";

const SuggestionContainer: React.FC<{suggestion:ProductRequestsType}> = ( { suggestion } ) => {

     const {id, title, category, comments, description, upvotes} = suggestion;

     const navigate = useNavigate();

     const handleClick = () => {
        navigate("/details")
     };

  return (
    <div onClick={handleClick} className='w-full h-[200px] md:h-[151px] bg-white rounded-[10px] p-6 md:px-[32px] md:py-[28px] relative flex flex-col justify-between cursor-pointer'>
        <div className="flex flex-col gap-2 md:ml-20">
            <HeadingMedium text={title} />
            <p className="text-[0.8125rem] md:text-[1rem] font-normal">{description}</p>
            <CategoryWrapperNotClickable category={category}/>
        </div>
        <div className="flex items-center justify-between">
            <UpvoteContainer upvotes={upvotes} suggestion={true} id={id}/>
            <CommentNumberContainer comments={comments} suggestion={true} />
        </div>
    </div>
  )
}

export default SuggestionContainer