import React from "react";
import styles from "./FilterSideBar.module.css";

function FilterSideBar() {
  return (
    <div className={styles.filterSideBarContainer}>
      <div className={styles.sidebarTitleContainer}>Filtrer</div>
    </div>
  );
}

export default FilterSideBar;
