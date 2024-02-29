import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import User from "@models/user";
import { connectToDatabase } from "@utils/database";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      // Why use Email? Because session.user.email is unique.
      const sessionUser = await User.findOne({ email: session.user.email });

      // Why use _id.toString()? Because session.user.id is a string, and sessionUser._id is an ObjectId.
      session.user.id = sessionUser._id.toString();

      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDatabase();

        // if user exist, return true
        const user = await User.findOne({ email: profile.email });

        // if user not exist, create user
        if (!user) {
          await User.create({
            username: profile.email.split("@")[0],
            email: profile.email,
            name: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.log("Error. Check if user exist. ", error.message);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
