import { useContext, useEffect, useState } from "react";
import Context from "../../context/Context";
import bgMobile from "../../assets/suggestions/mobile/background-header.png";
import bgTablet from "../../assets/suggestions/tablet/background-header.png";
import bgDesktop from "../../assets/suggestions/desktop/background-header.png";
import logoHamburger from "../../assets/shared/mobile/icon-hamburger.svg";
import logoClose from "../../assets/shared/mobile/icon-close.svg";

const FeedbackBoard = () => {
    const context = useContext(Context);
    const [image, setImage] = useState<string>();
    const [logo, setLogo] = useState<string>(logoHamburger);

    if(!context) {
        throw new Error("Does not exist in provider")
    }

    const { windowSize, toggleModal, modals } = context;

    useEffect(() => {
      if(windowSize !== "mobile") {
        setLogo(logoHamburger)
      }
    }, [windowSize])

    useEffect(() => {
      if(windowSize === "mobile") {
        setImage(bgMobile)
      } else if(windowSize === "tablet") {
        setImage(bgTablet) 
      } else if(windowSize === "desktop") {
        setImage(bgDesktop)
      }
    }, [windowSize])

    const handleClickOnLogo = () => {
      logo === logoHamburger ? setLogo(logoClose) : setLogo(logoHamburger)
      toggleModal("sidebar");
    };

  return (
    <div className={`${modals.sidebar ? "fixed z-50" : "static"} flex md:flex-col items-center md:items-start justify-between md:justify-end w-full h-[72px] md:h-[178px] xl:h-[133px] md:w-[223px] md:rounded-[10px] px-6 py-4 md:py-6`} style={{backgroundImage: `url(${image})`, backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "cover"}}>
      <div className="flex flex-col leading-normal text-white">
        <h2 className="tracking-[-0.187px] md:tracking-[-0.25px] font-bold text-[0.9375rem] md:text-[1.25rem]">Frontend Mentor</h2>
        <p className="font-medium opacity-75">Feedback Board</p>
      </div>
      {windowSize === "mobile" ? <img onClick={handleClickOnLogo} src={logo} alt="open/close sidebar" className="w-4 h-4 cursor-pointer"/> : null}
    </div>
  )
}

export default FeedbackBoard