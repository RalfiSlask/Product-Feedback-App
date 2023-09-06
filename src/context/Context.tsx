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

export type CategoryListType = {
    id: number, text: string, selected: boolean
}

type ModalState = {
    filterModal: boolean, categoryModal: boolean, statusModal: boolean
}

type InputListType = {
    id: number, label: string, input: string | undefined
}

type ContextVal = {
    windowWidth: number;
    windowSize: string;
    filterList: FilterProp[];
    modals: ModalState;
    feedbackList: ProductRequestsType[];
    categoryList: CategoryListType[];
    categoryOptionList: CategoryListType[];
    statusList: CategoryListType[];
    selectedStatus: string;
    isAddFeedbackBtnPressed: boolean;
    newInputList: InputListType[]
    setFilterList: React.Dispatch<React.SetStateAction<FilterProp[]>>;
    setIsAddFeedbackBtnPressed: React.Dispatch<React.SetStateAction<boolean>>;
    setNewInputList: React.Dispatch<React.SetStateAction<InputListType[]>>;
    toggleModal: (modalName: keyof ModalState) => void;
    handleClickOnSortOption: (text: string) => void;
    handleClickOnCategory: (text: string) => void;
    handleClickOnStatus: (text: string) => void;
    handleClickOnStatusSelector: (text: string) => void;
    updateNewInputList: (id: number, input: string) => void;
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
    const [categoryList, setCategoryList] = useState([
        {id: 1, text: "All", selected: true},
        {id: 2, text: "UI", selected: false},
        {id: 3, text: "UX", selected: false},
        {id: 4, text: "Enhancement", selected: false},
        {id: 5, text: "Bug", selected: false},
        {id: 6, text: "Feature", selected: false},
    ]);
    const [categoryOptionList, setCategoryOptionList] = useState([
        {id: 1, text: "UI", selected: false},
        {id: 2, text: "UX", selected: false},
        {id: 3, text: "Enhancement", selected: false},
        {id: 4, text: "Bug", selected: false},
        {id: 5, text: "Feature", selected: true},
    ]);
    const [statusList, setStatusList] = useState([
        {id: 1, text: "Suggestion", selected: false},
        {id: 2, text: "Planned", selected: false},
        {id: 3, text: "In-Progress", selected: false},
        {id: 4, text: "Live", selected: false},
    ]);
    const [newInputList, setNewInputList] = useState<InputListType[]>([
        {id: 1, label: "Feedback Title", input: ""},
        {id: 2, label: "Category", input: "Feature"},
        {id: 3, label: "Feedback Detail", input: ""},
    ]);
    const [selectedStatus, setSelectedStatus] = useState("In-Progress");
    const [modals, setModals] = useState({filterModal: false, categoryModal: false, statusModal: false});
    const [feedbackList, setFeedbackList] = useState(data.productRequests);
    const [isAddFeedbackBtnPressed, setIsAddFeedbackBtnPressed] = useState(false);

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

    const toggleModal = (modalName: keyof ModalState) => {
        setModals(prev => ({...prev, [modalName]: !prev[modalName]}));
    };

    const handleClickOnStatusSelector = (text: string) => {
        setSelectedStatus(text)
    };

    /* Making a conscious decision of repeating these functions instead of making a 
    single function to reduce future complexity */

    const handleClickOnSortOption = (text: string) => {
        setModals(prev => ({...prev, filterModal: false}))
        const newList = [...filterList];
        newList.forEach(object =>  object.text === text ? object.selected = true : object.selected = false)
        setFilterList(newList)
    };

    const handleClickOnCategory = (text: string) => {
        setModals(prev => ({...prev, categoryModal: false}))
        const newList = [...categoryOptionList];
        newList.forEach(object => object.text === text ? object.selected = true : object.selected = false);
        setCategoryOptionList(newList);
    };

    const handleClickOnStatus = (text: string) => {
        setModals(prev => ({...prev, statusModal: false}))
        const newList = [...statusList];
        newList.forEach(object => object.text === text ? object.selected = true : object.selected = false);
        setStatusList(newList);
    };

    const updateNewInputList = (id: number, input: string | undefined) => {
        const updatedList = [...newInputList]
        const updatedInput = updatedList.find(object => object.id === id)
        if(updatedInput) {
            updatedInput.input = input;
        }
        setNewInputList(updatedList)
    };

    useEffect(() => {
        console.log(newInputList)
    }, [newInputList])

    const contextValue: ContextVal = {
        // states
        windowWidth: windowWidth,
        windowSize: windowSize,
        filterList: filterList,
        modals: modals,
        feedbackList: feedbackList,
        selectedStatus: selectedStatus,
        categoryList: categoryList,
        categoryOptionList: categoryOptionList,
        statusList: statusList,
        isAddFeedbackBtnPressed: isAddFeedbackBtnPressed,
        newInputList: newInputList,
        // setters
        setFilterList: setFilterList,
        setIsAddFeedbackBtnPressed: setIsAddFeedbackBtnPressed,
        setNewInputList: setNewInputList,
        // functions
        toggleModal: toggleModal,
        handleClickOnSortOption: handleClickOnSortOption,
        handleClickOnCategory: handleClickOnCategory,
        handleClickOnStatus: handleClickOnStatus, 
        handleClickOnStatusSelector: handleClickOnStatusSelector,
        updateNewInputList: updateNewInputList,
    };

    return (
        <Context.Provider value={contextValue}>
            {children}
        </Context.Provider>
    )

}

export default Context;