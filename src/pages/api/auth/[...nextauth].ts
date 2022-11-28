import NextAuth, { type NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

import { env } from "../../../env/server.mjs";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.accessToken = token.accessToken;

      session.user.id = token.id;

      return session;
    },
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
        if (profile) {
          token.id = profile.id;
        }
      }
      return token;
    },
  },
  // Configure one or more authentication providers
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
      authorization: { params: { scope: "identify guilds" } },
    }),
    // ...add more providers here
  ],
};

export default NextAuth(authOptions);
