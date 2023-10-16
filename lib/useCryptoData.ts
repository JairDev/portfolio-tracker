import useSWR from "swr";
import { urlCoin } from "./apiUrl";

const INTERVAL = 60000;

export function useCryptoData() {
  const { data: cryptoData } = useSWR(urlCoin, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: INTERVAL,
  });
  if (cryptoData) {
    // @ts-ignore
    const formatData = cryptoData.map((object) => {
      return { id: object.id, name: object.name };
    });
    return formatData;
  }
}
