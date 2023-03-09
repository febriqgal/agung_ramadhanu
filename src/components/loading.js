import React from "react";
import { Loading } from "@nextui-org/react";
export default function LoadingC() {
  return (
    <div className={`flex justify-center items-center min-h-screen`}>
      <Loading color={"white"} />
    </div>
  );
}
