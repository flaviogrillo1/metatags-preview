import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { headers } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-02-24.acacia",
  typescript: true,
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const headersList = await headers();
    const signature = headersList.get("stripe-signature") || "";

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        webhookSecret
      );
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 400 }
      );
    }

    // Handle payment success
    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log("Payment succeeded:", paymentIntent.id);
      
      // The frontend will handle unlocking via success URL
      // Payment was successful, user gets 24h access
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}
