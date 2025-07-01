import { NextRequest, NextResponse } from "next/server"
import { sdk } from "@lib/config"
import { getAuthHeaders } from "@lib/data/cookies"

export async function POST(req: NextRequest) {
  try {
    const body = await req.text()
    const signature = req.headers.get("x-paystack-signature")
    
    // Verify webhook signature (in production, verify against PAYSTACK_SECRET_KEY)
    // For now, we'll process all events
    
    const event = JSON.parse(body)
    console.log("🔔 Paystack webhook received:", event.event, event.data?.reference)

    if (event.event === "charge.success" && event.data?.reference) {
      const reference = event.data.reference
      
      // Find cart with this payment reference
      // This is a simplified approach - in production you'd store reference mappings
      const headers = await getAuthHeaders()
      
      try {
        // Find and update payment session
        // This would typically involve querying your database for the cart with this reference
        console.log("✅ Payment confirmed for reference:", reference)
        
        return NextResponse.json({ received: true })
      } catch (error: any) {
        console.error("❌ Failed to process payment confirmation:", error)
        return NextResponse.json({ error: "Processing failed" }, { status: 500 })
      }
    }

    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error("❌ Webhook error:", error)
    return NextResponse.json({ error: "Webhook failed" }, { status: 500 })
  }
} 