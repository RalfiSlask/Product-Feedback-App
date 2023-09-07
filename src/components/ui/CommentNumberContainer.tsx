import commentLogo from "../../assets/shared/icon-comments.svg";
import { CommentsType } from "../../ContextTypes";

const CommentNumberContainer: React.FC<{comments: CommentsType[] | undefined, suggestion?: boolean}> = ( {comments, suggestion} ) => {

  // Because there is different styling for this component depending if it is in suggestions or roadmap, i provide the prop suggestion as a boolean value

  return (
    <div className={`flex gap-2 items-center ${suggestion ? "-translate-y-1/2 md:absolute right-8 top-1/2" : ""}`}>
        <div>
          <img src={commentLogo} alt="number of comments" />
        </div>
        <p className={`${comments === undefined ? "opacity-50" : ""} text-[#3A4374] font-bold tracking-[-0.181px] md:text-[1rem]`}>{comments ? comments.length : 0}</p>
    </div>
  )
}

export default CommentNumberContainer