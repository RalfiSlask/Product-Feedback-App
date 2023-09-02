import lightbulb from "../../assets/suggestions/icon-suggestions.svg";

const SuggestionCount: React.FC<{count: number}> = ( {count} ) => {
  return (
    <div className='flex items-center gap-4'>
        <img src={lightbulb} alt="lightbulb" />
        <div className='text-[1.125rem] font-bold tracking-[-0.25px]'><span>{count}</span> Suggestions</div>
    </div>
  )
}

export default SuggestionCount