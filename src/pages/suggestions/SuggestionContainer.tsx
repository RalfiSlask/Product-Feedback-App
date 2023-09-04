import { useEffect } from "react";
import HeadingMedium from "../../components/ui/HeadingMedium";
import { ProductRequestsType } from "../../context/Context"
import CommentNumberContainer from "./ui/CommentNumberContainer";
import UpvoteContainer from "./UpvoteContainer";

const SuggestionContainer: React.FC<{suggestion:ProductRequestsType}> = ( { suggestion } ) => {

     const {title, category, comments, description, upvotes} = suggestion;
     const largeCategory = category.substring(0, 1).toUpperCase() + category.substring(1, category.length);

    useEffect(() => {
      console.log(upvotes)
    })

  return (
    <div className='w-full h-[200px] md:h-[151px] bg-white rounded-[10px] p-6 md:px-[32px] md:py-[28px] relative flex flex-col justify-between cursor-pointer'>
        <div className="flex flex-col gap-2 md:ml-20">
            <HeadingMedium text={title} />
            <p className="text-[0.8125rem] md:text-[1rem] font-normal">{description}</p>
            <div>
              <div className="h-[30px] w-auto rounded-[10px] bg-[#F2F4FF] text-[#4661E6] inline-flex justify-center items-center font-semibold py-1 px-4">{largeCategory}</div>
            </div>
        </div>
        <div className="flex items-center justify-between">
            <UpvoteContainer upvotes={upvotes} />
            <CommentNumberContainer comments={comments} />
        </div>
    </div>
  )
}

export default SuggestionContainer