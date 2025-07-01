import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { cart_id, payment_session_id, verification_data } = await request.json()
    
    if (!cart_id || !payment_session_id || !verification_data) {
      return NextResponse.json(
        { error: "Missing required fields: cart_id, payment_session_id, or verification_data" },
        { status: 400 }
      )
    }

    console.log("Updating Medusa payment session:", {
      cart_id,
      payment_session_id,
      verification_data
    })

    // Update payment session data using Store API
    const medusaUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"
    const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
    
    if (!publishableKey) {
      console.error("Missing NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY")
      return NextResponse.json(
        { error: "Server configuration error: Missing publishable key" },
        { status: 500 }
      )
    }
    
    console.log("Updating payment session data with Paystack verification...")
    
    // Get the cart to find the payment collection
    const cartResponse = await fetch(`${medusaUrl}/store/carts/${cart_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-publishable-api-key": publishableKey,
      },
    })

    if (!cartResponse.ok) {
      const errorText = await cartResponse.text()
      console.error("Failed to get cart:", errorText)
      return NextResponse.json(
        { error: "Failed to get cart details" },
        { status: 500 }
      )
    }

    const cartData = await cartResponse.json()
    const paymentCollectionId = cartData.cart.payment_collection?.id

    if (!paymentCollectionId) {
      console.error("No payment collection found for cart")
      return NextResponse.json(
        { error: "No payment collection found for cart" },
        { status: 400 }
      )
    }

    // Try to update the payment session using the correct Store API endpoint
    // First, let's try to update the payment session data
    const updateUrl = `${medusaUrl}/store/carts/${cart_id}/payment-sessions/${payment_session_id}`
    console.log("Attempting to update payment session at:", updateUrl)
    
    const response = await fetch(updateUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-publishable-api-key": publishableKey,
      },
      body: JSON.stringify({
        data: {
          paystackTxRef: verification_data.reference
        }
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Medusa payment session update failed:", errorText)
      return NextResponse.json(
        { error: `Failed to update payment session: ${errorText}` },
        { status: response.status }
      )
    }

    const result = await response.json()
    console.log("Payment session updated successfully:", result)
    
    return NextResponse.json({
      success: true,
      message: "Payment session updated successfully",
      data: result
    })

  } catch (error) {
    console.error("Error updating payment session:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
} 