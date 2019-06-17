import {attemptCreateWorkbook, attemptGetWorkbook, attemptUpdateWorkbook} from "store/workbook/WorkbookActionCreators";
import {mapDispatchToProps, mapStateToProps} from "helpers/ReduxHelper";
import {IWorkbook} from "store/workbook/WorkbookReducer";
import {ISelectorVariables} from "services/selector";
import {RouteComponentProps} from "react-router";
import {connect} from "react-redux";
import Form from "components/Form";
import * as React from "react";
import {Map} from "immutable";

const inputs: any[] = [
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
  },
  {
    placeholder: "Birth Date",
    name: "birthDate",
    defaultValue: "",
    type: "date"
  },
];

interface IWorkbookFormReduxProps {
  workbooks: Map<string, IWorkbook>;
}

interface IWorkbookFormDispatchProps {
  attemptUpdateWorkbook: (data: any, id: string) => void;
  attemptCreateWorkbook: (data: any) => void;
  attemptGetWorkbook: (id: string) => void;
}

interface IWorkbookFormProps extends RouteComponentProps<{ id: string }>, IWorkbookFormReduxProps, IWorkbookFormDispatchProps {}

function WorkbookForm(props: IWorkbookFormProps) {
  const {
    attemptCreateWorkbook,
    attemptUpdateWorkbook,
    match: {params: {id}},
    attemptGetWorkbook,
    workbooks,
    history,
  } = props;

  const workbook: any = id ? workbooks.get(id) : Map({
    firstName: "",
    lastName: "",
    passport: "",
    email: "",
    birthDate: "",
  });

  const validations = {
    firstName: [
      {
        type: "required",
        message: "Required!",
      },
      {
        type: "regex",
        option: /^[a-zA-Z]+$/gm,
        message: "Only letters.",
      }
    ],
    lastName: [
      {
        type: "required",
        message: "Required!",
      },
      {
        type: "regex",
        option: /^[a-zA-Z]+$/gm,
        message: "Only letters.",
      }
    ],
    passport: [
      {
        type: "required",
        message: "Required!",
      },
      {
        type: "regex",
        option: /^[a-zA-Z0-9]+$/g,
        message: "Invalid passport number!",
      }
    ],
    email: [
      {
        type: "required",
        message: "Required!",
      },
      {
        type: "regex",
        option: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: "Invalid email!",
      }
    ],
    birthDate: [
      {
        type: "required",
        message: "Required!",
      },
      {
        type: "regex",
        option: /^[0-9]{1,2}[\/\s.,-][0-9]{1,2}[\/\s.,-][0-9]{4}$/gm,
        message: "Invalid Date!",
      },
      {
        type: "is18+",
        message: "Must be 18+!",
      }
    ],
  };

  React.useEffect(() => {
    if (id && !workbook) {
      attemptGetWorkbook(id);
    }
  }, []);

  if (!workbook) {
    return null;
  }

  return (
    <Form
      attemptUpdateEntity={attemptUpdateWorkbook}
      attemptCreateEntity={attemptCreateWorkbook}
      entitiesSize={workbooks.size}
      validations={validations}
      entity={workbook}
      history={history}
      inputs={inputs}
    />
  );
}

const actions = {
  attemptCreateWorkbook,
  attemptUpdateWorkbook,
  attemptGetWorkbook,
};

const selectorVariables: ISelectorVariables = {
  workbook: {
    workbooks: true,
  }
};

export default connect<IWorkbookFormReduxProps, IWorkbookFormDispatchProps, any>(mapStateToProps(selectorVariables), mapDispatchToProps(actions))(WorkbookForm);
