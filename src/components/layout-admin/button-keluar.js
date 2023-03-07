import React from "react";
import { signOut } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
export default function ButtonKeluar() {
  const auth = getAuth();
  const route = useRouter();
  return (
    <button
      onClick={async () => {
        await signOut(auth);
        route.replace("/login");
      }}
      className="bg-red-500 py-1 px-5 mt-2 text-xs font-medium text-white rounded-lg"
    >
      Keluar
    </button>
  );
}
