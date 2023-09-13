import { createContext, ReactNode, useState, useEffect } from "react";
import data from "../data/data.json";
import {
    ListType,
    ProductRequestsType,
    InputListType,
    setListType,
    setInputListType,
} from "../types/ContextTypes";
import { getInputByLabel } from "../utils/HelperFunctions";

type FeedbackContextVal = {
    isAddFeedbackBtnPressed: boolean;
    filterList: ListType[];
    feedbackList: ProductRequestsType[];
    suggestions: ProductRequestsType[];
    categoryList: ListType[];
    newInputList: InputListType[];
    editInputList: InputListType[];
    selectedFeedback: ProductRequestsType;
    setFilterList: setListType;
    setCategoryList: setListType;
    setIsAddFeedbackBtnPressed: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedFeedback: React.Dispatch<React.SetStateAction<ProductRequestsType>>;
    setNewInputList: setInputListType;
    setFeedbackList: React.Dispatch<React.SetStateAction<ProductRequestsType[]>>;
    setEditInputList: setInputListType;
    updateInputListOnChange: (id: number, input: string | undefined, inputList: InputListType[], setInputList: setInputListType) => void;
    selectOptionFromItemsOnClick: (text: string, List: ListType[], setList: setListType, modalName?: string) => void;
    filterSuggestionsByCategory: (text: string) => void;
    sortSuggestionsBySelectedOption: (text: string) => void;
    createNewFeedbackAndAddToList: () => void;
};

const FeedbackContext = createContext<FeedbackContextVal | undefined>(undefined);

type ContextType = {
    children: ReactNode;
};

const initialFeedback = localStorage.getItem("selectedFeedback");
const initialFeedbackList = localStorage.getItem("feedbackList");

export const FeedbackContextProvider: React.FC<ContextType> = ( {children} ) => {
    // Modal Lists

    const [filterList, setFilterList] = useState([
        {id: 1, text: "Most Upvotes", selected: true},
        {id: 2, text: "Least Upvotes", selected: false},
        {id: 3, text: "Most Comments", selected: false},
        {id: 4, text: "Least Comments", selected: false}
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
    
    // Input Lists (New / Edit Feedback)

    const [newInputList, setNewInputList] = useState<InputListType[]>([
        {id: 1, label: "title", input: "", interacted: false},
        {id: 2, label: "category", input: "Feature", interacted: true},
        {id: 3, label: "description", input: "", interacted: false},
    ]);
    const [editInputList, setEditInputList] = useState<InputListType[]>([
        {id: 1, label: "title", input: "", interacted: false},
        {id: 2, label: "category", input: "", interacted: true},
        {id: 3, label: "status", input: "", interacted: true},
        {id: 4, label: "description", input: "", interacted: false}
    ]);
    const [feedbackList, setFeedbackList] = useState<ProductRequestsType[]>(initialFeedbackList ? JSON.parse(initialFeedbackList) : data.productRequests);
    const [isAddFeedbackBtnPressed, setIsAddFeedbackBtnPressed] = useState(false);
    const [suggestions, setSuggestions] = useState<ProductRequestsType[]>(feedbackList.filter(object => object.status === "suggestion"));
    const [selectedFeedback, setSelectedFeedback] = useState<ProductRequestsType>(initialFeedback ? JSON.parse(initialFeedback) : feedbackList[0]);

    useEffect(() => {
        const currentFeedback = {...selectedFeedback};
        const updatedEditList = [...editInputList];
        const updatedEditTitle = updatedEditList.find(object => object.label === "title")
        const updatedEditDescription = updatedEditList.find(object => object.label === "description")
        if(updatedEditTitle) {
            updatedEditTitle.input = currentFeedback.title
        }
        if(updatedEditDescription) {
            updatedEditDescription.input = currentFeedback.description;
        }
        setEditInputList(updatedEditList)
    }, [selectedFeedback]);

    useEffect(() => {
        console.log(editInputList)
    })

    useEffect(() => {
        if(selectedFeedback !== null) {
            localStorage.setItem("selectedFeedback", JSON.stringify(selectedFeedback))
        }
    }, [selectedFeedback]);

    useEffect(() => {
        localStorage.setItem("feedbackList", JSON.stringify(feedbackList));
        setSuggestions(feedbackList.filter(object => object.status === "suggestion"));
    }, [feedbackList]);

    const selectOptionFromItemsOnClick = (text: string, List: ListType[], setList: setListType) => {
        const newList = [...List];
        newList.forEach(object => object.text === text ? object.selected = true : object.selected = false);
        setList(newList);
    };

    const updateInputListOnChange = (id: number, input: string | undefined, inputList: InputListType[], setInputList: setInputListType) => {
        const updatedList = [...inputList]
        const updatedInput = updatedList.find(object => object.id === id)
        if(updatedInput) {
            updatedInput.input = input;
        }
        setInputList(updatedList)
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
        const categoryInput = getInputByLabel("category", newInputList).toLowerCase();
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

    const contextValue: FeedbackContextVal = {
        // states
        filterList: filterList,
        feedbackList: feedbackList,
        categoryList: categoryList,
        isAddFeedbackBtnPressed: isAddFeedbackBtnPressed,
        newInputList: newInputList,
        suggestions: suggestions,
        selectedFeedback: selectedFeedback,
        editInputList: editInputList,
        // setters
        setFilterList: setFilterList,
        setIsAddFeedbackBtnPressed: setIsAddFeedbackBtnPressed,
        setNewInputList: setNewInputList,
        setCategoryList: setCategoryList,
        setSelectedFeedback: setSelectedFeedback,
        setFeedbackList: setFeedbackList,
        setEditInputList: setEditInputList,
        // functions
        updateInputListOnChange: updateInputListOnChange,
        selectOptionFromItemsOnClick: selectOptionFromItemsOnClick,
        filterSuggestionsByCategory: filterSuggestionsByCategory,
        sortSuggestionsBySelectedOption: sortSuggestionsBySelectedOption,
        createNewFeedbackAndAddToList: createNewFeedbackAndAddToList,
    };

    return (
        <FeedbackContext.Provider value={contextValue}>
            {children}
        </FeedbackContext.Provider>
    )

}

export default FeedbackContext;