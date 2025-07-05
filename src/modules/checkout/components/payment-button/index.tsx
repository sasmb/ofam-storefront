"use client"

import { isManual, isPaystack, isStripe } from "@lib/constants"
import { placeOrder } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@medusajs/ui"
import { useElements, useStripe } from "@stripe/react-stripe-js"
import React, { useState } from "react"
import dynamic from "next/dynamic"

// Dynamically import PaystackConsumer to prevent SSR issues
const PaystackConsumer = dynamic(
  () => import("react-paystack").then((mod) => ({ default: mod.PaystackConsumer })),
  { 
    ssr: false,
    loading: () => (
      <Button disabled size="large">
        Loading payment...
      </Button>
    )
  }
)

import ErrorMessage from "../error-message"

// Type definitions for react-paystack callbacks
type PaystackCallback = (response: any) => void
type PaystackCloseCallback = () => void

type PaymentButtonProps = {
  cart: HttpTypes.StoreCart
  "data-testid": string
}

const PaymentButton: React.FC<PaymentButtonProps> = ({
  cart,
  "data-testid": dataTestId,
}) => {
  const notReady =
    !cart ||
    !cart.shipping_address ||
    !cart.billing_address ||
    !cart.email ||
    (cart.shipping_methods?.length ?? 0) < 1

  const paymentSession = cart.payment_collection?.payment_sessions?.[0]

  switch (true) {
    case isStripe(paymentSession?.provider_id):
      return (
        <StripePaymentButton
          notReady={notReady}
          cart={cart}
          data-testid={dataTestId}
        />
      )
    case isManual(paymentSession?.provider_id):
      return (
        <ManualTestPaymentButton notReady={notReady} data-testid={dataTestId} />
      )
    case isPaystack(paymentSession?.provider_id):
      return (
        <PaystackPaymentButton notReady={notReady} cart={cart} data-testid={dataTestId} />
      )
    default:
      return <Button disabled>Select a payment method</Button>
  }
}

const StripePaymentButton = ({
  cart,
  notReady,
  "data-testid": dataTestId,
}: {
  cart: HttpTypes.StoreCart
  notReady: boolean
  "data-testid"?: string
}) => {
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const onPaymentCompleted = async () => {
    try {
      await placeOrder()
    } catch (err: any) {
      setErrorMessage(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const stripe = useStripe()
  const elements = useElements()
  const card = elements?.getElement("card")

  const session = cart.payment_collection?.payment_sessions?.find(
    (s) => s.status === "pending"
  )

  const disabled = !stripe || !elements ? true : false

  const handlePayment = async () => {
    setSubmitting(true)

    if (!stripe || !elements || !card || !cart) {
      setSubmitting(false)
      return
    }

    await stripe
      .confirmCardPayment(session?.data.client_secret as string, {
        payment_method: {
          card: card,
          billing_details: {
            name:
              cart.billing_address?.first_name +
              " " +
              cart.billing_address?.last_name,
            address: {
              city: cart.billing_address?.city ?? undefined,
              country: cart.billing_address?.country_code ?? undefined,
              line1: cart.billing_address?.address_1 ?? undefined,
              line2: cart.billing_address?.address_2 ?? undefined,
              postal_code: cart.billing_address?.postal_code ?? undefined,
              state: cart.billing_address?.province ?? undefined,
            },
            email: cart.email,
            phone: cart.billing_address?.phone ?? undefined,
          },
        },
      })
      .then(({ error, paymentIntent }) => {
        if (error) {
          const pi = error.payment_intent

          if (
            (pi && pi.status === "requires_capture") ||
            (pi && pi.status === "succeeded")
          ) {
            onPaymentCompleted()
          }

          setErrorMessage(error.message || null)
          return
        }

        if (
          (paymentIntent && paymentIntent.status === "requires_capture") ||
          paymentIntent.status === "succeeded"
        ) {
          return onPaymentCompleted()
        }

        return
      })
  }

  return (
    <>
      <Button
        disabled={disabled || notReady}
        onClick={handlePayment}
        size="large"
        isLoading={submitting}
        data-testid={dataTestId}
        className="bg-brand-primary hover:bg-green-600 text-white border-0"
      >
        Place order
      </Button>
      <ErrorMessage
        error={errorMessage}
        data-testid="stripe-payment-error-message"
      />
    </>
  )
}

const ManualTestPaymentButton = ({ notReady }: { notReady: boolean }) => {
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const onPaymentCompleted = async () => {
    try {
      await placeOrder()
    } catch (err: any) {
      setErrorMessage(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handlePayment = () => {
    setSubmitting(true)

    onPaymentCompleted()
  }

  return (
    <>
      <Button
        disabled={notReady}
        isLoading={submitting}
        onClick={handlePayment}
        size="large"
        data-testid="submit-order-button"
        className="bg-brand-primary hover:bg-green-600 text-white border-0"
      >
        Place order
      </Button>
      <ErrorMessage
        error={errorMessage}
        data-testid="manual-payment-error-message"
      />
    </>
  )
}

const PaystackPaymentButton = ({
  cart,
  notReady,
  "data-testid": dataTestId,
}: {
  cart: HttpTypes.StoreCart
  notReady: boolean
  "data-testid"?: string
}) => {
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const paymentSession = cart.payment_collection?.payment_sessions?.find(
    (s) => s.status === "pending"
  )

  // Get payment configuration from session
  const paystackConfig = {
    reference: paymentSession?.data.reference as string,
    email: cart.email as string,
    amount: (cart.total ?? 0) * 100, // Paystack expects amount in kobo (cents)
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY as string,
    currency: cart.currency_code?.toUpperCase() || "NGN",
    channels: ["card", "bank", "ussd", "qr", "mobile_money", "bank_transfer"],
  }

  const onSuccess: PaystackCallback = async (response) => {
    console.log("Paystack payment successful:", response)
    setSubmitting(true)
    
    try {
      // First, verify the payment with our backend
      const verifyResponse = await fetch('/api/verify-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reference: response.reference,
          cartId: cart.id,
          sessionId: paymentSession?.id,
        }),
      })

      if (!verifyResponse.ok) {
        throw new Error('Payment verification failed')
      }

      const verificationResult = await verifyResponse.json()
      
      if (verificationResult.success) {
        // Payment verified, now place the order
        await placeOrder()
        console.log("✅ Order completed successfully")
      } else {
        throw new Error('Payment verification failed: ' + verificationResult.message)
      }
      
    } catch (error) {
      console.error("Payment processing error:", error)
      setErrorMessage(
        error instanceof Error 
          ? error.message 
          : "Payment verification failed. Please contact support if your payment was deducted."
      )
    } finally {
      setSubmitting(false)
    }
  }

  const onClose: PaystackCloseCallback = () => {
    console.log("Paystack payment modal closed")
    setSubmitting(false)
    setErrorMessage("Payment was cancelled. Please try again if you want to complete your order.")
  }

  if (!paymentSession) {
    return (
      <>
        <Button disabled size="large">
          Payment session not found
        </Button>
        <ErrorMessage
          error="Payment session not available"
          data-testid="paystack-payment-error-message"
        />
      </>
    )
  }

  if (!paystackConfig.publicKey) {
    return (
      <>
        <Button disabled size="large">
          Payment not configured
        </Button>
        <ErrorMessage
          error="Paystack payment is not properly configured"
          data-testid="paystack-payment-error-message"
        />
      </>
    )
  }

  return (
    <>
      <PaystackConsumer 
        {...paystackConfig} 
        onSuccess={onSuccess as any} 
        onClose={onClose as any}
      >
        {({ initializePayment }) => (
          <Button
            disabled={notReady}
            isLoading={submitting}
            onClick={() => {
              setSubmitting(true)
              setErrorMessage(null)
              initializePayment()
            }}
            size="large"
            data-testid={dataTestId}
            className="bg-brand-secondary hover:bg-orange-400 text-white border-0"
          >
            {submitting ? "Processing payment..." : "Pay with Paystack"}
          </Button>
        )}
      </PaystackConsumer>
      <ErrorMessage
        error={errorMessage}
        data-testid="paystack-payment-error-message"
      />
    </>
  )
}

export default PaymentButton
