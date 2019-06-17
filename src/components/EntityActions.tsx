import Icon from "components/Icon";
import * as React from "react";

import * as styles from "assets/css/entityActions.css";

export default function EntityActions({ handleEdit, handleDelete }) {
  return (
    <div className={styles.actions}>
      <span
        className={styles.edit}
        onClick={handleEdit}
      >
        <Icon name="pencil" color="inherit" size={16} />
      </span>
      <span
        className={styles.delete}
        onClick={handleDelete}
      >
        <Icon name="trash" color="inherit" size={16} />
      </span>
    </div>
  );
}
