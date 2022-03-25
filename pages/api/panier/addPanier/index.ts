import type { NextApiRequest, NextApiResponse } from "next";
import { getDatabase } from ".././../../../src/utils/database";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import { ObjectId } from "mongodb";
export default withApiAuthRequired(async function handler(
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

  const addGame = await mongodb.collection("panier").updateOne(
    {
      id: new ObjectId(searchTheUser?.toString()),
    },
    {
      $push: {
        UserPanier: {
          id: new ObjectId(),
          namegame: reqnamegame.toString(),
          quantity: 1,
        },
      },
    }
  );

  res.redirect(`${req.headers.referer}`);
});
