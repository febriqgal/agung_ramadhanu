/* eslint-disable @next/next/no-img-element */
import Layout from "@/components/layout";
import LoadingC from "@/components/loading";
import { useUser } from "@/context/user";
import { db } from "@/server/firebase";
import { Modal, Tooltip } from "@nextui-org/react";
import dayjs from "dayjs";
import "dayjs/locale/id";
import relativeTime from "dayjs/plugin/relativeTime";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Toaster } from "react-hot-toast";
import dibuat from "../../../../public/dibuat.svg";
import dilihat from "../../../../public/dilihat.svg";
import editinformasi from "../../../../public/editinformasi.svg";
import hapus from "../../../../public/hapus.svg";
import penulis from "../../../../public/penulis.svg";
import styles from "../../../styles/Home.module.css";
export default function Index() {
  const [isLoading, setIsloading] = useState(true);
  const route = useRouter();
  const { id } = route.query;
  const users = useUser();
  const { email } = users;
  const [visible, setVisible] = useState(false);
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
  };
  const snapshot = useRef(null);
  dayjs.locale("id");
  dayjs.extend(relativeTime);
  const dataBerita = async () => {
    const docRef = doc(db, "informasi", `${id}`);
    const docSnap = await getDoc(docRef);
    snapshot.current = docSnap.data();
    setTimeout(() => {
      setIsloading(false);
    }, 1000);
  };
  useEffect(() => {
    dataBerita();
  });
  if (isLoading) {
    return <LoadingC />;
  } else {
    const post = snapshot.current;
    return (
      <Layout title={`${post.judul} - `}>
        <Toaster />

        <div className={`py-24 px-5`}>
          <div className={`border-2 overflow-hidden rounded-b-xl  rounded-lg`}>
            <div className="relative max-w-7xl mx-auto py-5 px-5 sm:px-6 lg:px-8">
              <div className="hidden lg:block absolute top-0 bottom-0 left-3/4 w-screen" />
              <div className="mx-auto text-base max-w-prose lg:grid lg:grid-cols-2 lg:gap-8 lg:max-w-none">
                <div className="flex bg-white flex-col rounded-lg shadow-xl p-4 lg:flex-row gap-1 lg:gap-0 lg:justify-evenly">
                  <div className="flex  items-center gap-2">
                    <Image src={penulis} width={20} alt={"#"} />
                    <h2 className="text-xs">{post.penulis}</h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <Image src={dilihat} width={20} alt={"#"} />
                    <h2 className="text-xs">{`${post.dilihat} kali`}</h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <Image src={dibuat} width={20} alt={"#"} />
                    <h3 className="uppercase text-xs">
                      {`${dayjs(post.tanggal).fromNow()}`}
                    </h3>
                  </div>
                  {email === "agungramadhanu@gmail.com" ? (
                    <>
                      <button
                        onClick={() => {
                          handler();
                        }}
                      >
                        <Tooltip content={"Hapus"}>
                          <Image width={20} src={hapus} alt={"#"} />
                        </Tooltip>
                      </button>
                      <Link href={`${id}/edit/${post.isi}`}>
                        <Tooltip content={"Edit"}>
                          <Image width={20} src={editinformasi} alt={"#"} />
                        </Tooltip>
                      </Link>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                {/* modal hapus */}
                <Modal
                  closeButton
                  blur
                  aria-labelledby="modal-title"
                  open={visible}
                  onClose={closeHandler}
                >
                  <Modal.Body>
                    <h1 className="text-center m-auto">Yakin Menghapus?</h1>
                    <button
                      className="bg-red-500 py-1 px-4 rounded-lg text-white"
                      onClick={async () => {
                        const docRef = doc(db, "informasi", `${id}`);
                        await deleteDoc(docRef);
                        route.push("/");
                        setTimeout(() => {
                          window.location.reload();
                        }, 3000);
                      }}
                    >
                      Hapus
                    </button>
                  </Modal.Body>
                </Modal>
              </div>
              <div className="mt-8 lg:grid lg:grid-cols-2 lg:gap-8">
                <div className="relative lg:row-start-1 lg:col-start-2">
                  <svg
                    className="hidden lg:block absolute top-0 right-0 -mt-20 -mr-20"
                    width={404}
                    height={384}
                    fill="none"
                    viewBox="0 0 404 384"
                    aria-hidden="true"
                  >
                    <defs>
                      <pattern
                        id="de316486-4a29-4312-bdfc-fbce2132a2c1"
                        x={0}
                        y={0}
                        width={20}
                        height={20}
                        patternUnits="userSpaceOnUse"
                      >
                        <rect
                          x={0}
                          y={0}
                          width={4}
                          height={4}
                          className="text-gray-200"
                          fill="currentColor"
                        />
                      </pattern>
                    </defs>
                    <rect
                      width={404}
                      height={384}
                      fill="url(#de316486-4a29-4312-bdfc-fbce2132a2c1)"
                    />
                  </svg>
                  <div className="relative text-base mx-auto max-w-prose lg:max-w-none">
                    <figure>
                      <div className="aspect-w-12 aspect-h-7 lg:aspect-none">
                        <img
                          className="rounded-lg shadow-lg object-cover object-center hover:scale-105 duration-1000"
                          src={`https://picsum.photos/700/500/?blur=2`}
                          alt={post.isi}
                          width={1184}
                          height={1376}
                        />
                      </div>
                    </figure>
                  </div>
                </div>
                <div className="mt-8 lg:mt-0">
                  <div className="text-base max-w-prose mx-auto lg:max-w-none">
                    <p className="text-xl font-bold text-white">{post.judul}</p>
                  </div>
                  <div className="mt-5 prose prose-indigo text-white mx-auto lg:max-w-none lg:row-start-1 lg:col-start-1">
                    <h1 className="text-justify">{post.isi}</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}
