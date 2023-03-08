import Layout from "@/components/layout";
import { db } from "@/server/firebase";
import dayjs from "dayjs";
import "dayjs/locale/id";
import relativeTime from "dayjs/plugin/relativeTime";
import { getAuth } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import Styles from "../../../styles/Home.module.css";
export default function KirimTugas() {
  dayjs.locale("id");
  dayjs.extend(relativeTime);
  const auth = getAuth();
  const user = auth.currentUser;
  const route = useRouter();
  const { idmodul } = route.query;
  const { register, handleSubmit, control, reset } = useForm();
  const addDatafromDBFirestore = async (data) => {
    const push = async () => {
      await addDoc(collection(db, idmodul), {
        idmodul: idmodul,
        nama: user.displayName,
        namatugas: data.namatugas,
        tanggal: dayjs().format("ddd, MMM D, YYYY HH:mm"),
        urutan: dayjs().format(),
        link: data.link,
      });
      setTimeout(() => {
        route.back();
      }, 3000);
    };
    toast.promise(push(), {
      loading: "Mohon tunggu...",
      success: <b>Berhasil menambahkan berita</b>,
      error: <b>Terjadi kesalahan, silahkan coba lagi.</b>,
    });
  };
  return (
    <Layout>
      <Toaster />
      <div className={Styles.main}>
        <form
          className="flex flex-col w-full md:w-[500px] m-auto pt-10 px-10"
          onSubmit={handleSubmit(addDatafromDBFirestore)}
        >
          <textarea
            className="mb-2 py-1 px-3 w-full rounded-lg mr-2 shadow-lg"
            placeholder="Masukan Nama Tugas"
            {...register("namatugas", { required: true })}
          />

          <textarea
            rows={"6"}
            className="mb-2 py-1 px-3 w-full rounded-lg mr-2 shadow-lg"
            placeholder="Masukan Link Google Drive"
            {...register("link", { required: true })}
          />
          <button
            className="hover:bg-white w-full duration-1000 shadow-lg hover:text-sky-700 mb-2 py-1 px-3 rounded-lg hover:cursor-pointer"
            type="submit"
          >
            Kirim
          </button>
        </form>
      </div>
    </Layout>
  );
}
