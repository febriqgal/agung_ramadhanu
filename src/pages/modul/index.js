import Layout from "@/components/layout";
import FooterC from "@/components/layout/footerC";
import React from "react";
import Styles from "../../styles/Home.module.css";
export default function Modul() {
  return (
    <Layout title={"Project -"}>
      <div className={Styles.main}>
        <h1>Modul</h1>
      </div>
    </Layout>
  );
}
