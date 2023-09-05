type PropsType = {
    color: string;
    statusType: string;
};

const StatusPanelWithColoredDot: React.FC<PropsType> = ( {color, statusType}) => {
  return (
    <div className="flex items-center gap-4">
        <p style={{backgroundColor: color}} className="w-2 h-2 rounded-full"></p>
        <p className="font-normal text-[1rem]">{statusType}</p>
    </div>
  )
}

export default StatusPanelWithColoredDot