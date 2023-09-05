import HeadingMedium from "../../components/ui/HeadingMedium";
import { ProductRequestsType } from "../../context/Context"
import CommentNumberContainer from "../../components/ui/CommentNumberContainer";
import UpvoteContainer from "../../components/UpvoteContainer";
import CategoryWrapperNotClickable from "../../components/ui/CategoryWrapperNotClickable";

const SuggestionContainer: React.FC<{suggestion:ProductRequestsType}> = ( { suggestion } ) => {

     const {title, category, comments, description, upvotes} = suggestion;


  return (
    <div className='w-full h-[200px] md:h-[151px] bg-white rounded-[10px] p-6 md:px-[32px] md:py-[28px] relative flex flex-col justify-between cursor-pointer'>
        <div className="flex flex-col gap-2 md:ml-20">
            <HeadingMedium text={title} />
            <p className="text-[0.8125rem] md:text-[1rem] font-normal">{description}</p>
            <CategoryWrapperNotClickable category={category}/>
        </div>
        <div className="flex items-center justify-between">
            <UpvoteContainer upvotes={upvotes} suggestion={true}/>
            <CommentNumberContainer comments={comments} suggestion={true} />
        </div>
    </div>
  )
}

export default SuggestionContainer