import Layout from "../components/Layout";
import React from "react";
import { useUser } from "@auth0/nextjs-auth0";

export default function Home() {
  const [gameItems, setGameItems] = React.useState([]);
  const [isEmpty, setIsEmpty] = React.useState<boolean>(false);
  React.useEffect(() => {
    const gs = localStorage.getItem("games");
    if (!gs) {
      setIsEmpty(true);
      return;
    }
    const game = JSON.parse(gs);
  }, []);
  return (
    <div>
      <Layout></Layout>
    </div>
  );
}
