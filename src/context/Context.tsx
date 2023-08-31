import { createContext, ReactNode, useState, useEffect } from "react";

const Context = createContext<ContextVal | undefined>(undefined);

export type FilterProp = {
    id: number;
    text: string;
    selected: boolean;
}

type ContextVal = {
    windowWidth: number;
    windowSize: string;
    selectedOption: string;
    filterList: FilterProp[];
    modalActive: boolean;
    setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
    setFilterList: React.Dispatch<React.SetStateAction<FilterProp[]>>;
    toggleModal: () => void;
};

type ContextType = {
    children: ReactNode;
};

export const ContextProvider: React.FC<ContextType> = ( {children} ) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [windowSize, setWindowSize] = useState("");
    const [filterList, setFilterList] = useState([
        {id: 1, text: "Most Upvotes", selected: true},
        {id: 2, text: "Least Upvotes", selected: false},
        {id: 3, text: "Most Comments", selected: false},
        {id: 4, text: "Least Comments", selected: false}
    ]);
    const [selectedOption, setSelectedOption] = useState("Most Upvotes");
    const [modalActive, setModalActive] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth)
        }

        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, []);

    useEffect(() => {
        if(windowWidth < 768) {
            setWindowSize("mobile")
        } else if(windowWidth < 1280) {
            setWindowSize("tablet")
        } else {
            setWindowSize("desktop")
        }
    }, [windowWidth]);

    const toggleModal = () => {
        setModalActive(PrevState => !PrevState);
    };

    const contextValue: ContextVal = {
        windowWidth: windowWidth,
        windowSize: windowSize,
        selectedOption: selectedOption,
        filterList: filterList,
        modalActive: modalActive,
        setSelectedOption: setSelectedOption,
        setFilterList: setFilterList,
        toggleModal: toggleModal,
    };

    return (
        <Context.Provider value={contextValue}>
            {children}
        </Context.Provider>
    )

}

export default Context;