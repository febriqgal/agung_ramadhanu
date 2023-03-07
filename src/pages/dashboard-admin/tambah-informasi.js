import LayoutAdmin from "@/components/layout-admin";
import { getAuth } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import dayjs from "dayjs";
import "dayjs/locale/id";
import { toast, Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import Image from "next/image";
import React, { useState } from "react";
import relativeTime from "dayjs/plugin/relativeTime";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/server/firebase";
import homeroute from "../../../public/homeroute.svg";
export default function TambahInformasi() {
  dayjs.locale("id");
  dayjs.extend(relativeTime);
  const { register, handleSubmit, control, reset } = useForm();
  const uid = uuidv4();
  const auth = getAuth();
  const user = auth.currentUser;
  const [imageUpload, setImageUpload] = useState();
  //   const storage = getStorage(app);
  //   const storageRef = ref(storage, `image/berita/${uid}`);

  const addDatafromDBFirestore = async (data) => {
    const push = async () => {
      //   if (imageUpload == null) return;
      //   await uploadBytes(storageRef, imageUpload);
      await addDoc(collection(db, "news"), {
        judul: data.judul,
        isi: data.isi,
        dilihat: 0,
        // gambar: storageRef.name,
      });
      reset();
    };
    toast.promise(push(), {
      loading: "Mohon tunggu...",
      success: <b>Berhasil menambahkan berita</b>,
      error: <b>Terjadi kesalahan, silahkan coba lagi.</b>,
    });
  };
  return (
    <LayoutAdmin>
      <div className="flex p-4 place-items-center gap-2">
        <Image width={20} src={homeroute} alt={"#"} />
        <h1 className="text-xs">Admin / Tambah Berita</h1>
      </div>
      <Toaster />
      <form
        className="flex flex-col w-full md:w-[500px] m-auto pt-10 px-10"
        onSubmit={handleSubmit(addDatafromDBFirestore)}
      >
        <textarea
          className="mb-2 py-1 px-3 w-full rounded-lg mr-2 shadow-lg"
          placeholder="Masukan judul berita"
          control={control}
          {...register("judul", { required: true })}
        />

        <textarea
          rows={"6"}
          className="mb-2 py-1 px-3 w-full rounded-lg mr-2 shadow-lg"
          placeholder="Masukan isi berita"
          control={control}
          {...register("isi", { required: true })}
        />
        <button
          className="hover:bg-gray-900 w-full duration-1000 shadow-lg hover:text-white mb-2 py-1 px-3 rounded-lg hover:cursor-pointer"
          type="submit"
        >
          Kirim
        </button>
      </form>
    </LayoutAdmin>
  );
}
