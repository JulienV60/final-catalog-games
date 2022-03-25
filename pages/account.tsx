import Layout from "../components/Layout";
import { GetServerSideProps } from "next";
import React from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { getDatabase } from "../src/utils/database";
import Link from "next/link";

export const getServerSideProps: GetServerSideProps = async () => {
  const mongodb = await getDatabase();

  const data = await mongodb.collection("panier").find().toArray();

  const datastring = JSON.stringify(data);

  return {
    props: {
      data: datastring,
    },
  };
};

export default function Account({ data }: any) {
  let datarebuild = JSON.parse(data);
  const results = datarebuild[0].UserPanier;
  results.shift();

  const acc = results.reduce(function (acc: any, obj: any) {
    acc[obj.namegame] = (acc[obj.namegame] || 0) + obj.quantity;

    return acc;
  }, {});
  datarebuild = Object.keys(acc).map(function (key) {
    return { namegame: key, quantity: acc[key] };
  });

  const { user } = useUser();
  const [count, setCount] = React.useState(1);

  return (
    <div>
      <Layout>
        <section className="zqpy-5">
          <div className="econtainer px-4 px-lg-5 my-5">
            <div className="row gx-4 gx-lg-5 align-items-center">
              <div className="alignement">
                <h1>Panier</h1>
                <img
                  style={{ height: "8rem", width: "6rem" }}
                  className="card-img-top"
                ></img>{" "}
                <h5 className="display-5 fw-bolder">{user?.nickname}</h5>
                <p className="lead">{user?.name}</p>
                <div style={{ maxWidth: "22rem" }}></div>
              </div>
            </div>
            <h5 className="display-5 fw-bolder">Panier</h5>
            <div className="econtainer">
              <div className="row">
                {datarebuild.map((element: any, index: any) => {
                  return (
                    <div className="ecard text-white bg-secondary mb-3">
                      <div className="card-header">{element.namegame}</div>
                      <div className="card-body">
                        <h5 className="card-title">
                          Quantity: {element.quantity}
                        </h5>
                        <p className="card-text">
                          <Link
                            href={`/api/panier/addPanier?i&namegame=${element.namegame}&clickCount=${count}`}
                          >
                            <button type="button" className="btn btn-primary">
                              Add
                            </button>
                          </Link>
                          <Link
                            href={`/api/panier/addPanier/deletePanier?i&namegame=${element.namegame}&id=${element._id}&clickCount=${count}`}
                          >
                            <button type="button" className="btn btn-primary">
                              Delete 🚧In Progress🚧
                            </button>
                          </Link>
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </div>
  );
}
