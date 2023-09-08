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

export type setListType = React.Dispatch<React.SetStateAction<ListType[]>>

export type RepliesType = {content: string, replyingTo: string, user: UserType}[];

export type CommentsType = {
    id: number, 
    content: string, 
    user: UserType, 
    replies?: RepliesType
};

export type ModalState = {
    filterModal: boolean, categoryModal: boolean, statusModal: boolean
};

export type InputListType = {
    id: number, label: string, input: string | undefined, interacted: boolean;
};



