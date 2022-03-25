import Layout from "../components/Layout";
import React from "react";
import { useUser } from "@auth0/nextjs-auth0";

export default function Home() {
  return (
    <div>
      <Layout>
        <section className="py-5">
          <div className="econtainer px-4 px-lg-5 my-5">
            <div className="row gx-4 gx-lg-5 align-items-center">
              <h5 className="display-5 fw-bolder"> 🚧In Progress🚧</h5>
              <h5 className="display-5 fw-bolder"> 🔧Features🔧</h5>
              <h5 className="display-5 fw-bolder"> ⬇️</h5>
              <h5 className="display-5 fw-bolder">👨‍🔧Protecting Routes/Api👨‍🔧</h5>
              <h5 className="display-5 fw-bolder"> 👨‍🔧Genres👨‍🔧</h5>
              <h5 className="display-5 fw-bolder"> 👨‍🔧Price Product👨‍🔧</h5>
              <h5 className="display-5 fw-bolder">
                👨‍🔧Delete Product if 0 quantity👨‍🔧
              </h5>
              <h5 className="display-5 fw-bolder"> 👨‍🔧CSS👨‍🔧</h5>
            </div>
          </div>
        </section>
      </Layout>
    </div>
  );
}
