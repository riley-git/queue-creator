import { z } from "zod";
import axios from "axios";
import { router, publicProcedure } from "../trpc";

export const discordChannel = router({
  getToken: publicProcedure.query(async () => {
    fetch("https://discord.com/api/oauth2/token").then((res) => res.json());
  }),
});
