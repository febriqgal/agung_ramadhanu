/* eslint-disable @next/next/no-img-element */
import React from "react";
import Person from "../../../public/profile.jpeg";

import { getAuth } from "firebase/auth";
import ButtonKeluar from "./button-keluar";
export default function CardProfile() {
  const auth = getAuth();
  const user = auth.currentUser;
  return (
    <div className="flex-shrink-0 flex shadow-xl border-x-1 p-4 m-4 rounded-lg">
      <div className="flex items-center">
        <div>
          <img
            className="object-cover h-9 w-9 rounded-full"
            src={
              "https://scontent-sin6-2.xx.fbcdn.net/v/t39.30808-6/333588583_223198053496691_8569677633616432555_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeGi9tm7guVEF5Cnx_Wu66sUTrwVVN4STxdOvBVU3hJPFwfJlr1OaZe_nfIl5V2FRbL3CqEmNnw_xxIhRUGPKa-t&_nc_ohc=MBlGBOG0cmAAX_1wcqQ&_nc_ht=scontent-sin6-2.xx&oh=00_AfBfKWnWG21yM0VLxHU_MyBv2mDdKDpStcRTDW2DJxQTJw&oe=640C22A5"
            }
            alt={user.uid}
          />
        </div>
        <div className="ml-3">
          <h1 className="text-sm font-bold">{"Febriqgal"}</h1>
          <h1 className="text-xs  italic">{user.email ?? "-"}</h1>
          <ButtonKeluar />
        </div>
      </div>
    </div>
  );
}
