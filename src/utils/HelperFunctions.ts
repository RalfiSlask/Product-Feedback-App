import { InputListType } from '../types/ContextTypes';
import { ProductRequestsType } from '../types/ContextTypes';

export const getInputByLabel = (label: string, list: InputListType[]) => {
  const item = list.find((object) => object.label === label);
  return item?.input ?? label;
};

export const getTextWithFirstUppercaseLetter = (text: string) => {
  return text.substring(0, 1).toUpperCase() + text.substring(1, text.length);
};

export const getInputByTypeFromList = (
  inputList: InputListType[],
  type: string
) => {
  const selectedOption = inputList.find(
    (object) => object.label === type
  )?.input;
  if (selectedOption) {
    return selectedOption;
  } else {
    return 'does not exist';
  }
};

export const getNextCommentId = (productRequests: ProductRequestsType[]) => {
  let maxCommentId = 0;
  productRequests.forEach((feedback) => {
    if (feedback.comments && feedback.comments?.length > 0) {
      feedback.comments.forEach((comment) => {
        maxCommentId = Math.max(maxCommentId, comment.id);
      });
    }
  });
  return maxCommentId + 1;
};
