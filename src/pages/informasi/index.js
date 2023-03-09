/* eslint-disable @next/next/no-img-element */
import Layout from "@/components/layout";
import LoadingC from "@/components/loading";
import { db } from "@/server/firebase";
import dayjs from "dayjs";
import "dayjs/locale/id";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import styles from "../../styles/Home.module.css";
import dibuat from "../../../public/dibuat.svg";
import Image from "next/image";
dayjs.locale("id");
dayjs.extend(relativeTime);
export default function News() {
  const route = useRouter();
  const snapshot = useRef(null);
  const [isLoading, setIsloading] = useState(true);
  const getDBFromFirestore = async () => {
    const querySnapshot = query(
      collection(db, "informasi"),
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
    return <LoadingC />;
  } else {
    const post = snapshot.current;
    const data = Object.values(post);
    return (
      <Layout title={"Informasi -"}>
        <div className="min-h-screen justify-center items-center flex flex-col py-24 px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {data.map((e, i) => {
              const dataa = e.data();
              return (
                <div
                  onClick={async () => {
                    route.push(`/informasi/${e.id}`);
                    const frankDocRef = doc(db, "informasi", `${e.id}`);
                    await updateDoc(frankDocRef, {
                      dilihat: dataa.dilihat + 1,
                    });
                  }}
                  className="mx-auto hover:scale-110 duration-500 transition-all hover:cursor-pointer w-full rounded-xl shadow-2xl border max-w-sm text-white hover:bg-white hover:text-black"
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

                    <h1 className="text-xs">
                      {`${dayjs(dataa.tanggal).fromNow()}`}
                    </h1>

                    <h1 className={`${styles.truncate3} font-light mt-2`}>
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
