import Router from "next/router";
import { useEffect } from "react";
import useSWR from "swr";

export default function useUser({ redirectTo = "", redirectIfFound = false }) {
  const { data: user, mutate: mutateUser } = useSWR("/api/user");
  console.log(user);
  useEffect(() => {
    if (!redirectTo || !user) return;

    if (redirectIfFound && user.authenticated) {
      Router.push(redirectTo);
    }
  });
  return { ...user, mutateUser };
}
