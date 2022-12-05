import { NextApiRequest, NextApiResponse } from "next";
import User from "models/User";

export default async function deleteUserCoin(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, userEmail } = req.body;

  User.updateOne(
    { email: userEmail },
    {
      $pull: {
        coins: id,
      },
    },
    function (data, error) {
      console.log(data);
      console.log(error);
    }
  );

  res.status(200).json({
    message: "Delete-user-coin",
  });
}
