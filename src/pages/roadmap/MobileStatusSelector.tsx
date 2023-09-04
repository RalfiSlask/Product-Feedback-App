import Selector from "./Selector";

type PropsType = {
    selectionArray: {
        id: number;
        status: string;
        info: string;
        color: string;
    }[]
}

const MobileStatusSelector: React.FC<PropsType> = ( { selectionArray }) => {

  return (
    <div className="w-[375px] flex h-[60px] items-center border-b border-opacity-25 border-[#8C92B3]">
        {selectionArray.map(object => <Selector key={object.id} status={object.status} color={object.color} />)}
    </div>
  )
}

export default MobileStatusSelector