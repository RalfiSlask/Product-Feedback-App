import { useContext } from "react";
import Context from "../../context/Context";

type PropsType = {
    id: number;
    title: string;
    description: string;
    errorText?: string;
}

const FormLabelAndInfo: React.FC<PropsType> = ( {id, title, description, errorText} ) => {
  const context = useContext(Context);

  if(!context) {
      throw new Error("Does not exist in provider")
  }

  const { newInputList, isAddFeedbackBtnPressed } = context;

  const input = newInputList.find(object => object.id === id)?.input;

  const isItError = isAddFeedbackBtnPressed && input === "";

  return (
    <div className="flex flex-col gap-[2px]">
          <label className="font-bold text-[0.8125rem] md:text-[0.875rem] tracking-[-0.181px] text-[#3A4374]">{title}</label>
        <div className="flex justify-between items-center">
          <p className="text-[0.8125rem] md:text-[0.875rem] font-normal">{description}</p>
          {isItError && <p className="text-[#D73737] text-[0.8125rem] font-normal">{errorText}</p>}
        </div>
    </div>
  )
}

export default FormLabelAndInfo