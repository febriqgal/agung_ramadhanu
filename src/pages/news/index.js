import Layout from "@/components/layout";
import FooterC from "@/components/layout/footerC";
import { Loading } from "@nextui-org/react";
import { query, collection, getDocs } from "firebase/firestore";
import styles from "../../styles/Home.module.css";
import { db } from "@/server/firebase";
import { useRef, useState, useEffect } from "react";
export default function News() {
  const snapshot = useRef(null);
  const [isLoading, setIsloading] = useState(true);
  const getDBFromFirestore = async () => {
    const querySnapshot = query(collection(db, "news"));
    const gettt = await getDocs(querySnapshot);
    snapshot.current = gettt.docs;
    setTimeout(() => {
      setIsloading(false);
    }, 1000);
  };

  useEffect(() => {
    getDBFromFirestore();
  }, []);

  if (isLoading) {
    return (
      <>
        <Layout className={styles.main}>
          <Loading color={"white"} />
          <FooterC />
        </Layout>
      </>
    );
  } else {
    const post = snapshot.current;
    const data = Object.values(post);
    return (
      <Layout title={"News -"}>
        {data.map((e, i) => {
          const dataa = e.data();
          return (
            <div key={i}>
              <h1>{dataa.judul}</h1>
              <h1>{dataa.isi}</h1>
            </div>
          );
        })}
        <div></div>
      </Layout>
    );
  }
}
