import * as React from "react";

import * as styles from "assets/css/loading.css";

export default function Loading() {
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.loader} />
      <div className={`${styles.loaderSection} ${styles.sectionLeft}`} />
      <div className={`${styles.loaderSection} ${styles.sectionRight}`} />
    </div>
  );
}
