import dbConnect from "lib/mongodb";
//@ts-ignore
export const withGetServerSideProps = async function ({ req }) {
  await dbConnect();
  let userSession = req?.session?.user;
  if (userSession) {
    try {
      const res = await fetch(`http://${req.headers.host}/api/auth`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${userSession?.token}`,
        },
      });

      const userData = await res.json();
      const data = JSON.parse(JSON.stringify({ ...userData }));
      return {
        props: {
          data,
        },
      };
    } catch (error) {
      console.log(error);
    }
  }
  return {
    props: {},
  };
};
