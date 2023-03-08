/* eslint-disable @next/next/no-img-element */
import Layout from "@/components/layout";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import TypeIt from "typeit-react";
import Styles from "../styles/Home.module.css";
export default function Home() {
  return (
    <Layout>
      <div className={Styles.main}>
        <h1>Febriqgal</h1>
      </div>
    </Layout>
  );
}
