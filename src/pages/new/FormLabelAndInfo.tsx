type PropsType = {
    title: string;
    description: string;
}

const FormLabelAndInfo: React.FC<PropsType> = ( {title, description} ) => {
  return (
    <div className="flex flex-col gap-[2px]">
        <label className="font-bold text-[0.8125rem] md:text-[0.875rem] tracking-[-0.181px] text-[#3A4374]">{title}</label>
        <p className="text-[0.8125rem] md:text-[0.875rem] font-normal">{description}</p>
    </div>
  )
}

export default FormLabelAndInfo