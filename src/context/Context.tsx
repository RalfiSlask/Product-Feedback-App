import { createContext, ReactNode, useState, useEffect } from "react";
import data from "../data/data.json";
import {
    ListType,
    ProductRequestsType,
    ModalState,
    InputListType,
    setListType,
} from "../types/ContextTypes";
import { getInputByLabel } from "../utils/HelperFunctions";

type ContextVal = {
    windowWidth: number;
    windowSize: string;
    selectedStatus: string;
    isAddFeedbackBtnPressed: boolean;
    modals: ModalState;
    filterList: ListType[];
    feedbackList: ProductRequestsType[];
    suggestions: ProductRequestsType[];
    categoryList: ListType[];
    categoryOptionList: ListType[];
    statusList: ListType[];
    newInputList: InputListType[];
    editInputList: InputListType[];
    selectedFeedback: ProductRequestsType;
    setFilterList: setListType;
    setCategoryOptionList: setListType;
    setCategoryList: setListType;
    setStatusList: setListType;
    setIsAddFeedbackBtnPressed: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedFeedback: React.Dispatch<React.SetStateAction<ProductRequestsType>>;
    setNewInputList: React.Dispatch<React.SetStateAction<InputListType[]>>;
    setFeedbackList: React.Dispatch<React.SetStateAction<ProductRequestsType[]>>;
    setEditInputList: React.Dispatch<React.SetStateAction<InputListType[]>>;
    toggleModal: (modalName: keyof ModalState) => void;
    closeModal: (modalName: string) => void;
    openModal: (modalName: string) => void;
    handleClickOnStatusSelector: (text: string) => void;
    updateNewInputList: (id: number, input: string, status: boolean) => void;
    selectOptionFromItemsOnClick: (text: string, List: ListType[], setList: setListType, modalName?: string) => void;
    filterSuggestionsByCategory: (text: string) => void;
    sortSuggestionsBySelectedOption: (text: string) => void;
    createNewFeedbackAndAddToList: () => void;
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

    // Modal Lists

    const [filterList, setFilterList] = useState([
        {id: 1, text: "Most Upvotes", selected: true},
        {id: 2, text: "Least Upvotes", selected: false},
        {id: 3, text: "Most Comments", selected: false},
        {id: 4, text: "Least Comments", selected: false}
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

    //  Category Filter List

    const [categoryList, setCategoryList] = useState([
        {id: 1, text: "All", selected: true},
        {id: 2, text: "UI", selected: false},
        {id: 3, text: "UX", selected: false},
        {id: 4, text: "Enhancement", selected: false},
        {id: 5, text: "Bug", selected: false},
        {id: 6, text: "Feature", selected: false},
    ]);
    
    // Input Lists (New / Edit)

    const [newInputList, setNewInputList] = useState<InputListType[]>([
        {id: 1, label: "title", input: "", interacted: false},
        {id: 2, label: "category", input: "Feature", interacted: true},
        {id: 3, label: "description", input: "", interacted: false},
    ]);
    const [editInputList, setEditInputList] = useState<InputListType[]>([
        {id: 1, label: "title", input: "", interacted: false},
        {id: 2, label: "category", input: "Feature", interacted: true},
        {id: 3, label: "status", input: "", interacted: true},
        {id: 4, label: "description", input: "", interacted: false}
    ]);
    const [selectedStatus, setSelectedStatus] = useState("In-Progress");
    const [modals, setModals] = useState({filterModal: false, categoryModal: false, statusModal: false, sidebar: false, deleteModal: false});
    const [feedbackList, setFeedbackList] = useState<ProductRequestsType[]>(initialFeedbackList ? JSON.parse(initialFeedbackList) : data.productRequests);
    const [isAddFeedbackBtnPressed, setIsAddFeedbackBtnPressed] = useState(false);
    const [suggestions, setSuggestions] = useState<ProductRequestsType[]>(feedbackList.filter(object => object.status === "suggestion"));
    const [selectedFeedback, setSelectedFeedback] = useState<ProductRequestsType>(initialFeedback ? JSON.parse(initialFeedback) : feedbackList[0]);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth)
        };

        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
        };
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
            setModals(prev => ({...prev, sidebar: false}))
        }
    }, [windowSize]);

    useEffect(() => {
        if(selectedFeedback !== null) {
            localStorage.setItem("selectedFeedback", JSON.stringify(selectedFeedback))
        }
    }, [selectedFeedback]);

    useEffect(() => {
        localStorage.setItem("feedbackList", JSON.stringify(feedbackList));
        setSuggestions(feedbackList.filter(object => object.status === "suggestion"));
    }, [feedbackList]);

    const toggleModal = (modalName: keyof ModalState) => {
        setModals(prev => ({...prev, [modalName]: !prev[modalName]}));
    };

    const closeModal = (modalName: string) => {
        setModals(prev => ({...prev, [modalName]: false}))
    };

    const openModal = (modalName: string) => {
        setModals(prev => ({...prev, [modalName]: true}))
    };

    const handleClickOnStatusSelector = (text: string) => {
        setSelectedStatus(text)
    };

    const selectOptionFromItemsOnClick = (text: string, List: ListType[], setList: setListType) => {
        const newList = [...List];
        newList.forEach(object => object.text === text ? object.selected = true : object.selected = false);
        setList(newList);
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
        const suggestionList = feedbackList.filter(object => object.status === "suggestion");
        if(text === "All") {
            setSuggestions(suggestionList)
        } else {
            setSuggestions(suggestionList.filter(object => object.category.toLowerCase() === text.toLowerCase()))
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

    const createNewFeedbackAndAddToList = () => {
        const titleInput = getInputByLabel("title", newInputList);
        const categoryInput = getInputByLabel("category", newInputList);
        const descriptionInput = getInputByLabel("description", newInputList);
        const newObject = {
            id: feedbackList.length + 1,
            title: titleInput,
            category: categoryInput,
            upvotes: 0,
            status: "suggestion",
            description: descriptionInput,
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
        suggestions: suggestions,
        selectedFeedback: selectedFeedback,
        editInputList: editInputList,
        // setters
        setFilterList: setFilterList,
        setCategoryOptionList: setCategoryOptionList,
        setIsAddFeedbackBtnPressed: setIsAddFeedbackBtnPressed,
        setNewInputList: setNewInputList,
        setCategoryList: setCategoryList,
        setSelectedFeedback: setSelectedFeedback,
        setFeedbackList: setFeedbackList,
        setStatusList: setStatusList,
        setEditInputList: setEditInputList,
        // functions
        toggleModal: toggleModal,
        closeModal: closeModal,
        openModal: openModal,
        handleClickOnStatusSelector: handleClickOnStatusSelector,
        updateNewInputList: updateNewInputList,
        selectOptionFromItemsOnClick: selectOptionFromItemsOnClick,
        filterSuggestionsByCategory: filterSuggestionsByCategory,
        sortSuggestionsBySelectedOption: sortSuggestionsBySelectedOption,
        createNewFeedbackAndAddToList: createNewFeedbackAndAddToList,
    };

    return (
        <Context.Provider value={contextValue}>
            {children}
        </Context.Provider>
    )

}

export default Context;