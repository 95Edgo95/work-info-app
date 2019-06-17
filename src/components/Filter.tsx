import Button from "components/Button";
import {Link} from "react-router-dom";
import Input from "components/Input";
import * as React from "react";

import * as styles from "assets/css/filter.css";

interface IFilterProps {
  additionalParams?: object;
  attemptGetEntities: (params: object) => void;
  inputs: Array<{
    placeholder: string;
    defaultValue: any;
    name: string;
  }>;
  showAddNew: boolean;
  createLink: string;
}

export default function Filter({ attemptGetEntities, inputs, createLink, additionalParams = {}, showAddNew }: IFilterProps) {
  const setStateMap: any = {};
  const fields: any = {};

  inputs.forEach(({ name, defaultValue }) => {
    const [value, setValue] = React.useState(defaultValue);
    setStateMap[name] = setValue;
    fields[name] = value;
  });

  function handleChange({ currentTarget: { name, value } }) {
    setStateMap[name](value);
  }

  function handleSearch() {
    const searchParams: any = { ...additionalParams };

    Object.keys(fields).forEach((field) => {
      if (fields[field]) {
        searchParams[field] = fields[field]
      }
    });

    attemptGetEntities(searchParams);
  }

  return (
    <div className={styles.filter}>
      {inputs.map(({ name, placeholder }) => (
        <Input
          placeholder={placeholder}
          onChange={handleChange}
          value={fields[name]}
          name={name}
          key={name}
        />
      ))}
      <Button onClick={handleSearch}>
        Search
      </Button>
      {showAddNew && (
        <Button secondary>
          <Link to={`/${createLink}/create`}>
            Add New
          </Link>
        </Button>
      )}
    </div>
  );
}
