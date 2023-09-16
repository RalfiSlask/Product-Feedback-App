import { ChangeEvent } from "react";

type PropsType = {
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  isError: boolean;
};

const PostReplyInput: React.FC<PropsType> = ( {onChange, isError} ) => {
 
  return (
    <textarea onChange={onChange} style={{resize: "none"}} className={`${isError ? "border-[#D73737]" : "border-[#F7F8FD] hover:border-[#4661E6] "} w-full h-20 outline-none rounded-[5px] bg-[#F7F8FD] p-4 cursor-pointer border`}></textarea>
  )
}

export default PostReplyInput