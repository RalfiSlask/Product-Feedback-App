import { createContext, ReactNode, useState, useEffect } from "react";
import data from "../data/data.json";

const Context = createContext<ContextVal | undefined>(undefined);

export type FilterProp = {
    id: number;
    text: string;
    selected: boolean;
};

type UserType = {
    image: string;
    name: string;
    username: string;
};

export type ProductRequestsType = {
    id: number;
    title: string;
    category: string;
    upvotes: number;
    status: string;
    description: string;
    comments?: CommentsType[];
};

type RepliesType = {content: string, replyingTo: string, user: UserType}[];

export type CommentsType = {
    id: number, 
    content: string, 
    user: UserType, 
    replies?: RepliesType
};

type ContextVal = {
    windowWidth: number;
    windowSize: string;
    selectedOption: string;
    filterList: FilterProp[];
    modalActive: boolean;
    feedbackList: ProductRequestsType[];
    setFilterList: React.Dispatch<React.SetStateAction<FilterProp[]>>;
    toggleModal: () => void;
    handleClickOnSortOption: (text: string) => void;
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
    const [feedbackList, setFeedbackList] = useState(data.productRequests);

    useEffect(() => {
        console.log(feedbackList)
    })

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

    const handleClickOnSortOption = (text: string) => {
        setSelectedOption(text)
        setModalActive(false)
        const newList = [...filterList];
        newList.forEach(object =>  object.text === text ? object.selected = true : object.selected = false)
        setFilterList(newList)
    };

    const toggleModal = () => {
        setModalActive(PrevState => !PrevState);
    };

    const contextValue: ContextVal = {
        windowWidth: windowWidth,
        windowSize: windowSize,
        selectedOption: selectedOption,
        filterList: filterList,
        modalActive: modalActive,
        feedbackList: feedbackList,
        setFilterList: setFilterList,
        toggleModal: toggleModal,
        handleClickOnSortOption: handleClickOnSortOption,
    };

    return (
        <Context.Provider value={contextValue}>
            {children}
        </Context.Provider>
    )

}

export default Context;