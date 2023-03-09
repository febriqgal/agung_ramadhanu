/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import { Loading } from "@nextui-org/react";
import dayjs from "dayjs";
import "dayjs/locale/id";
import relativeTime from "dayjs/plugin/relativeTime";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { deleteObject, getStorage, ref } from "firebase/storage";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import { db } from "@/server/firebase";
import styles from "../../../../styles/Home.module.css";
import LoadingC from "@/components/loading";
export default function detail() {
  const { register, handleSubmit, control } = useForm();
  const [isLoading, setIsloading] = useState(true);
  const route = useRouter();
  const { idmodul } = route.query;
  const snapshot = useRef(null);
  const [isDisable, setIsDisble] = useState(false);
  dayjs.locale("id");
  dayjs.extend(relativeTime);

  const dataModul = async () => {
    const docRef = doc(db, "modul", `${idmodul}`);
    const docSnap = await getDoc(docRef);
    snapshot.current = docSnap.data();
    setIsloading(false);
  };
  const updateDataa = async (data) => {
    const push = async () => {
      const docRef = doc(db, "modul", `${idmodul}`);
      await updateDoc(docRef, {
        modul: data.modul,
        deskripsi: data.deskripsi,
        link: data.link,
      });
    };
    toast.promise(push(), {
      loading: "Menyimpan...",
      success: <b>Berhasil Edit Modul</b>,
      error: <b>Terjadi kesalahan, silahkan coba lagi!</b>,
    });
    setIsDisble(true);
  };

  useEffect(() => {
    dataModul();
  });
  if (isLoading) {
    return <LoadingC />;
  } else {
    const post = snapshot.current;

    return (
      <div className={`flex justify-center items-center flex-col min-h-screen`}>
        <Toaster />

        <form
          className="flex flex-col text-white w-full px-5 sm:w-[500px]"
          onSubmit={handleSubmit(updateDataa)}
        >
          <label className="text-center mb-2">
            Modul
            <textarea
              className=" text-black py-1 px-3 w-full rounded-lg mr-2 shadow-lg"
              placeholder="Masukkan modul"
              control={control}
              disabled={isDisable}
              defaultValue={post ? post.modul : ""}
              {...register("modul", { required: true })}
            />
          </label>
          <label className="text-center mb-2">
            Deskripsi
            <textarea
              rows={"10"}
              className=" text-black   1 px-3 w-full rounded-lg mr-2 shadow-lg"
              placeholder="Masukkan deskripsi"
              control={control}
              disabled={isDisable}
              defaultValue={post ? post.deskripsi : ""}
              {...register("deskripsi")}
            />
          </label>
          <label className="text-center mb-2">
            Link
            <textarea
              rows={"1"}
              className="mb-2 text-black px-3 w-full rounded-lg mr-2 shadow-lg"
              placeholder="Masukkan deskripsi"
              control={control}
              disabled={isDisable}
              defaultValue={post ? post.link : ""}
              {...register("link")}
            />
          </label>

          <button
            disabled={isDisable}
            className="hover:bg-white w-full duration-1000 shadow-lg hover:text-black mb-2 py-1 px-3 rounded-lg hover:cursor-pointer"
            type="submit"
          >
            Kirim
          </button>
        </form>
      </div>
    );
  }
}
