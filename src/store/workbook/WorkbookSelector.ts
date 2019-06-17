import {IWorkbook} from "store/workbook/WorkbookReducer";
import {createSelector} from "helpers/StoreHelper";
import {List, Map} from "immutable";

const workbookDataSelector: any = state => state.get("workbookData");

export const workbooksSelector: any = createSelector(
  workbookDataSelector, workbookData => workbookData.get("workbooks")
);

export const errorFieldsSelector: any = createSelector(
  workbookDataSelector, workbookData => workbookData.get("errorFields")
);

export const paginationSelector: any = createSelector(
  workbookDataSelector, workbookData => workbookData.get("pagination")
);

export const isLoadingSelector: any = createSelector(
  workbookDataSelector, workbookData => workbookData.get("isLoading")
);

export interface IWorkbookModuleProps extends Map<string, any> {
    workbooks: Map<string, IWorkbook>;
    errorFields: List<string>;
    pagination: {
        count: number;
        limit: number;
        offset: number;
    };
}

export interface IWorkbookSelectorVariables {
    errorFields?: boolean;
    pagination?: boolean;
    workbooks?: boolean;
    isLoading?: boolean;
}

export default {
    errorFields: errorFieldsSelector,
    pagination: paginationSelector,
    isLoading: isLoadingSelector,
    workbooks: workbooksSelector,
    main: workbooksSelector,
};
