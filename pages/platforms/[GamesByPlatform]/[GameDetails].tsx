import { GetServerSideProps } from "next";
import Layout from "../../../components/Layout";
import { getDatabase } from "../../../src/utils/database";
import React from "react";

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const mongodb = await getDatabase();
  const data = await mongodb

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

type Jeu = {
  id: number;
  code: number;
  cover: {
    id: number;
    alpha_channel: boolean;
    animated: boolean;
    game: number;
    height: number;
    image_id: string;
    url: string;
    width: number;
    checksum: string;
  };
  first_release_date: number;
  genres: string[];
  name: string;
  platform: { name: string; platform_logo_url: string; url: string };
  slug: string;
  summary: string;
  url: string;
};
type props = {
  jeu: Jeu;
  jeux: Jeu[];
};

type gameItem = {
  jeux: {
    id: number;
    qty: number;
  };
};
let game: gameItem;
export default function GameByPlatform(
  { data }: any,
  { jeu }: props
): React.ReactElement {
  const gameDetails = JSON.parse(data);
  function addToCart(): void {
    const gs = localStorage.getItem("games");

    let isAdded = false;
    if (!gs) {
      game = {
        jeux: [{ id: game, qty: 1 }],
      };
    } else {
      game = JSON.parse(gs);
      game.jeux = game.jeux.map((element) => {
        if (element.id === jeu.id) {
          isAdded = true;
          return { id: element.id, qty: element.qty + 1 };
        }

        return { id: element.id, qty: element.qty };
      });
    }
    if (!isAdded) {
      game.jeux.push({
        id: jeu.id,
        qty: 1,
      });
    }
    localStorage.setItem("games", JSON.stringify(game));
    console.log("games", game);
  }

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
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
              onClick={addToCart}
            >
              🛒 Ajouter au panier ?🛒
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
