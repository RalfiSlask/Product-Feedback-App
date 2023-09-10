import { ChangeEvent } from "react";

type PropsType = {
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
};

const PostReplyInput: React.FC<PropsType> = ( {onChange} ) => {
 
  return (
    <textarea onChange={onChange} style={{resize: "none"}} className="w-full h-20 outline-none rounded-[5px] bg-[#F7F8FD] p-4 cursor-pointer hover:border-[#4661E6] border border-[#F7F8FD]"></textarea>
  )
}

export default PostReplyInput