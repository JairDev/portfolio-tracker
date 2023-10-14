export default function holdingAmount(transactionArray = []) {
  let holdingTotal = 0;
  transactionArray.map((transaction) => {
    const { type, holding } = transaction;
    if (type === "sell" && holdingTotal < holding) return (holdingTotal = 0);
    if (type === "buy") {
      holdingTotal += holding;
    } else if (type === "sell") {
      holdingTotal -= holding;
    }
  });
  return holdingTotal;
}
