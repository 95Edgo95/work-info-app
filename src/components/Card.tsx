import CardRow from "components/CardRow";
import Link from "react-router-dom/Link";
import * as React from "react";

import * as styles from "assets/css/card.css";

interface ICardProps {
  title?: string;
  link?: string;
  details: Array<{
    tooltip: string;
    icon: string;
    value: any;
  }>;
  children: any;
}

export default function Card({ title = '', link = '', details, children }: ICardProps) {
  const content = (
    <React.Fragment>
      {children}
      {title && (
        <div className={styles.detail}>
          {title}
        </div>
      )}
      {details.map(({value, icon, tooltip}) => (
        <CardRow
          tooltip={tooltip}
          value={value}
          icon={icon}
          key={value}
        />
      ))}
    </React.Fragment>
  );

  return link ? (
    <Link
      to={link}
      className={styles.card}
    >
      {content}
    </Link>
  ) : (
    <div className={styles.card}>
      {content}
    </div>
  );
}
