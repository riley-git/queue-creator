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
  checkBotMembership: protectedProcedure
    .input(
      z.object({
        accessToken: z.string().nullish(),
        memberGuilds: z.array(z.object({ id: z.string() })),
      })
    )
    .query(async ({ input }) => {
      for (const guild of input.memberGuilds) {
        fetch(
          `${env.DISCORD_API_URL}/guilds/${guild.id}/members/${env.DISCORD_BOT_ID}`,
          {
            headers: { Authorization: `Bearer ${input.accessToken}` },
          }
        )
          .then((res) => {
            console.log(res);
            return res.json();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }),
});
