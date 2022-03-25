import type { NextApiRequest, NextApiResponse } from "next";
import { getCookies } from "cookies-next";
import { getDatabase } from "../../../src/utils/database";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userMail = req.query.user;
  const mongodb = await getDatabase();

  const test = await mongodb.collection("users").findOne({ name: userMail });
  if (test === null) {
    const result = await mongodb
      .collection("users")
      .insertOne({ name: userMail })
      .then((data) => data.insertedId);

    mongodb.collection("panier").insertOne({
      id: result,
      UserPanier: [
        {
          namegame: "",
          quantity: 0,
        },
      ],
    });
  }

  return res.status(200).json({ cookie: getCookies({ req, res }) });
}
