import { GetServerSideProps } from "next";
import Layout from "../../components/Layout";
import { getDatabase } from "../../src/utils/database";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const mongodb = await getDatabase();
  const data = await mongodb

    .collection("games")
    .find({ "platform.name": `${context.params.GamesByPlatform}` })
    .toArray();
  const datastring = JSON.stringify(data);

  return {
    props: {
      data: datastring,
    },
  };
};

export default function GameByPlatform({ data }: any) {
  const gamesByPlatform = JSON.parse(data);
  const router = useRouter();
  const query = router.query.GamesByPlatform;
  return (
    <Layout>
      <div className="container">
        <div className="row">
          {gamesByPlatform.map((element: any, index: any) => {
            return (
              <Link key={index} href={`/platforms/${query}/${element.name}`}>
                <div
                  key={index}
                  className="col-sm-8"
                  style={{ maxWidth: "18rem" }}
                >
                  <div className="card">
                    {element?.cover?.url ? (
                      <img
                        src={element.cover.url}
                        style={{ height: "18rem" }}
                        className="card-img-top"
                      />
                    ) : (
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"
                        style={{ maxHeight: "18rem" }}
                        className="card-img-top"
                      />
                    )}
                    <div className="card-body">
                      <h5 className="card-title">{element.name}</h5>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
