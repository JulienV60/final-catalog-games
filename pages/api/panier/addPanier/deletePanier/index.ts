import type { NextApiRequest, NextApiResponse } from "next";
import { getDatabase } from "../../../../../src/utils/database";

import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
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
  if ((idGame.length = 1)) {
    await mongodb.collection("panier").deleteOne;
  }
  res.redirect(`${req.headers.referer}`);
}
