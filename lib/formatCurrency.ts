export default function formatCurrency(value: number, symbol: string) {
  const options = { currency: symbol.toUpperCase() };
  const numberFormat = new Intl.NumberFormat("us-US", options);
  // console.log(numberFormat.format(value));
  return numberFormat.format(value);
}
