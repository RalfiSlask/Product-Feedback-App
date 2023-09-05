import { useState } from "react";
import { ReactComponent as ArrowDown } from "../../assets/shared/icon-arrow-down.svg";
import { ReactComponent as ArrowUp } from "../../assets/shared/icon-arrow-up.svg";

const SelectorInput = ( ) => {
  const [category, setCategory] = useState("Feature")

  return (
    <div className="relative">
      <div className='w-full rounded-[5px] h-12 bg-[#F7F8FD] outline-none cursor-pointer text-[#3A4374] px-6'>
        <p>{category}</p>
      </div>
    </div>
  )
}

export default SelectorInput