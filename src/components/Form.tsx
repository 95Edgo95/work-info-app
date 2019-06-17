import validator from "services/validator";
import Button from "components/Button";
import Input from "components/Input";
import * as React from "react";
import {Map} from "immutable";

import * as styles from "assets/css/form.css";

interface FormProps {
  attemptUpdateEntity: (data: any, id: string) => void;
  attemptCreateEntity: (data: any) => void;
  entity: Map<string, any>;
  entitiesSize: number;
  validations: any;
  inputs: any[];
  history: any;
}

let mounted = false;

export default function Form(props: FormProps) {
  const {
    entitiesSize,
    attemptCreateEntity,
    attemptUpdateEntity,
    history,
    entity,
    validations,
    inputs,
  } = props;

  let setStateMap = {};
  let fields = {};

  inputs.forEach(({ name, defaultValue }) => {
    const [field, setField]  = React.useState(entity ? entity.get(name) : defaultValue);

    setStateMap[name] = setField;
    fields[name] = field;
  });

  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

  function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = validator(fields, validations);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
    } else {
      if (Object.keys(errors).length > 0) {
        setErrors({});
      }

      if (entity.get("id")) {
        attemptUpdateEntity(fields, entity.get("id"));
      } else {
        attemptCreateEntity(fields);
      }
    }
  }

  function handleChange({currentTarget: {name, value}}) {
    setStateMap[name](value);
  }

  React.useEffect(() => {
    if (mounted) {
      history.push("/");
    }
  }, [entitiesSize]);

  if (entity.get("id")) {
    entity.valueSeq().forEach((value) => {
      React.useEffect(() => {
        if (mounted) {
          history.push("/");
        }
      }, [value]);
    });
  }

  React.useEffect(() => {
    mounted = true;

    return () => {
      mounted = false;
    }
  }, []);

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {inputs.map(({ placeholder, name, type }) => (
        <Input
          placeholder={placeholder}
          onChange={handleChange}
          error={errors[name]}
          value={fields[name]}
          name={name}
          type={type}
          key={name}
        />
      ))}
      <Button type="submit" className={styles.submitButton}>
        {(entity && entity.get("id")) ? "Update" : "Create"}
      </Button>
    </form>
  );
}
