import {IWorkplace} from "store/workplace/WorkplaceReducer";
import {createSelector} from "helpers/StoreHelper";
import {List, Map} from "immutable";

const workplaceDataSelector: any = state => state.get("workplaceData");

export const workplacesSelector: any = createSelector(
  workplaceDataSelector, workplaceData => workplaceData.get("workplaces")
);

export const errorFieldsSelector: any = createSelector(
  workplaceDataSelector, workplaceData => workplaceData.get("errorFields")
);

export const paginationSelector: any = createSelector(
  workplaceDataSelector, workplaceData => workplaceData.get("pagination")
);

export const isLoadingSelector: any = createSelector(
  workplaceDataSelector, workplaceData => workplaceData.get("isLoading")
);

export interface IWorkplaceModuleProps extends Map<string, any> {
    workplaces: Map<string, IWorkplace>;
    errorFields: List<string>;
    pagination: {
        count: number;
        limit: number;
        offset: number;
    };
}

export interface IWorkplaceSelectorVariables {
    errorFields?: boolean;
    pagination?: boolean;
    workplaces?: boolean;
    isLoading?: boolean;
}

export default {
    errorFields: errorFieldsSelector,
    pagination: paginationSelector,
    workplaces: workplacesSelector,
    isLoading: isLoadingSelector,
    main: workplacesSelector,
};
