import { NextRequest, NextResponse } from "next/server"
import { sdk } from "@lib/config"
import { getAuthHeaders, getCartId } from "@lib/data/cookies"

async function authorizePaystackPayment(cartId: string, paystackReference: string) {
  try {
    const headers = await getAuthHeaders()
    
    // Get cart and find Paystack payment session
    const cart = await sdk.store.cart.retrieve(cartId, {}, headers)
    const paymentCollection = cart.cart.payment_collection
    const paymentSession = paymentCollection?.payment_sessions?.find(ps => 
      ps.status === "pending" && ps.provider_id?.includes("paystack")
    )

    if (paymentSession && paymentCollection) {
      console.log("🔐 Authorizing Paystack payment session with reference:", paystackReference)
      
      // Update payment session status to authorized
      await sdk.client.fetch(`/store/payment-collections/${paymentCollection.id}/payment-sessions/${paymentSession.id}`, {
        method: "POST",
        headers: {
          ...headers,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          data: {
            ...paymentSession.data,
            paystackTxRef: paystackReference,
            status: "authorized"
          }
        })
      })
      
      console.log("✅ Payment session authorized successfully")
      return NextResponse.json({ success: true, message: "Payment session authorized" })
    } else {
      console.warn("⚠️ No pending Paystack payment session found")
      return NextResponse.json({ success: false, error: "No payment session found" }, { status: 400 })
    }
  } catch (error: any) {
    console.error("❌ Failed to authorize payment session:", error)
    return NextResponse.json({ success: false, error: "Authorization failed" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { cartId: requestCartId, paystackReference, action } = await req.json().catch(() => ({}))
    
    const cartId = requestCartId || (await getCartId())
    console.log("🛒 Cart ID:", cartId)
    console.log("💳 Paystack Reference:", paystackReference)
    console.log("🎯 Action:", action)

    if (!cartId) {
      console.error("❌ No cart ID found")
      return NextResponse.json({ error: "No cart found" }, { status: 400 })
    }

    // If this is just an authorization request, update payment session and return
    if (action === 'authorize' && paystackReference) {
      return await authorizePaystackPayment(cartId, paystackReference)
    }

    // If we reach here, this is likely an old API call
    return NextResponse.json({
      success: false,
      error: "Use placeOrder() function instead for cart completion"
    }, { status: 400 })

  } catch (error: any) {
    console.error("Error completing order:", error)
    return NextResponse.json(
      { error: "Failed to complete order" },
      { status: 500 }
    )
  }
} 