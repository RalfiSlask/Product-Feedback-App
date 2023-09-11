import { createContext, ReactNode, useState, useEffect } from "react";
import data from "../data/data.json";
import {
    ListType,
    ProductRequestsType,
    ModalState,
    InputListType,
    setListType,
} from "../types/ContextTypes";

type ContextVal = {
    windowWidth: number;
    windowSize: string;
    selectedStatus: string;
    isLightboxActive: boolean;
    sidebarActive: boolean;
    isAddFeedbackBtnPressed: boolean;
    modals: ModalState;
    filterList: ListType[];
    feedbackList: ProductRequestsType[];
    suggestions: ProductRequestsType[];
    categoryList: ListType[];
    categoryOptionList: ListType[];
    statusList: ListType[];
    newInputList: InputListType[];
    selectedFeedback: ProductRequestsType;
    setFilterList: setListType;
    setCategoryOptionList: setListType;
    setCategoryList: setListType;
    setIsAddFeedbackBtnPressed: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedFeedback: React.Dispatch<React.SetStateAction<ProductRequestsType>>;
    setNewInputList: React.Dispatch<React.SetStateAction<InputListType[]>>;
    setFeedbackList: React.Dispatch<React.SetStateAction<ProductRequestsType[]>>;
    toggleModal: (modalName: keyof ModalState) => void;
    toggleSidebar: () => void;
    handleClickOnStatusSelector: (text: string) => void;
    updateNewInputList: (id: number, input: string, status: boolean) => void;
    selectOptionFromItemsOnClick: (text: string, List: ListType[], setList: setListType, modalName?: string) => void;
    closeModal: (modalName: string) => void;
    filterSuggestionsByCategory: (text: string) => void;
    sortSuggestionsBySelectedOption: (text: string) => void;
};

const Context = createContext<ContextVal | undefined>(undefined);

type ContextType = {
    children: ReactNode;
};

const initialFeedback = localStorage.getItem("selectedFeedback");
const initialFeedbackList = localStorage.getItem("feedbackList");

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
        {id: 1, label: "title", input: "", interacted: false},
        {id: 2, label: "category", input: "Feature", interacted: true},
        {id: 3, label: "description", input: "", interacted: false},
    ]);
    const [selectedStatus, setSelectedStatus] = useState("In-Progress");
    const [modals, setModals] = useState({filterModal: false, categoryModal: false, statusModal: false});
    const [isLightboxActive, setIsLightboxActive] = useState(false);
    const [sidebarActive, setIsSidebarActive] = useState(false);
    const [feedbackList, setFeedbackList] = useState<ProductRequestsType[]>(initialFeedbackList ? JSON.parse(initialFeedbackList) : data.productRequests);
    const [isAddFeedbackBtnPressed, setIsAddFeedbackBtnPressed] = useState(false);
    const [suggestions, setSuggestions] = useState<ProductRequestsType[]>(feedbackList.filter(object => object.status === "suggestion"));
    const [selectedFeedback, setSelectedFeedback] = useState<ProductRequestsType>(initialFeedback ? JSON.parse(initialFeedback) : feedbackList[0]);

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

    useEffect(() => {
        if(windowSize !== "mobile") {
            setIsLightboxActive(false)
            setIsSidebarActive(false)
        }
    }, [windowSize]);

    useEffect(() => {
        if(selectedFeedback !== null) {
            localStorage.setItem("selectedFeedback", JSON.stringify(selectedFeedback))
        }
    }, [selectedFeedback]);

    useEffect(() => {
        localStorage.setItem("feedbackList", JSON.stringify(feedbackList))
    }, [feedbackList]);

    const toggleModal = (modalName: keyof ModalState) => {
        setModals(prev => ({...prev, [modalName]: !prev[modalName]}));
    };

    const toggleSidebar = () => {
        setIsLightboxActive(PrevState => !PrevState)
        setIsSidebarActive(PrevState => !PrevState)
    };

    const handleClickOnStatusSelector = (text: string) => {
        setSelectedStatus(text)
    };

    const selectOptionFromItemsOnClick = (text: string, List: ListType[], setList: setListType) => {
        const newList = [...List];
        newList.forEach(object => object.text === text ? object.selected = true : object.selected = false);
        setList(newList);
    };

    const closeModal = (modalName: string) => {
        setModals(prev => ({...prev, [modalName]: false}))
    };

    const updateNewInputList = (id: number, input: string | undefined, status: boolean) => {
        const updatedList = [...newInputList]
        const updatedInput = updatedList.find(object => object.id === id)
        if(updatedInput) {
            updatedInput.input = input;
        }
        setNewInputList(updatedList)
    };

    const filterSuggestionsByCategory = (text: string) => {
        if(text === "All") {
            setSuggestions(feedbackList.filter(object => object.status === "suggestion"))
        } else {
            const suggestionList = feedbackList.filter(object => object.status === "suggestion")
            setSuggestions(suggestionList.filter(object => object.category === text.toLowerCase()))
        }
    };

    const sortSuggestionsBySelectedOption = (text: string) => {
        const suggestionList = [...suggestions]; 

        suggestionList.sort((a, b) => {
            let valA;
            let valB;

            if(text.includes("Upvotes")) {
                valA = a.upvotes;
                valB = b.upvotes;
                return text.includes("Least") ? valA - valB : valB - valA
            } else if(text.includes("Comments")) {
                valA = a.comments ? a.comments.length : 0;
                valB = b.comments ? b.comments.length : 0;
                return text.includes("Least") ? valA - valB : valB - valA;
            } else {
                return 0
            }
        });
        setSuggestions(suggestionList)
    };

    const createNewFeedbackObject = () => {
        const inputsArray = newInputList.map(object => object.input)
        const obj = {...inputsArray}

        const newObject = {
            id: feedbackList.length + 1,
            title: inputsArray[0] ? inputsArray[0] : "",
            category: "",
            upvotes: 0,
            status: "suggestion",
            description: "",
        }
        setFeedbackList(prev => [...prev, newObject])
    };

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
        isLightboxActive: isLightboxActive,
        sidebarActive: sidebarActive,
        suggestions: suggestions,
        selectedFeedback: selectedFeedback,
        // setters
        setFilterList: setFilterList,
        setCategoryOptionList: setCategoryOptionList,
        setIsAddFeedbackBtnPressed: setIsAddFeedbackBtnPressed,
        setNewInputList: setNewInputList,
        setCategoryList: setCategoryList,
        setSelectedFeedback: setSelectedFeedback,
        setFeedbackList: setFeedbackList,
        // functions
        toggleModal: toggleModal,
        toggleSidebar: toggleSidebar,
        handleClickOnStatusSelector: handleClickOnStatusSelector,
        updateNewInputList: updateNewInputList,
        selectOptionFromItemsOnClick: selectOptionFromItemsOnClick,
        closeModal: closeModal,
        filterSuggestionsByCategory: filterSuggestionsByCategory,
        sortSuggestionsBySelectedOption: sortSuggestionsBySelectedOption,
    };

    return (
        <Context.Provider value={contextValue}>
            {children}
        </Context.Provider>
    )

}

export default Context;