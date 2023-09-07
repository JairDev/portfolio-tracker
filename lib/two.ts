async function auth(req: NextApiRequest, res: NextApiResponse) {
  const initState = {
    authenticated: false,
    userId: null,
    userEmail: null,
    coins: [],
  };

  try {
    const token = req.headers.authorization?.split(" ")[1] as string;
    const decodeToken = jwt.verify(token, serverRuntimeConfig.secret);
    const user = decodeToken;
    console.log(req.query);
    const { userId } = user;
    const { coins } = await getAllUserData(userId);
    res.status(200).json({
      message: "auth success",
      authenticated: true,
      userId: user.userId,
      userEmail: user.userEmail,
      coins,
      auth: "auth",
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      ...initState,
      error,
      other: "error",
    });
  }
}
