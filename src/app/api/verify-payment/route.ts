import { NextRequest, NextResponse } from 'next/server'
import { sdk } from '@lib/config'

export async function POST(request: NextRequest) {
  try {
    const { reference, cartId } = await request.json()

    if (!reference || !cartId) {
      return NextResponse.json(
        { success: false, message: 'Missing required parameters' },
        { status: 400 }
      )
    }

    // 1. Verify the payment with Paystack
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

    console.log('✅ Payment verified with Paystack successfully')

    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully',
      paymentData: paystackData.data
    })

  } catch (error) {
    console.error('Payment verification error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error during payment verification' },
      { status: 500 }
    )
  }
} 