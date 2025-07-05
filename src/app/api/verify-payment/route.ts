import { NextRequest, NextResponse } from 'next/server'
import { sdk } from '@lib/config'

export async function POST(request: NextRequest) {
  try {
    const { reference, cartId, sessionId } = await request.json()

    if (!reference || !cartId || !sessionId) {
      return NextResponse.json(
        { success: false, message: 'Missing required parameters' },
        { status: 400 }
      )
    }

    // Verify the payment with Paystack
    const paystackVerifyResponse = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    )

    if (!paystackVerifyResponse.ok) {
      console.error('Paystack verification failed:', await paystackVerifyResponse.text())
      return NextResponse.json(
        { success: false, message: 'Payment verification failed' },
        { status: 400 }
      )
    }

    const paystackData = await paystackVerifyResponse.json()

    if (!paystackData.status || paystackData.data.status !== 'success') {
      console.error('Payment not successful:', paystackData)
      return NextResponse.json(
        { success: false, message: 'Payment was not successful' },
        { status: 400 }
      )
    }

    try {
      // Authorize the payment session in Medusa using direct API call
      const authResponse = await sdk.client.fetch(
        `/store/payment-collections/${cartId}/payment-sessions/${sessionId}/authorize`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            // Include payment reference and verification data
            data: {
              reference: reference,
              verified: true,
              amount: paystackData.data.amount,
              currency: paystackData.data.currency,
            }
          })
        }
      )
      
      console.log('✅ Payment session authorized successfully')
      
      return NextResponse.json({
        success: true,
        message: 'Payment verified and authorized',
        paymentData: paystackData.data
      })
    } catch (medusaError) {
      console.error('Medusa authorization failed:', medusaError)
      return NextResponse.json(
        { success: false, message: 'Failed to authorize payment in backend' },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('Payment verification error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
} 