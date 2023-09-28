import { createContext, ReactNode, useState, useEffect, useCallback } from "react";
import data from "../data/data.json";
import {
    ListType,
    ProductRequestsType,
    InputListType,
    setListType,
    setInputListType,
    CommentObjectType,
    RepliesType,
} from "../types/ContextTypes";
import { getInputByLabel } from "../utils/HelperFunctions";
import { getInputByTypeFromList } from "../utils/HelperFunctions";

type FeedbackContextVal = {
    isAddFeedbackBtnPressed: boolean;
    filterList: ListType[];
    feedbackList: ProductRequestsType[];
    suggestions: ProductRequestsType[];
    categoryList: ListType[];
    newInputList: InputListType[];
    editInputList: InputListType[];
    selectedFeedback: ProductRequestsType;
    upvotedList: number[];
    setFilterList: setListType;
    setCategoryList: setListType;
    setIsAddFeedbackBtnPressed: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedFeedback: React.Dispatch<React.SetStateAction<ProductRequestsType>>;
    setNewInputList: setInputListType;
    setFeedbackList: React.Dispatch<React.SetStateAction<ProductRequestsType[]>>;
    setEditInputList: setInputListType;
    setUpvotedList: React.Dispatch<React.SetStateAction<number[]>>
    updateInputListOnChange: (id: number, input: string | undefined, inputList: InputListType[], setInputList: setInputListType) => void;
    selectOptionFromItemsOnClick: (text: string, List: ListType[], setList: setListType, modalName?: string) => void;
    filterSuggestionsByCategory: (text: string) => void;
    sortSuggestionsBySelectedOption: (text: string) => void;
    createNewFeedbackAndAddToList: () => void;
    updateEditFeedback: () => void;
    updateInputOnStart: (optionList: ListType[], key: keyof ProductRequestsType, setOptionList: setListType) => void;
    addNewComment: ( commentObject: CommentObjectType ) => void;
    addReplyToComment: ( replyObject: RepliesType, commentId: number ) => void;
};

const FeedbackContext = createContext<FeedbackContextVal | undefined>(undefined);

type ContextType = {
    children: ReactNode;
};

const storedFeedback = localStorage.getItem("selectedFeedback");
const storedFeedbackList = localStorage.getItem("feedbackList");
const storedUpvoteList = localStorage.getItem("upvoteList");

export const FeedbackContextProvider: React.FC<ContextType> = ( {children} ) => {
    const [feedbackList, setFeedbackList] = useState<ProductRequestsType[]>(storedFeedbackList ? JSON.parse(storedFeedbackList) : data.productRequests);
    const [isAddFeedbackBtnPressed, setIsAddFeedbackBtnPressed] = useState(false);
    const [suggestions, setSuggestions] = useState<ProductRequestsType[]>(feedbackList.filter(object => object.status === "suggestion"));
    const [selectedFeedback, setSelectedFeedback] = useState<ProductRequestsType>(storedFeedback ? JSON.parse(storedFeedback) : feedbackList[0]);
    
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
        {id: 1, label: "title", input: ""},
        {id: 2, label: "category", input: "Feature"},
        {id: 3, label: "description", input: ""},
    ]);
    const [editInputList, setEditInputList] = useState<InputListType[]>([
        {id: 1, label: "title", input: selectedFeedback.title},
        {id: 2, label: "category", input: ""},
        {id: 3, label: "status", input: ""},
        {id: 4, label: "description", input: selectedFeedback.description}
    ]);
    const [upvotedList, setUpvotedList] = useState<number[]>(storedUpvoteList ? JSON.parse(storedUpvoteList) : []);

    const addNewComment = ( commentObject: CommentObjectType) => {
        const updatedFeedbackList = feedbackList.map(feedback => {
            if(feedback.id !== selectedFeedback.id) {
                return feedback
            };

            // if comment array exists add the new comment, else create that comment array with the comment in it
            const updatedComments = feedback.comments? [...feedback.comments, commentObject] : [commentObject]
            return { ...feedback, comments: updatedComments}
        });

        // updating both the feedbackList and selectedFeedback
        const updatedSelectedFeedback = updatedFeedbackList.find(feedback => feedback.id === selectedFeedback.id);
     
        setFeedbackList(updatedFeedbackList)
        if(updatedSelectedFeedback) {
            setSelectedFeedback(updatedSelectedFeedback);
        };
    };

    const addReplyToComment = ( replyObject: RepliesType, commentId: number ) => {
        const updatedFeedbackList = feedbackList.map(feedback => {
            // Finding the current selected feedback
            if(feedback.id === selectedFeedback.id) {
                const updatedComments = feedback.comments?.map(comment => {
                    // If the comment matches the current comments Id
                    if(comment.id === commentId) {
                        return { 
                            ...comment, 
                            replies: comment.replies ? [...comment.replies, replyObject] : [replyObject] 
                        }
                    } 
                    return comment;  
                });
                // update with updatedComments
                return {...feedback, comments: updatedComments}  
            } 
            return feedback;
        });  
        setFeedbackList(updatedFeedbackList)
        const updatedSelectedFeedback = updatedFeedbackList.find(feedback => feedback.id === selectedFeedback.id);
        if(updatedSelectedFeedback) {
            setSelectedFeedback(updatedSelectedFeedback)
        }
    };

    const selectOptionFromItemsOnClick = (
        text: string, 
        list: ListType[], 
        setList: setListType
    ) => {
        const updatedList = [...list];
        updatedList.forEach(object => object.text === text ? object.selected = true : object.selected = false);
        setList(updatedList);
    };

    const updateInputListOnChange = useCallback((
        id: number, 
        input: string | undefined, 
        inputList: InputListType[], 
        setInputList: setInputListType
    ) => {
        const updatedList = inputList.map(item => {
            if(item.id === id) {
                return {...item, input: input}
            }
            return item;
        });

        if(JSON.stringify(updatedList) !== JSON.stringify(inputList)) {
            setInputList(updatedList)
        };
    }, []);

    const updateInputOnStart = useCallback((
        optionList: ListType[], 
        key: keyof ProductRequestsType, 
        setOptionList: setListType
    ) => {
        const updatedInputList = optionList.map(option => {
            if(option.text.toLowerCase() === selectedFeedback[key]) {
                return {...option, selected: true}
            }
            return option;
        })
        if(JSON.stringify(updatedInputList) !== JSON.stringify(optionList)) {
            setOptionList(updatedInputList);
        };
    }, [selectedFeedback]); 

    const updateEditFeedback = () => {
        const updatedList = feedbackList.map(feedback => {
            if(feedback.id === selectedFeedback.id) {
                return {...feedback, 
                    status: getInputByTypeFromList(editInputList, "status").toLowerCase(), 
                    category: getInputByTypeFromList(editInputList, "category").toLowerCase(),
                    title: getInputByTypeFromList(editInputList, "title"),
                    description: getInputByTypeFromList(editInputList, "description")
                }
            } return feedback;
        })
        setFeedbackList(updatedList);
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
        };
        setFeedbackList(prev => [...prev, newObject])
    };

    useEffect(() => {

        // adding the starting inputs for title and description from the selected Feedback

        const updatedEditList = editInputList.map(item => {
            if(item.label === "title") {
                return {...item, input: selectedFeedback.title}
            }
            if(item.label === "description") {
                return {...item, input: selectedFeedback.description}
            }
            return item
        });
    
        if(JSON.stringify(updatedEditList) !== JSON.stringify(editInputList)) {
            setEditInputList(updatedEditList)
        }; 

    }, [selectedFeedback, editInputList]); 

    useEffect(() => {
        localStorage.setItem("upvoteList", JSON.stringify(upvotedList));
    }, [upvotedList])

    useEffect(() => {
        if(selectedFeedback !== null) {
            localStorage.setItem("selectedFeedback", JSON.stringify(selectedFeedback));
        }
    }, [selectedFeedback]);

    useEffect(() => {
        localStorage.setItem("feedbackList", JSON.stringify(feedbackList));
        setSuggestions(feedbackList.filter(object => object.status === "suggestion"));
    }, [feedbackList]);

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
        upvotedList: upvotedList,
        // setters
        setFilterList: setFilterList,
        setIsAddFeedbackBtnPressed: setIsAddFeedbackBtnPressed,
        setNewInputList: setNewInputList,
        setCategoryList: setCategoryList,
        setSelectedFeedback: setSelectedFeedback,
        setFeedbackList: setFeedbackList,
        setEditInputList: setEditInputList,
        setUpvotedList: setUpvotedList,
        // functions
        updateInputListOnChange: updateInputListOnChange,
        selectOptionFromItemsOnClick: selectOptionFromItemsOnClick,
        filterSuggestionsByCategory: filterSuggestionsByCategory,
        sortSuggestionsBySelectedOption: sortSuggestionsBySelectedOption,
        createNewFeedbackAndAddToList: createNewFeedbackAndAddToList,
        updateEditFeedback: updateEditFeedback,
        updateInputOnStart: updateInputOnStart,
        addNewComment: addNewComment,
        addReplyToComment: addReplyToComment,
    };

    return (
        <FeedbackContext.Provider value={contextValue}>
            {children}
        </FeedbackContext.Provider>
    )

}

export default FeedbackContext;