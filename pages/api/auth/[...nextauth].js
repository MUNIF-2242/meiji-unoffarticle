import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Common expiration time in seconds (for example, 1 hour = 3600 seconds)
const EXPIRATION_TIME = 10 * 60; // Set to 10 minutes (600 seconds)

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Access credentials from environment variables
        const validUsername = process.env.NEXT_PUBLIC_VALID_USERNAME;
        const validPassword = process.env.NEXT_PUBLIC_VALID_PASSWORD; // Change this line

        // Check if the provided credentials match the environment variables
        if (
          credentials.username === validUsername &&
          credentials.password === validPassword
        ) {
          console.log("User authenticated:", credentials.username);
          return { id: 1, name: "User", email: "user@example.com" };
        }
        console.log("Authentication failed for:", credentials.username);
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/openai/openAILogin",
  },
  session: {
    strategy: "jwt",
    maxAge: EXPIRATION_TIME, // Session expires in the common expiration time
    updateAge: 0, // Disable automatic session refresh
  },
  jwt: {
    secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
    maxAge: EXPIRATION_TIME, // JWT expires in the common expiration time
  },
  callbacks: {
    async jwt({ token, user }) {
      // Set an expiration time in the JWT
      if (user) {
        token.id = user.id;
      }

      // Ensure token has an expiration (exp) set
      if (!token.exp) {
        token.exp = Math.floor(Date.now() / 1000) + EXPIRATION_TIME;
      }

      console.log(
        "JWT token issued. Expires at:",
        new Date(token.exp * 1000).toISOString()
      );
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;

      // Set session expiration based on JWT expiration
      session.expires = new Date(token.exp * 1000).toISOString();

      console.log("Session issued. Expires at:", session.expires);
      return session;
    },
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        maxAge: EXPIRATION_TIME, // Set session cookie to expire in the common expiration time
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Secure cookie in production
        sameSite: "lax",
        path: "/",
      },
    },
  },
});
