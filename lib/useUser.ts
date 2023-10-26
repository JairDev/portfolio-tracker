import Router from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";

export default function useUser({
  redirectTo = "",
  redirectIfFound = false,
  initLogIn = false,
}) {
  const { data: user, mutate: mutateUser } = useSWR("/api/user", {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  const [calledPush, setCalledPush] = useState(false);
  useEffect(() => {
    if (!redirectTo || !user) return;

    if (redirectIfFound && user.authenticated) {
      // if (calledPush) {
      //   return;
      // }
      Router.push(redirectTo);
      // setCalledPush(true);
    }
  }, [redirectIfFound, redirectTo, user]);
  return { ...user, mutateUser, loading: !user };
}
