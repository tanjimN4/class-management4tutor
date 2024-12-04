import { mongodb } from "@/lib/mongodb";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    // Credentials Provider for email/password login
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        // Ensure both email and password are provided
        if (!email || !password) {
          return null;
        }

        const db = await mongodb();

        // Find user by email
        const currentUser = await db.collection("users").findOne({ email });
        if (!currentUser) {
          return null;
        }

        //hasdjhasjkdhakshdkahsdjkahsdkahsdkhasdkhakhdajkhdkahdkahdkhasdhkahsd Compare provided password with stored password
        if (currentUser.password !== password) {
          return null;
        }

        // Return user object
        return {
          id: currentUser._id.toString(),
          email: currentUser.email,
          name: currentUser.name || "User",
          role: currentUser.role,
        };
      },
    }),

    // Google Provider for OAuth login
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    // Session callback to attach user info to the session
    async session({ session, token }) {
      const db = await mongodb();
      const userCollection = db.collection("users");

      // Fetch full user data from the database using token.email
      const user = await userCollection.findOne({ email: token.email });

      if (user) {
        session.user = {
          id: user._id.toString(),
          email: user.email,
          name: user.name || "User",
          image: user.image,
          role: user.role,
          provider: user.provider,
          createdAt: user.createdAt,
        };
      }

      return session;
    },

    // JWT callback to handle tokens
    async jwt({ token, user, account }) {
      // If a new user is signed in, attach their info to the token
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },

    // Sign-in callback for handling Google users
    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        const { email, name, picture } = profile;

        try {
          const db = await mongodb();
          const userCollection = db.collection("users");

          // Check if the user already exists
          const userExists = await userCollection.findOne({ email });

          if (!userExists) {
            // If user doesn't exist, create a new record in the database
            await userCollection.insertOne({
              email,
              name,
              image: picture,
              provider: "google",
              role: "Tutor",
              createdAt: new Date(),
            });
          }
        } catch (error) {
          console.error("Error during Google sign-in:", error);
          return false; // Reject sign-in in case of an error
        }
      }

      return true; // Allow sign-in
    },
  },

  pages: {
    signIn: "/login", // Custom sign-in page
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
