import React from 'react'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PaypalButton = ({ amount, onSuccess, onError }) => {
  return (
    <PayPalScriptProvider options={{
      "clientId": import.meta.env.VITE_PAYPAL_CLIENT_ID,
      "currency": "USD",
      "intent": "capture",
      "debug": true,
    }}>
      <PayPalButtons style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [{ amount: { value: amount } }]
          })
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then(onSuccess)
        }}
        onError={onError}>
      </PayPalButtons>
    </PayPalScriptProvider>
  )
}

export default PaypalButton