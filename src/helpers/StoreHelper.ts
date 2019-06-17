import {createSelectorCreator, defaultMemoize} from "reselect";
import {is} from "immutable";


export const createSelector: any = createSelectorCreator(defaultMemoize, is);
