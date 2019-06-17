import DayPickerInput from "react-day-picker/DayPickerInput";
import classNames from "classnames";
import * as React from "react";

import * as styles from "assets/css/input.css";
import 'react-day-picker/lib/style.css';

function formatDate(date) {
  if (!date) {
    return;
  }

  let value = date;

  if (typeof date === "string") {
    const [month, day, year] = value.replace(new RegExp("[^.0-9]+", "g"), " ").trim().split(" ");

    return `${day}/${month}/${year}`;
  }

  let month = value.getMonth() + 1;
  let day = value.getDate();

  if (day.toString().length === 1) {
    day = `0${day}`;
  }

  if (month.toString().length === 1) {
    month = `0${month}`;
  }

  return `${day}/${month}/${value.getFullYear()}`;
}

interface IInputProps {
  value: string;
  name: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  hasError?: boolean;
  isValid?: boolean;
  error?: string;
  type?: string;

  [key: string]: any;
}

export default function Input(props: IInputProps) {
  const {
    value,
    name,
    isValid = false,
    error = '',
    disabled = false,
    hasError = false,
    placeholder = '',
    className = '',
    type = "text",
    ...otherProps
  } = props;
  const inputWrapperClasses = classNames({
    [styles.inputWrapper]: true,
    [styles.disabled]: disabled,
    [styles.successWrapper]: isValid,
    [styles.errorWrapper]: !!error || hasError,
    [styles.hidden]: type === "hidden",
    [className]: true,
  });

  if (type === "date") {
    const onDayChange = day => (props.onChange && day) ?
      props.onChange({ currentTarget: { name, value: formatDate(day) } }) :
      undefined;

    const onDayEventChange = ({ currentTarget: { value } }) => {
      return props.onChange ?
        props.onChange({ currentTarget: { name, value: formatDate(value) } }) :
        undefined;
    };

    return (
      <React.Fragment>
        <DayPickerInput
          inputProps={{ className: styles.input, name, autoComplete: "off", onChange: onDayEventChange }}
          placeholder={placeholder}
          onDayChange={onDayChange}
          format="DD/MM/YYYY"
          value={value}
        />
        {error && (
          <span className={styles.error}>
          {error}
        </span>
        )}
      </React.Fragment>
    );
  }

  return (
    <div>
      <div className={inputWrapperClasses}>
        <input
          placeholder={placeholder}
          className={styles.input}
          autoComplete="off"
          value={value}
          type={type}
          name={name}
          {...otherProps}
        />
      </div>
      {error && (
        <p className={styles.error}>
          {error}
        </p>
      )}
    </div>
  )
}
