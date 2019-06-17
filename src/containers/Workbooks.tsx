import {attemptDeleteWorkbook, attemptGetWorkbooks} from "store/workbook/WorkbookActionCreators";
import {resetWorkplaceData} from "store/workplace/WorkplaceActionCreators";
import {mapDispatchToProps, mapStateToProps} from "helpers/ReduxHelper";
import {IWorkbook} from "store/workbook/WorkbookReducer";
import {RouteComponentProps} from "react-router-dom";
import {ISelectorVariables} from "services/selector";
import EntityActions from "components/EntityActions";
import CardsWrapper from "containers/CardsWrapper";
import Filter from "components/Filter";
import {connect} from "react-redux";
import * as React from "react";
import {Map} from "immutable";

interface IWorkbooksReduxProps {
  workbooks: Map<string, IWorkbook>;
  isLoading: boolean;
  pagination: any;
  role: string;
}

interface IWorkbooksDispatchProps {
  attemptDeleteWorkbook: (id: string) => void;
  attemptGetWorkbooks: (params: any) => void;
  resetWorkplaceData: () => void;
}

interface IWorkbooksProps extends IWorkbooksReduxProps, IWorkbooksDispatchProps, RouteComponentProps {}

function Workbooks(props: IWorkbooksProps) {
  const {
    attemptDeleteWorkbook,
    attemptGetWorkbooks,
    resetWorkplaceData,
    pagination,
    workbooks,
    isLoading,
    history,
    role,
  } = props;

  React.useEffect(() => {
    resetWorkplaceData();
  }, []);

  return (
    <React.Fragment>
      <Filter
        attemptGetEntities={attemptGetWorkbooks}
        showAddNew={role === "admin"}
        createLink="workbooks"
        inputs={[
          {
            placeholder: "First Name",
            name: "firstName",
            defaultValue: "",
          },
          {
            placeholder: "Last Name",
            defaultValue: "",
            name: "lastName",
          },
          {
            placeholder: "Passport",
            defaultValue: "",
            name: "passport",
          },
          {
            placeholder: "Email",
            defaultValue: "",
            name: "email",
          }
        ]}
      />
      <CardsWrapper
        attemptGetEntities={attemptGetWorkbooks}
        entities={workbooks}
        getDetails={workbook => [
          {
            value: workbook.get("email"),
            tooltip: "Email",
            icon: "email",
          },
          {
            value: workbook.get("passport"),
            tooltip: "Passport",
            icon: "passport",
          },
          {
            value: workbook.get("birthDate"),
            tooltip: "Birth Date",
            icon: "birthday",
          },
          {
            value: workbook.get("workplacesIds").size,
            tooltip: "Workplaces count",
            icon: "workplace",
          },
        ]}
        getTitle={workbook => `${workbook.get("firstName")} ${workbook.get("lastName")}`}
        getLink={workbook => `/workplaces/${workbook.get("id")}`}
        showActions={role === "admin"}
        pagination={pagination}
        isLoading={isLoading}
      >
        {id => (
          <EntityActions
            handleDelete={(event) => {
              event.preventDefault();
              attemptDeleteWorkbook(id)
            }}
            handleEdit={(event) => {
              event.preventDefault();
              history.push(`/workbooks/${id}/edit`);
            }}
          />
        )}
      </CardsWrapper>
    </React.Fragment>
  );
}

const selectorVariables: ISelectorVariables = {
  workbook: {
    workbooks: true,
    pagination: true,
    isLoading: true
  },
  user: {
    role: true,
  },
};

const actions = {
  attemptDeleteWorkbook,
  attemptGetWorkbooks,
  resetWorkplaceData,
};

export default connect<IWorkbooksReduxProps, IWorkbooksDispatchProps, any>(mapStateToProps(selectorVariables), mapDispatchToProps(actions))(Workbooks)
