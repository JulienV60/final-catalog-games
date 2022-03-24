import Layout from "../components/Layout";
import React from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
export default function Account() {
  const { user } = useUser();

  return (
    <div>
      <Layout>
        <section className="py-5">
          <div className="econtainer px-4 px-lg-5 my-5">
            <div className="row gx-4 gx-lg-5 align-items-center">
              <div className="alignement">
                <h5 className="display-5 fw-bolder">{user?.nickname}</h5>
                <p className="lead">{user?.name}</p>
                <div style={{ maxWidth: "22rem" }}>
                  <img
                    src={user?.picture}
                    style={{ height: "40rem", width: "25rem" }}
                    className="card-img-top"
                  ></img>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </div>
  );
}
export const getServerSideProps = withPageAuthRequired();
