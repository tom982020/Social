import NextAuth, { NextAuthOptions } from "next-auth"


export const authOptions: NextAuthOptions = {
    // https://next-auth.js.org/configuration/providers/oauth
    providers: [
      /* EmailProvider({
           server: process.env.EMAIL_SERVER,
           from: process.env.EMAIL_FROM,
         }),
      // Temporarily removing the Apple provider from the demo site as the
      // callback URL for it needs updating due to Vercel changing domains
      Providers.Apple({
        clientId: process.env.APPLE_ID,
        clientSecret: {
          appleId: process.env.APPLE_ID,
          teamId: process.env.APPLE_TEAM_ID,
          privateKey: process.env.APPLE_PRIVATE_KEY,
          keyId: process.env.APPLE_KEY_ID,
        },
      }),
      */
     
    ],
    theme: {
      colorScheme: "light",
    },
    callbacks: {
      async jwt({ token }) {
        token.userRole = "admin"
        return token
      },
    },
  }
  
  export default NextAuth(authOptions)