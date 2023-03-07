/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/display-name */
import { useRouter } from "next/router";
import { useUser } from "../context/user";
const protectPengaduan = (Pages) => {
  return (props) => {
    const user = useUser();
    const route = useRouter();
    const { uid } = user;

    if (!uid) {
      route.replace("/login");
      return <></>;
    }

    return <Pages {...props} />;
  };
};

export default protectPengaduan;
