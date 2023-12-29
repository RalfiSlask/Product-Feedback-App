import GoBack from '../../components/ui/GoBack';
import AddFeedbackButton from '../../components/ui/AddFeedbackButton';

const RoadmapHeader = () => {
  return (
    <div className='bg-[#373F68] md:rounded-[10px] px-[24px] py-[26px] w-full h-full text-white flex justify-between items-center'>
      <div className='flex flex-col gap-[6px] w-[104px]'>
        <GoBack textColor={'white'} arrowColor={'#CDD2EE'} />
        <p className='font-bold text-[1.125rem] md:text-[1.5rem] tracking-[-0.25px]'>
          Roadmap
        </p>
      </div>
      <AddFeedbackButton />
    </div>
  );
};

export default RoadmapHeader;
