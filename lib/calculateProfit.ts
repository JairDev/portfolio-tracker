export default function calculateProfit(
  transactionArray = [],
  currentLastPrice: number
) {
  let profit = 0;
  transactionArray.map((transaction) => {
    const { type, price, holding } = transaction;

    if (type === "buy") {
      profit += (currentLastPrice - price) * holding;
    } else if (type === "sell") {
      profit += (price - currentLastPrice) * holding;
    }
  });
  return profit;
}
