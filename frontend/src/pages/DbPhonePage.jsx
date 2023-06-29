import React from "react";
import styles from "./DbPhonePage.module.css";
import FilterSideBar from "../components/filtersSideBar/FilterSideBar";
import PhonesTable from "../components/phonesTable/PhonesTable";

function DbPhonePage() {
  return (
    <div className={styles.DbPhonePageContainer}>
      <FilterSideBar />
      <PhonesTable />
    </div>
  );
}

export default DbPhonePage;
