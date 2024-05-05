import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    NEXTAUTH_URL: z.string().url(),
    NEXTAUTH_SECRET: z.string(),
    DATABASE_URL: z.string().url(),
    STRIPE_WEBHOOK_SECRET: z.string(),
    STRIPE_SECRET: z.string(),
    STRIPE_PUBLIC: z.string(),
    STRIPE_SECRET_TEST: z.string(),
    STRIPE_PUBLIC_TEST: z.string(),
    STRIPE_SUCESS_URL: z.string().url(),
    STRIPE_CANCEL_URL: z.string().url(),
  },

  client: {},

  runtimeEnv: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    STRIPE_SECRET: process.env.STRIPE_SECRET,
    STRIPE_PUBLIC: process.env.STRIPE_PUBLIC,
    STRIPE_SUCESS_URL: process.env.STRIPE_SUCESS_URL,
    STRIPE_CANCEL_URL: process.env.STRIPE_CANCEL_URL,
    STRIPE_SECRET_TEST: process.env.STRIPE_SECRET_TEST,
    STRIPE_PUBLIC_TEST: process.env.STRIPE_PUBLIC_TEST,
  },
})
