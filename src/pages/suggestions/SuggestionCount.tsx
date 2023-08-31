import lightbulb from "../../assets/suggestions/icon-suggestions.svg";

const SuggestionCount = () => {
  return (
    <div className='flex gap-4 items-center'>
        <img src={lightbulb} alt="lightbulb" />
        <div className='text-[1.125rem] font-bold tracking-[-0.25px]'><span>0</span> Suggestions</div>
    </div>
  )
}

export default SuggestionCount