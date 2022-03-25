import type { NextApiRequest, NextApiResponse } from "next";
import { getDatabase } from "../../../../../src/utils/database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const reqidgame = req.query.idgame;
  const reqnamegame = req.query.namegame;
  const mongodb = await getDatabase();
  const data = await mongodb

    .collection("panier")
    .deleteOne({ id: `${reqidgame}`, name: `${reqnamegame}` });
  const zea = await getDatabase();
  const eaz = await zea.collection("panier").find().toArray();
  console.log(eaz);
  res.redirect("/");
}
