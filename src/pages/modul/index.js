/* eslint-disable @next/next/no-img-element */
import Layout from "@/components/layout";
import { db } from "@/server/firebase";
import { Loading } from "@nextui-org/react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Modul from "../../../public/modul.svg";
import styles from "../../styles/Home.module.css";

export default function News() {
  const route = useRouter();
  const snapshot = useRef(null);
  const [isLoading, setIsloading] = useState(true);
  const getDBFromFirestore = async () => {
    const querySnapshot = query(
      collection(db, "modul"),
      orderBy("tanggal", "desc")
    );
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
      <Layout title={"Modul -"}>
        <div className={styles.main}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {data.map((e, i) => {
              const dataa = e.data();
              return (
                <div
                  onClick={() => {
                    route.push(`/modul/${e.id}`);
                  }}
                  className="flex items-center flex-col hover:scale-110 duration-500 transition-all hover:cursor-pointer w-full rounded-xl shadow-lg border max-w-sm text-white hover:bg-white hover:text-black"
                  key={i}
                >
                  <div className="w-full flex justify-center items-center">
                    <Image
                      color="#fffff"
                      height={150}
                      className="bg-sky-800 rounded-b-lg shadow-xl"
                      alt="#"
                      src={Modul}
                    />
                  </div>
                  <div className="p-7">
                    <h1 className={`${styles.truncate2} font-bold text-center`}>
                      {`${dataa.modul}`.slice(0, 100)}
                    </h1>
                    <h1 className={`${styles.truncate3} text-justify`}>
                      {`${dataa.deskripsi}`.slice(0, 100)}
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
