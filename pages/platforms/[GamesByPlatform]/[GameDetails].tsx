import { GetServerSideProps } from "next";
import Layout from "../../../components/Layout";
import { getDatabase } from "../../../src/utils/database";
import React from "react";
export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const mongodb = await getDatabase();
  const data = await mongodb
    .db()
    .collection("games")
    .find({ name: `${context.params.GameDetails}` })
    .toArray();
  console.log(data);
  const datastring = JSON.stringify(data);

  return {
    props: {
      data: datastring,
    },
  };
};

export default function GameByPlatform({ data }: any) {
  const gameDetails = JSON.parse(data);
  console.log(gameDetails);
  return (
    <Layout>
      <section className="py-5">
        <div className="econtainer px-4 px-lg-5 my-5">
          <div className="row gx-4 gx-lg-5 align-items-center">
            {gameDetails.map((element: any, index: any) => {
              return (
                <div className="alignement">
                  <h5 className="display-5 fw-bolder">{element.name}</h5>
                  <p className="lead">{element.summary}</p>
                  <div key={index} style={{ maxWidth: "22rem" }}>
                    {element?.cover?.url ? (
                      <img
                        src={element.cover.url}
                        style={{ height: "40rem", width: "25rem" }}
                        className="card-img-top"
                      />
                    ) : (
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"
                        style={{ maxHeight: "18rem" }}
                        className="card-img-top"
                      />
                    )}
                  </div>{" "}
                </div>
              );
            })}
            <button
              className="btn btn-outline-primary my-2 my-sm-0"
              type="submit"
            >
              🛒
              <a href="/#">Ajouter au panier ?</a>🛒
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
