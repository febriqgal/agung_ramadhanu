/* eslint-disable @next/next/no-img-element */
import Layout from "@/components/layout";
import FooterC from "@/components/layout/footerC";
import { Loading } from "@nextui-org/react";
import { query, collection, getDocs } from "firebase/firestore";
import styles from "../../styles/Home.module.css";
import { db } from "@/server/firebase";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
export default function News() {
  const route = useRouter();
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
        <Layout>
          <div className={styles.main}>
            <Loading color={"white"} />
          </div>
        </Layout>
      </>
    );
  } else {
    const post = snapshot.current;
    const data = Object.values(post);
    return (
      <Layout title={"Informasi -"}>
        <div className={styles.main}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {data.map((e, i) => {
              const dataa = e.data();
              return (
                <div
                  onClick={() => {
                    route.push(`/informasi/${e.id}`);
                  }}
                  className="mx-auto hover:scale-110 duration-500 transition-all hover:cursor-pointer w-full rounded-xl shadow-lg border max-w-sm text-white hover:bg-white hover:text-black"
                  key={i}
                >
                  <img
                    className="rounded-t-xl"
                    alt="#"
                    src={`https://picsum.photos/700/500/?blur=2`}
                  />
                  <div className="p-7">
                    <h1 className={`${styles.truncate2} font-bold`}>
                      {`${dataa.judul}`.slice(0, 100)}
                    </h1>
                    <h1 className={`${styles.truncate3}`}>
                      {`${dataa.isi}`.slice(0, 100)}
                    </h1>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Layout>
    );
  }
}
