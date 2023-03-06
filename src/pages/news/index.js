import Layout from "@/components/layout";
import FooterC from "@/components/layout/footerC";
import { Loading } from "@nextui-org/react";
import styles from "../../styles/Home.module.css";
export default function News() {
  // const snapshot = useRef(null);
  // const [isLoading, setIsloading] = useState(true);
  // const getDBFromFirestore = async () => {
  //   const querySnapshot = query(collection(db, "users"));
  //   const gettt = await getDocs(querySnapshot);
  //   snapshot.current = gettt.docs;
  //   setTimeout(() => {
  //     setIsloading(false);
  //   }, 1000);
  // };

  // useEffect(() => {
  //   getDBFromFirestore();
  // }, []);

  // if (isLoading) {
  return (
    <>
      <Layout className={styles.main}>
        <Loading color={"white"} />
        <FooterC />
      </Layout>
    </>
  );
  // } else {
  //   const post = snapshot.current;
  //   const data = Object.values(post);
  //   return (
  //     <Layout title={"News -"}>
  //       {data.map((e, i) => {
  //         const dataa = e.data();
  //         return <h1 key={i}>{dataa.title}</h1>;
  //       })}
  //       <div></div>
  //     </Layout>
  //   );
  // }
}
