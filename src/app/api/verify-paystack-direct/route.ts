import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { reference } = await req.json()

    if (!reference) {
      return NextResponse.json({ error: "Payment reference is required" }, { status: 400 })
    }

    // Get Paystack secret key from environment
    const paystackSecret = process.env.PAYSTACK_SECRET_KEY
    if (!paystackSecret) {
      console.error("PAYSTACK_SECRET_KEY not configured")
      return NextResponse.json({ error: "Payment verification not configured" }, { status: 500 })
    }

    console.log("Verifying payment with reference:", reference)

    // Call Paystack verification API directly
    const verifyResponse = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${paystackSecret}`,
        'Content-Type': 'application/json'
      }
    })

    if (!verifyResponse.ok) {
      console.error("Paystack API error:", verifyResponse.status, await verifyResponse.text())
      return NextResponse.json({ error: "Payment verification failed" }, { status: 500 })
    }

    const verificationData = await verifyResponse.json()
    
    console.log("Paystack verification response:", {
      status: verificationData.status,
      data_status: verificationData.data?.status,
      amount: verificationData.data?.amount,
      reference: verificationData.data?.reference
    })

    // Check if payment was successful
    if (verificationData.status === true && verificationData.data?.status === "success") {
      return NextResponse.json({
        success: true,
        status: "success",
        amount: verificationData.data.amount,
        currency: verificationData.data.currency,
        reference: verificationData.data.reference,
        paid_at: verificationData.data.paid_at
      })
    } else {
      return NextResponse.json({
        success: false,
        status: verificationData.data?.status || "failed",
        message: verificationData.message || "Payment verification failed"
      })
    }

  } catch (error) {
    console.error("Payment verification error:", error)
    return NextResponse.json({ error: "Internal server error during verification" }, { status: 500 })
  }
} 