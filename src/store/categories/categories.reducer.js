import { CATEGORIES_TYPE } from "./categories.types";

const CATEGORIES_INITIAL_STATE = {
  categories: [],
};
export const categoriesReducer = (
  state = CATEGORIES_INITIAL_STATE,
  action = {}
) => {
  const { type, payload } = action;
  switch (type) {
    case CATEGORIES_TYPE.SET_CATEGORIES:
      return { ...state, categories: payload };
    default:
      return state;
  }
};
