import AddFeedbackButton from '../../../components/ui/AddFeedbackButton';
import logoEmpty from '../../../assets/suggestions/illustration-empty.svg';

const ThereIsNoFeedbackContainer = () => {
  return (
    <div className='w-[327px] md:w-[689px] h-[460px] md:h-[600px] xl:w-[825px] bg-white rounded-[10px] px-6 py-[76px] md:px-[138px] md:py-[110px] flex flex-col items-center justify-between'>
      <div>
        <img src={logoEmpty} alt='man looking through glass' />
      </div>
      <div className='flex flex-col gap-[14px] text-center'>
        <div className='font-bold text-[1.125rem] md:text-[1.5rem] text-[#3A4374] tracking-[-0.25px] md:tracking-[-0.333px]'>
          There is no feedback yet.
        </div>
        <p className='text-[0.8125rem] md:text-[1rem]'>
          Got a suggestion? Found a bug that needs to be squashed? We love
          hearing about new ideas to improve our app.
        </p>
      </div>
      <AddFeedbackButton />
    </div>
  );
};

export default ThereIsNoFeedbackContainer;
