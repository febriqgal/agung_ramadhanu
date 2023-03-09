import LayoutAdmin from "@/components/layout-admin";
import { db } from "@/server/firebase";
import dayjs from "dayjs";
import "dayjs/locale/id";
import relativeTime from "dayjs/plugin/relativeTime";
import { addDoc, collection } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import { getAuth } from "firebase/auth";
export default function TambahInformasi() {
  dayjs.locale("id");
  dayjs.extend(relativeTime);
  const { register, handleSubmit, control, reset } = useForm();
  const user = getAuth().currentUser;
  const addDatafromDBFirestore = async (data) => {
    const push = async () => {
      await addDoc(collection(db, "informasi"), {
        judul: data.judul,
        isi: data.isi,
        dilihat: 0,
        tanggal: dayjs().format(),
        penulis: user.displayName,
      });
      reset();
    };
    toast.promise(push(), {
      loading: "Mohon tunggu...",
      success: <b>Berhasil menambahkan informasi</b>,
      error: <b>Terjadi kesalahan, silahkan coba lagi.</b>,
    });
  };
  return (
    <LayoutAdmin titlee="Tambah Informasi -">
      <Toaster />
      <form
        className="flex flex-col w-full md:w-[500px] m-auto p-10 text-black"
        onSubmit={handleSubmit(addDatafromDBFirestore)}
      >
        <textarea
          className="mb-2 py-1 px-3 w-full rounded-lg mr-2 shadow-lg"
          placeholder="Masukan judul informasi"
          control={control}
          {...register("judul", { required: true })}
        />

        <textarea
          rows={"6"}
          className="mb-2 py-1 px-3 w-full rounded-lg mr-2 shadow-lg"
          placeholder="Masukan isi informasi"
          control={control}
          {...register("isi", { required: true })}
        />
        <button
          className="hover:bg-white w-full duration-1000 shadow-lg hover:text-sky-700 mb-2 py-1 px-3 rounded-lg hover:cursor-pointer text-white"
          type="submit"
        >
          Kirim
        </button>
      </form>
    </LayoutAdmin>
  );
}
