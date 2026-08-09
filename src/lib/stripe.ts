import Stripe from 'stripe'

// Default to a dummy key if environment variable is missing to prevent crash on import
export const stripe = new Stripe(process.env.STRIPE_CLIENT_SECRET || 'sk_test_mocked_for_demo')