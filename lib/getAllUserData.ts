import User from "models/User";
import Coin from "models/Coin";

export default function getAllUserData(id: string) {
  const initState = {
    coins: [],
  };
  if (!id) {
    return initState;
  }
  return User.findById(id).populate({ path: "coins", model: Coin });
}
