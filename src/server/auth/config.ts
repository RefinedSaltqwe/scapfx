//NEW
import { defaultUser } from "@/data/default";
import { db } from "@/server/db";
import { type CurrentUser } from "@/types";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { compare } from "bcryptjs"; // For password comparison
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      email: string;
      ownedPresets: string[];
      name: string;
      currentUser: CurrentUser;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  interface User {
    /** Add any additional user properties here */
    email?: string | null | undefined;
    id?: string | undefined; // Example: Add custom user properties like ID
    name?: string | undefined | null; // Example: Add custom user properties like ID
    ownedPresets?: string[] | undefined; // Example: Add custom user properties like ID
    currentUser?: CurrentUser | undefined;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  // trustHost: true, // Add this line
  // cookies: {
  //   sessionToken: {
  //     name: `__Secure-next-auth.session-token`, // Make cookie secure
  //     options: {
  //       httpOnly: true,
  //       sameSite: "lax",
  //       secure: process.env.NODE_ENV === "production", // Secure in production
  //     },
  //   },
  // },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...").
      name: "Credentials",
      // The credentials object defines the fields on the sign-in form.
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Username and password are required");
        }

        // Look up the user by username (adjust based on your Prisma schema)
        const user = await db.user.findUnique({
          where: { email: credentials.email as string },
          include: {
            ownedPresets: {
              include: {
                preset: true,
              },
            },
            accounts: true,
            sessions: true,
            posts: true,
          },
        });

        if (!user) {
          throw new Error("No user found with that username");
        }

        // Compare the entered password with the stored password hash
        const isPasswordValid = await compare(
          credentials.password as string,
          user.password,
        );
        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        const presetIds = user.ownedPresets.map((p) => p.presetId);

        // If the user is valid, return the user object to be stored in the session
        return {
          id: user.id,
          name: user.name ?? "Client",
          email: user.email,
          ownedPresets: presetIds,
          currentUser: { user } as CurrentUser,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt", // Use JWT-based sessions
    // maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  adapter: PrismaAdapter(db),
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // Add user ID to the token
        token.email = user.email; // Add user email to the token
        token.name = user.name; // Add user email to the token
        token.ownedPresets = user.ownedPresets ?? [];
        token.currentUser = user.currentUser ?? { user: defaultUser };
      }
      // token.exp = Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60; // 7 days
      return token;
    },
    async session({ session, token }) {
      // Include user information in the session object
      session.userId = token.id as string;
      session.user.id = token.id as string;
      session.user.name = token.name!;
      session.user.ownedPresets = token.ownedPresets as string[]; // Attach presets to the session
      session.user.currentUser = token.currentUser as CurrentUser; // Attach presets to the session

      return session;
    },
  },
} satisfies NextAuthConfig;
