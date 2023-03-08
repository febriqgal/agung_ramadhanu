import protectLogin from "@/protect/protect-login";
import React from "react";
import { getAuth, updateProfile } from "firebase/auth";
import Head from "next/head";
import { useState } from "react";
import { useForm } from "react-hook-form";
import app from "@/server/firebase";
import styles from "../../styles/Home.module.css";
import { toast, Toaster } from "react-hot-toast";

import { useRouter } from "next/router";
import Layout from "@/components/layout";
const EditNama = () => {
  const route = useRouter();
  const [isDisable, setDisable] = useState(false);
  const { register, handleSubmit, control } = useForm();
  const auth = getAuth(app);
  const user = auth.currentUser;
  const addDataImageHeader = async (data) => {
    const push = async () => {
      await updateProfile(auth.currentUser, {
        displayName: data.nama,
      });
      setDisable(true);
      setTimeout(() => {
        route.replace("/");
      }, 2000);
    };
    toast.promise(push(), {
      loading: "Mohon tunggu",
      success: <b>Berhasil mengganti nama</b>,
      error: <b>Terjadi kesalahan</b>,
    });
  };
  return (
    <>
      <div
        className={`${styles.main} bg-gradient-to-br from-sky-800 via-cyan-900 to-sky-700`}
      >
        <Toaster />
        <form onSubmit={handleSubmit(addDataImageHeader)}>
          <input
            type={"text"}
            maxLength={16}
            className="mb-2 py-1 px-3 rounded-lg mr-2 shadow-2xl"
            placeholder="Nama baru*"
            control={control}
            defaultValue={`${user.displayName}`}
            {...register("nama", { required: true, disabled: isDisable })}
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

export default protectLogin(EditNama);
