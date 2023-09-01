import HeadingMedium from "../../components/ui/HeadingMedium";
import { ProductRequestsType } from "../../context/Context"
import CommentNumberContainer from "./CommentNumberContainer";
import UpvoteContainer from "./UpvoteContainer";

const SuggestionContainer: React.FC<{suggestion:ProductRequestsType}> = ( { suggestion } ) => {

     const {title, category, comments, description, upvotes} = suggestion;
     const largeCategory = category.substring(0, 1).toUpperCase() + category.substring(1, category.length);

  return (
    <div className='w-full h-[200px] md:h-[151px] bg-white rounded-[10px] p-6 md:px-[32px] md:py-[28px] relative flex flex-col justify-between cursor-pointer'>
        <div className="flex flex-col gap-2 md:ml-20">
            <HeadingMedium text={title} />
            <p className="text-[0.8125rem] md:text-[1.125rem] font-normal">{description}</p>
            <div className="max-w-[111px] h-[30px] rounded-[10px] bg-[#F2F4FF] text-[#4661E6] flex justify-center items-center font-semibold">{largeCategory}</div>
        </div>
        <div className="flex items-center justify-between">
            <UpvoteContainer upvotes={upvotes} />
            <CommentNumberContainer comments={comments} />
        </div>
    </div>
  )
}

export default SuggestionContainer