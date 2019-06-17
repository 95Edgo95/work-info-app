import classNames from "classnames";
import * as React from "react";

import * as styles from "assets/css/button.css";

interface IButtonProps {
  type?: 'submit' | 'reset' | 'button';
  primary?: boolean;
  secondary?: boolean;
  disabled?: boolean;
  className?: string;
  children: any;

  [key: string]: any;
}

export default function Button(props: IButtonProps) {
  const {
    secondary = false,
    disabled = false,
    type = "button",
    primary = false,
    className = "",
    children,
    ...otherProps
  } = props;

  const buttonClasses = classNames({
    [styles.btn]: true,
    [styles.primary]: primary || !secondary,
    [styles.secondary]: secondary,
    [styles.disabled]: disabled,
    [className]: !!className,
  });

  return (
    <button
      className={buttonClasses}
      type={type}
      {...otherProps}
    >
      {children}
    </button>
  );
}
