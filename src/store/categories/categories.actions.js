import { CATEGORIES_TYPE } from "./categories.types";

import { createAction } from "../../utils/reducer/reducer.utils";

export const setCategories = (categories) =>
  createAction(CATEGORIES_TYPE.SET_CATEGORIES, categories);
