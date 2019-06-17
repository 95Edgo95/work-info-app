import {
  attemptCreateWorkplace,
  attemptGetWorkplace,
  attemptUpdateWorkplace
} from "store/workplace/WorkplaceActionCreators";
import {mapDispatchToProps, mapStateToProps} from "helpers/ReduxHelper";
import {IWorkplace} from "store/workplace/WorkplaceReducer";
import {ISelectorVariables} from "services/selector";
import {RouteComponentProps} from "react-router";
import {connect} from "react-redux";
import Form from "components/Form";
import * as React from "react";
import {Map} from "immutable";

const inputs: any[] = [
  {
    placeholder: "Country",
    defaultValue: "",
    name: "country",
  },
  {
    placeholder: "City",
    defaultValue: "",
    name: "city",
  },
  {
    placeholder: "Company",
    defaultValue: "",
    name: "company",
  },
  {
    placeholder: "Start Date",
    defaultValue: "",
    name: "startDate",
    type: "date",
  },
  {
    placeholder: "End Date",
    defaultValue: "",
    name: "endDate",
    type: "date",
  },
];

interface IWorkplaceFormReduxProps {
  workplaces: Map<string, IWorkplace>;
}

interface IWorkplaceFormDispatchProps {
  attemptUpdateWorkplace: (data: any, id: string) => void;
  attemptCreateWorkplace: (data: any) => void;
  attemptGetWorkplace: (id: string) => void;
}

interface IWorkplaceFormProps extends RouteComponentProps<{ id: string; workbookId: string; }>, IWorkplaceFormReduxProps, IWorkplaceFormDispatchProps {}

function WorkplaceForm(props: IWorkplaceFormProps) {
  const {
    match: {params: {id, workbookId}},
    attemptCreateWorkplace,
    attemptUpdateWorkplace,
    attemptGetWorkplace,
    workplaces,
    history,
  } = props;

  const workplace: any = id ? workplaces.get(id) : Map({
    country: "",
    city: "",
    company: "",
    startDate: "",
    endDate: "",
  });

  const formInputs = [
    ...inputs,
    {
      defaultValue: workbookId,
      name: "workbookId",
      type: "hidden",
    }
  ];

  const validations = {
    country: [
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
    city: [
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
    company: [
      {
        type: "required",
        message: "Required!",
      },
      {
        type: "regex",
        option: /^[a-zA-Z\s]*$/gm,
        message: "Only letters and space!",
      }
    ],
    startDate: [
      {
        type: "required",
        message: "Required!",
      },
      {
        type: "is-before",
        option: "endDate",
        message: "Start date must be before end date!",
      }
    ],
    endDate: [
      {
        type: "required",
        message: "Required!",
      },
      {
        type: "is-after",
        option: "startDate",
        message: "End date must be after start date!",
      }
    ],
  };

  React.useEffect(() => {
    if (id && !workplace) {
      attemptGetWorkplace(id);
    }
  }, []);

  if (!workplace) {
    return null;
  }

  return (
    <Form
      attemptUpdateEntity={attemptUpdateWorkplace}
      attemptCreateEntity={attemptCreateWorkplace}
      entitiesSize={workplaces.size}
      validations={validations}
      inputs={formInputs}
      entity={workplace}
      history={history}
    />
  );
}

const actions = {
  attemptCreateWorkplace,
  attemptUpdateWorkplace,
  attemptGetWorkplace
};

const selectorVariables: ISelectorVariables = {
  workplace: {
    workplaces: true,
  }
};

export default connect<IWorkplaceFormReduxProps, IWorkplaceFormDispatchProps, any>(mapStateToProps(selectorVariables), mapDispatchToProps(actions))(WorkplaceForm);
