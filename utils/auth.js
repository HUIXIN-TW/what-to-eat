import GoogleProvider from "next-auth/providers/google";

import User from "@models/user";
import { connectToDatabase } from "@utils/database";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session }) {
      if (!session?.user?.email) {
        return session;
      }

      await connectToDatabase();
      const sessionUser = await User.findOne({ email: session.user.email });

      if (!sessionUser) {
        throw new Error("User not found");
      }

      session.user.id = sessionUser._id.toString();

      return session;
    },
    async signIn({ profile }) {
      try {
        if (!profile?.email) {
          return false;
        }

        await connectToDatabase();

        const user = await User.findOne({ email: profile.email });

        if (!user) {
          await User.create({
            username: profile.email.split("@")[0],
            email: profile.email,
            name: profile.name?.replace(" ", "").toLowerCase(),
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
};
