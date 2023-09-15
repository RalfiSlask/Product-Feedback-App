import { ReactNode } from "react";

export type ListType = {
    id: number;
    text: string;
    selected: boolean;
};

export type UserType = {
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

export type FeedbackInfoType = {
    id: number;
    label: string;
    description: string;
    input: ReactNode; 
    error?: string;
};

export type SelectorInputType = {
    id: number;
    modal: ReactNode;
    modalList: ListType[];
    inputList: InputListType[];
    setInputList: setInputListType;
};

export type setListType = React.Dispatch<React.SetStateAction<ListType[]>>

export type setInputListType = React.Dispatch<React.SetStateAction<InputListType[]>>

export type RepliesType = {content: string, replyingTo: string, user: UserType};

export type CommentsType = {
    id: number, 
    content: string, 
    user: UserType, 
    replies?: RepliesType[]
};

export type ModalState = {
    filterModal: boolean, 
    categoryModal: boolean, 
    statusModal: boolean,
    sidebar: boolean,
    deleteModal: boolean,
};

export type InputListType = {
    id: number, label: string, input: string | undefined,
};



