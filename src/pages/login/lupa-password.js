import app from "@/server/firebase";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import styles from "../../styles/Home.module.css";

import { useRouter } from "next/router";

export default function EditPassword() {
  const route = useRouter();
  const [isDisable, setDisable] = useState(false);
  const { register, handleSubmit, control } = useForm();
  const auth = getAuth(app);

  const resetPw = async (data) => {
    const push = async () => {
      await sendPasswordResetEmail(auth, data.email);
      setDisable(true);
      setTimeout(() => {
        route.replace("/");
      }, 3000);
    };
    toast.promise(push(), {
      loading: "Mohon tunggu",
      success: <b>Berhasil, Silahkan Cek Email.</b>,
      error: <b>Terjadi kesalahan</b>,
    });
  };
  return (
    <>
      <div
        className={`${styles.main} bg-gradient-to-br from-sky-800 via-cyan-900 to-sky-700`}
      >
        <Toaster />
        <form onSubmit={handleSubmit(resetPw)}>
          <input
            type={"email"}
            maxLength={100}
            className="mb-2 py-1 px-3 rounded-lg mr-2 shadow-2xl"
            placeholder="Masukkan Email"
            control={control}
            {...register("email", { required: true, disabled: isDisable })}
          />
          <button
            className="hover:bg-sky-700 shadow-2xl duration-1000 text-white hover:text-white mb-2 py-1 px-3 rounded-lg hover:cursor-pointer"
            type="submit"
            disabled={isDisable}
          >
            Kirim
          </button>
        </form>
      </div>
    </>
  );
}
