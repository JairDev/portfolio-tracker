import type { IronSessionOptions } from "iron-session";
// import type { User } from 'pages/api/register'

const sessionOptions: IronSessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieName: "iron-session/examples/next.js",
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

// This is where we specify the typings of req.session.*
// declare module "iron-session" {
//   interface IronSessionData {
//     user?: User;
//   }
// }

export default sessionOptions;
