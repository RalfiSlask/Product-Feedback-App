import commentLogo from "../../../assets/shared/icon-comments.svg";
import { CommentsType } from "../../../context/Context";

const CommentNumberContainer: React.FC<{comments: CommentsType[] | undefined}> = ( {comments} ) => {
  return (
    <div className="flex gap-2 -translate-y-1/2 md:absolute right-8 top-1/2">
        <img src={commentLogo} alt="number of comments" />
        <p className={`${comments === undefined ? "opacity-50" : ""} text-[#3A4374] font-bold tracking-[-0.181px] md:text-[1rem]`}>{comments ? comments.length : 0}</p>
    </div>
  )
}

export default CommentNumberContainer