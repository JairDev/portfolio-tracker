import useSWR from "swr";
import { urlCoin } from "./apiUrl";

export function useCryptoData() {
  const { data: cryptoData } = useSWR(urlCoin);
  if (cryptoData) {
    const formatData = cryptoData.map((object) => {
      return { id: object.id, name: object.name };
    });
    return formatData;
  }
}
