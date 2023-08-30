type PropsType = {

}

const RoadmapContainer = () => {
  return (
    <div className='bg-white w-[13.938rem] h-[11.125rem]'>
        <div className='flex justify-between px-6 pt-5 pb-6'>
            <p className='text-[1.125rem] font-bold text-[#3A4374] tracking-[-0.25px]'>Roadmap</p>
            <p className='text-[#4661E6] font-semibold underline'>View</p>
        </div>
        <div className="flex flex-col justify-between">
            <div className="flex gap-4">
                <p>.</p>
                <p>Planned</p>
            </div>
            <p className="font-bold text-[#647196]">0</p>
        </div>
    </div>
  )
}

export default RoadmapContainer