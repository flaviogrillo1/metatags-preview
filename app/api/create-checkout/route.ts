import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-02-24.acacia",
  typescript: true,
});

export async function POST(request: NextRequest) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("STRIPE_SECRET_KEY is not configured");
    }

    const { returnUrl } = await request.json();

    // Create one-time payment for daily access
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 99, // 0.99 EUR in cents
      currency: 'eur',
      metadata: {
        product: 'metatags-preview-daily',
      },
    });

    // Return client secret for frontend to complete payment
    return NextResponse.json({ 
      clientSecret: paymentIntent.client_secret,
      amount: 0.99,
      currency: 'EUR',
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    return NextResponse.json(
      { error: "Failed to create payment" },
      { status: 500 }
    );
  }
}
