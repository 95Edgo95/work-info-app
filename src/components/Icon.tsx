import classNames from "classnames";
import * as React from "react";

import * as styles from "assets/css/icon.css";

import "assets/images/svgSprite.icon.svg";

interface IIconProps {
  name: string;
  size?: number;
  className?: string;
  color?: string;
  style?: object;

  [key: string]: any;
}

export default function Icon({ name, size = 24, className = '', color = 'black', style = {}, ...props }: IIconProps) {
  const iconWrapperClasses = classNames({
    [styles.iconWrapper]: true,
    [className]: true,
  });

  return (
    <span
      className={iconWrapperClasses}
      style={{
        fontSize: `${size}px`,
        color,
        ...style,
      }}
      role='presentation'
      {...props}
    >
      <svg className={styles.icon}>
        <use xlinkHref={`#${name}`}/>
      </svg>
    </span>
  );
}
