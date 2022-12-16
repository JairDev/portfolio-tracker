import useSWR from "swr";

export default function useCoin() {
  const { data: userCoin, mutate: mutateUserCoin } = useSWR("/api/coin");
  console.log(userCoin);
  return { ...userCoin, mutateUserCoin };
}
