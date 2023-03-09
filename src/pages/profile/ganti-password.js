import protectLogin from "@/protect/protect-login";
import app from "@/server/firebase";
import { getAuth, updatePassword } from "firebase/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import styles from "../../styles/Home.module.css";

import { useRouter } from "next/router";
const EditPassword = () => {
  const route = useRouter();
  const [isDisable, setDisable] = useState(false);
  const { register, handleSubmit, control } = useForm();
  const auth = getAuth(app);
  const user = auth.currentUser;
  const gantiPw = async (data) => {
    const push = async () => {
      await updatePassword(user, data.password);
      setDisable(true);
      setTimeout(() => {
        route.replace("/");
      }, 3000);
    };
    toast.promise(push(), {
      loading: "Mohon tunggu",
      success: <b>Berhasil ganti password.</b>,
      error: <b>Terjadi kesalahan</b>,
    });
  };
  return (
    <>
      <div
        className={`${styles.main} bg-gradient-to-br from-sky-800 via-cyan-900 to-sky-700`}
      >
        <Toaster />
        <form onSubmit={handleSubmit(gantiPw)}>
          <input
            type={"password"}
            maxLength={16}
            className="mb-2 py-1 px-3 rounded-lg mr-2 shadow-2xl"
            placeholder="Password Baru"
            control={control}
            {...register("password", { required: true, disabled: isDisable })}
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
};

export default protectLogin(EditPassword);
