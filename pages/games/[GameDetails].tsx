import { GetServerSideProps } from "next";
import Layout from "../../components/Layout";
import { getDatabase } from "../../src/utils/database";
import React from "react";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";
export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const mongodb = await getDatabase();
  const data = await mongodb

    .collection("games")
    .find({ name: `${context.params.GameDetails}` })
    .toArray();

  const datastring = JSON.stringify(data);

  return {
    props: {
      data: datastring,
    },
  };
};

export default function GameByPlatform({ data }: any) {
  const { user } = useUser();
  const [count, setCount] = React.useState(0);
  const gameDetails = JSON.parse(data);
  const id = gameDetails[0]._id;
  const name = gameDetails[0].name;
  const userName = user?.nickname;
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
            })}{" "}
            <Link
              href={`/api/panier/addPanier?idgame=${id}&namegame=${name}&clickCount=${count}`}
            >
              <button
                className="btn btn-outline-success my-2 my-sm-0"
                type="submit"
                onClick={() => setCount(count + 1)}
              >
                Ajouter au panier ?🛒
              </button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
