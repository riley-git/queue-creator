import { type NextApiRequest, type NextApiResponse } from "next";

import { getServerAuthSession } from "../../server/common/get-server-auth-session";

const getToken = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });

  if (session) {
    res.json({ accessToken: session.accessToken });
  } else {
    res.send({
      token: undefined,
    });
  }
};

export default getToken;
