import Icon from "components/Icon";
import * as React from "react";

import * as styles from "assets/css/cardRow.css";

interface IWorkbookInfoRowProps {
  value: string | number;
  tooltip: string;
  icon: string;
}

export default function CardRow({ icon, value, tooltip }: IWorkbookInfoRowProps) {
  return (
    <div className={styles.detail}>
      <Icon name={icon} title={tooltip} />
      <span className={styles.detailValue}>{value}</span>
    </div>
  );
}
