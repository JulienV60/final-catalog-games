import type { NextApiRequest, NextApiResponse } from "next";
import { getDatabase } from "../../../../../src/utils/database";

import { getSession } from "@auth0/nextjs-auth0";
import { ObjectId } from "mongodb";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = getSession(req, res);
  const reqnamegame = req.query.namegame;
  const name = session?.user.name;

  const mongodb = await getDatabase();

  const searchTheUser = await mongodb
    .collection("users")
    .findOne({ name: name })
    .then((user) => user?._id);

  let idGame = await mongodb
    .collection("panier")
    .findOne({
      id: searchTheUser,
    })
    .then((user: any) =>
      user?.UserPanier.filter((element: any) => {
        return element.namegame === reqnamegame;
      })
    );
  console.log(idGame.length);
  if (idGame.length >= 1) {
    const deleTeOne = await mongodb.collection("panier").updateOne(
      {
        id: new ObjectId(searchTheUser?.toString()),
      },
      {
        $push: {
          UserPanier: {
            namegame: reqnamegame.toString(),
            quantity: -1,
          },
        },
      }
    );
  } else {
    const deleteMany = await mongodb.collection("panier").deleteMany({
      id: new ObjectId(searchTheUser?.toString()),
    });
  }
  res.redirect(`${req.headers.referer}`);
}
