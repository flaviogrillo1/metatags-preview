import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: "Stripe is not configured" },
        { status: 503 }
      );
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-02-24.acacia",
      typescript: true,
    });

    const { returnUrl } = await request.json();

    const paymentIntent = await stripe.paymentIntents.create({
      amount: 99,
      currency: 'eur',
      metadata: {
        product: 'metatags-preview-daily',
      },
    });

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
