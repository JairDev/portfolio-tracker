import { Transactions } from "./types";

export default function calculateAvgPrice(
  transactionArray: Array<Transactions> = []
) {
  const transactionData = transactionArray.map((transaction, i, array) => {
    const priceSum = array.reduce((prev, current) => {
      return prev + current.price;
    }, 0);
    const avgPrice = priceSum / array.length;
    return { avgPrice };
  });
  const objectResult = Object.assign({}, ...transactionData);
  return objectResult;
}
