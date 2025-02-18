import { error } from "console";
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not set");
    // a // Use the latest API version
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
apiVersion: "2025-01-27.acacia"
});

export default stripe;
