import { z } from "zod";
import { router, protectedProcedure } from "../trpc";
import { env } from "../../../env/server.mjs";

export const discord = router({
  getGuilds: protectedProcedure
    .input(
      z.object({
        accessToken: z.string().nullish(),
      })
    )
    .query(async ({ input }) => {
      return fetch(`${env.DISCORD_API_URL}/users/@me/guilds`, {
        headers: { Authorization: `Bearer ${input.accessToken}` },
      })
        .then((res) => {
          console.log(res);
          return res.json();
        })
        .catch((err) => {
          console.log(err);
        });
    }),
});
