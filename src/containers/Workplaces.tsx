import {attemptDeleteWorkplace, attemptGetWorkplaces} from "store/workplace/WorkplaceActionCreators";
import {mapDispatchToProps, mapStateToProps} from "helpers/ReduxHelper";
import {IWorkbook} from "store/workbook/WorkbookReducer";
import {ISelectorVariables} from "services/selector";
import EntityActions from "components/EntityActions";
import CardsWrapper from "containers/CardsWrapper";
import {RouteComponentProps} from "react-router";
import Filter from "components/Filter";
import {connect} from "react-redux";
import * as React from "react";
import {Map} from "immutable";

interface IWorkplaceReduxProps {
  workplaces: Map<string, IWorkbook>;
  isLoading: boolean;
  pagination: any;
  role: string;
}

interface IWorkplaceDispatchProps {
  attemptDeleteWorkplace: (id: string) => void;
  attemptGetWorkplaces: (params: any) => void;
}

interface IWorkplaceProps extends IWorkplaceReduxProps, IWorkplaceDispatchProps, RouteComponentProps<any> {}

function Workplace(props: IWorkplaceProps) {
  const {
    match: {params: {workbookId}},
    attemptDeleteWorkplace,
    attemptGetWorkplaces,
    workplaces,
    pagination,
    isLoading,
    history,
    role,
  } = props;

  return (
    <React.Fragment>
      <Filter
        attemptGetEntities={attemptGetWorkplaces}
        createLink={`workplaces/${workbookId}`}
        additionalParams={{ workbookId }}
        showAddNew={role === "admin"}
        inputs={[
          {
            placeholder: "Country",
            defaultValue: "",
            name: "country",
          },
          {
            placeholder: "Company",
            defaultValue: "",
            name: "company",
          },
          {
            placeholder: "City",
            defaultValue: "",
            name: "city",
          }
        ]}
      />
      <CardsWrapper
        attemptGetEntities={attemptGetWorkplaces}
        params={{ workbookId }}
        entities={workplaces}
        getDetails={workplace => [
          {
            value: workplace.get("country"),
            tooltip: "Country",
            icon: "country"
          },
          {
            value: workplace.get("city"),
            tooltip: "City",
            icon: "city"
          },
          {
            value: workplace.get("company"),
            tooltip: "Company",
            icon: "company"
          },
          {
            value: workplace.get("startDate"),
            tooltip: "Start date",
            icon: "date"
          },
          {
            value: workplace.get("endDate"),
            tooltip: "End date",
            icon: "date"
          },
        ]}
        showActions={role === "admin"}
        pagination={pagination}
        isLoading={isLoading}
      >
        {id => (
          <EntityActions
            handleDelete={(event) => {
              event.preventDefault();
              attemptDeleteWorkplace(id)
            }}
            handleEdit={(event) => {
              event.preventDefault();
              history.push(`/workplaces/${workbookId}/${id}/edit`);
            }}
          />
        )}
      </CardsWrapper>
    </React.Fragment>
  );
}

const selectorVariables: ISelectorVariables = {
  workplace: {
    workplaces: true,
    pagination: true,
    isLoading: true
  },
  user: {
    role: true
  }
};

const actions = {
  attemptDeleteWorkplace,
  attemptGetWorkplaces
};

export default connect<IWorkplaceReduxProps, IWorkplaceDispatchProps, any>(mapStateToProps(selectorVariables), mapDispatchToProps(actions))(Workplace)
