import StatusContainer from "./StatusContainer"
import { useNavigate } from "react-router-dom";

const RoadmapContainer = () => {
  
  const statusList = [
    {id: 1, type: "Planned", color: "#F49F85"},
    {id: 2, type: "In-Progress", color: "#AD1FEA"},
    {id: 3, type: "Live", color: "#62BCFA"}
  ];

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/roadmap")
  };

  return (
    <div className='bg-white w-[223px] xl:w-[255px] h-[178px] rounded-[10px] p-6 flex flex-col justify-between'>
        <div className='flex items-center justify-between'>
            <p className='text-[1.125rem] font-bold text-[#3A4374] tracking-[-0.25px]'>Roadmap</p>
            <p onClick={handleClick} className='text-[#4661E6] font-semibold underline cursor-pointer hover:text-[#8397F8]'>View</p>
        </div>
        <div className="flex flex-col justify-between w-full h-[85px]">
          {statusList.map(status => <StatusContainer key={status.id} status={status}/>)}
        </div>
    </div>
  )
}

export default RoadmapContainer