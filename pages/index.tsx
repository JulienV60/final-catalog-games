import Layout from "../components/Layout";
import React from "react";
import { useUser } from "@auth0/nextjs-auth0";

export default function Home() {
  return (
    <div>
      <Layout></Layout>
    </div>
  );
}
