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

    const { paymentIntentId } = await request.json();

    if (!paymentIntentId) {
      return NextResponse.json(
        { error: "Payment Intent ID is required" },
        { status: 400 }
      );
    }

    // Verify the payment with Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === 'succeeded') {
      // Calculate expiry date (24 hours from payment creation)
      const createdAt = paymentIntent.created * 1000; // Convert to milliseconds
      const expiresAt = createdAt + (24 * 60 * 60 * 1000); // 24 hours later
      const now = Date.now();
      const isValid = expiresAt > now;

      return NextResponse.json({
        isValid: true,
        isPro: isValid,
        expiresAt,
        hoursRemaining: Math.max(0, Math.floor((expiresAt - now) / (1000 * 60 * 60))),
        paymentId: paymentIntentId,
      });
    }

    return NextResponse.json({
      isValid: false,
      isPro: false,
      expiresAt: null,
      hoursRemaining: 0,
    });
  } catch (error) {
    console.error("Error verifying payment:", error);
    
    // If payment not found or other error, treat as invalid
    return NextResponse.json({
      isValid: false,
      isPro: false,
      expiresAt: null,
      hoursRemaining: 0,
      error: error instanceof Error ? error.message : "Failed to verify payment",
    }, { status: 400 });
  }
}
