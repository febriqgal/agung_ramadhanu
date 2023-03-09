import LayoutAdmin from "@/components/layout-admin";
import { db } from "@/server/firebase";
import dayjs from "dayjs";
import "dayjs/locale/id";
import relativeTime from "dayjs/plugin/relativeTime";
import { getAuth } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
export default function TambahInformasi() {
  dayjs.locale("id");
  dayjs.extend(relativeTime);
  const { register, handleSubmit, control, reset } = useForm();
  const auth = getAuth();
  const user = auth.currentUser;
  const addDatafromDBFirestore = async (data) => {
    const push = async () => {
      await addDoc(collection(db, "modul"), {
        dibuat: user.displayName,
        modul: data.modul,
        deskripsi: data.deskripsi,
        dilihat: 0,
        link: data.link,
        tanggal: dayjs().format(),
      });
      reset();
    };
    toast.promise(push(), {
      loading: "Mohon tunggu...",
      success: <b>Berhasil menambahkan modul</b>,
      error: <b>Terjadi kesalahan, silahkan coba lagi.</b>,
    });
  };
  return (
    <LayoutAdmin titlee="Tambah Modul -">
      <Toaster />
      <form
        className="flex flex-col w-full md:w-[500px] m-auto pt-10 px-10 text-black"
        onSubmit={handleSubmit(addDatafromDBFirestore)}
      >
        <textarea
          className="mb-2 py-1 px-3 w-full rounded-lg mr-2 shadow-lg"
          placeholder="Masukan modul modul"
          control={control}
          {...register("modul", { required: true })}
        />

        <textarea
          rows={"6"}
          className="mb-2 py-1 px-3 w-full rounded-lg mr-2 shadow-lg"
          placeholder="Masukan deskripsi modul"
          control={control}
          {...register("deskripsi", { required: true })}
        />
        <textarea
          className="mb-2 py-1 px-3 w-full rounded-lg mr-2 shadow-lg"
          placeholder="Masukan link google drive"
          control={control}
          {...register("link", { required: true })}
        />
        <button
          className="hover:bg-white text-white hover:text-sky-700 w-full duration-1000 shadow-lg mb-2 py-1 px-3 rounded-lg hover:cursor-pointer"
          type="submit"
        >
          Kirim
        </button>
      </form>
    </LayoutAdmin>
  );
}
