import { useContext } from "react";
import Context from "../../context/Context";
import ModalSelectorOption from "../../components/ModalSelectorOption";

const StatusModal = () => {
    const context = useContext(Context);

    if(!context) {
        throw new Error("Does not exist in provider")
    };

    const { closeModal, selectOptionFromItemsOnClick, statusList, setStatusList } = context;

    const handleClick = (text: string) => {
        closeModal("statusModal");
        selectOptionFromItemsOnClick(text, statusList, setStatusList);
    };

    return (
        <div className="bg-white rounded-[10px] h-[240px] z-20 w-[279px] md:w-[456px] shadow-modalShadow flex flex-col justify-between overflow-hidden absolute top-16">
            {statusList.map(option => {
                return <ModalSelectorOption key={option.id} option={option} onClick={() => {handleClick(option.text)}}/>
            })}
        </div>
    )
}

export default StatusModal