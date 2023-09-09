import { RepliesType } from '../../ContextTypes';
import { useEffect } from "react";

const ReplyWrapper: React.FC<{reply: RepliesType}> = ( {reply} ) => {

    useEffect(() => {
        console.log(reply)
    })

  return (
    <div>ReplyWrapper</div>
  )
}

export default ReplyWrapper