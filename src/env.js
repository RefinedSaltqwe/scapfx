import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    AUTH_SECRET:
      process.env.NODE_ENV === "production"
        ? z.string()
        : z.string().optional(),
    NEXTAUTH_SECRET:
      process.env.NODE_ENV === "production"
        ? z.string()
        : z.string().optional(),
    AUTH_DISCORD_ID: z.string(),
    AUTH_DISCORD_SECRET: z.string(),
    DATABASE_URL: z.string().url(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    STRIPE_SECRET_KEY: z.string(),
    STRIPE_WEBHOOK_SECRET: z.string(),
    RESEND_API_KEY: z.string(),
    NEXTAUTH_URL: z.string(),
    FB_PIXEL_ID: z.string(),
    META_ACCESS_TOKEN: z.string(),
    SUPABASE_BUCKET_NAME: z.string(),
    STRIPE_BUNDLE_DISCOUNT: z.string(),
    VERCEL_API_TOKEN: z.string(),
    VERCEL_PROJECT_ID: z.string(),
    ADIT: z.string(),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string(),
    NEXT_PUBLIC_SUPABASE_URL: z.string(),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
    NEXT_PUBLIC_API_URL: z.string(),
    NEXT_PUBLIC_STRIPE_DISCOUNT: z.string(),
    NEXT_PUBLIC_STRIPE_FIRST_DISCOUNT: z.string(),
    NEXT_PUBLIC_BANNER: z.string(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    AUTH_SECRET: process.env.AUTH_SECRET,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    AUTH_DISCORD_ID: process.env.AUTH_DISCORD_ID,
    AUTH_DISCORD_SECRET: process.env.AUTH_DISCORD_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    FB_PIXEL_ID: process.env.FB_PIXEL_ID,
    META_ACCESS_TOKEN: process.env.META_ACCESS_TOKEN,
    SUPABASE_BUCKET_NAME: process.env.SUPABASE_BUCKET_NAME,
    STRIPE_BUNDLE_DISCOUNT: process.env.STRIPE_BUNDLE_DISCOUNT,
    NEXT_PUBLIC_STRIPE_DISCOUNT: process.env.NEXT_PUBLIC_STRIPE_DISCOUNT,
    VERCEL_API_TOKEN: process.env.VERCEL_API_TOKEN,
    VERCEL_PROJECT_ID: process.env.VERCEL_PROJECT_ID,
    ADIT: process.env.ADIT,
    NEXT_PUBLIC_BANNER: process.env.NEXT_PUBLIC_BANNER,
    NEXT_PUBLIC_STRIPE_FIRST_DISCOUNT:
      process.env.NEXT_PUBLIC_STRIPE_FIRST_DISCOUNT,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});
