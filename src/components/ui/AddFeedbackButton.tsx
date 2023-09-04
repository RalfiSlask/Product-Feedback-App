import { useNavigate } from 'react-router-dom';

const AddFeedbackButton = () => {

    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate("/new")
    };

    return (
        <button onClick={handleClick} className={`bg-buttonPurple hover:bg-buttonPurpleHover h-10 md:h-11 w-[134px] md:w-[158px] flex flex-shrink-0 justify-center items-center rounded-[10px] text-[#F2F4FE] text-[0.813rem] font-bold cursor-pointer`}>+ Add Feedback</button>
    )
}

export default AddFeedbackButton