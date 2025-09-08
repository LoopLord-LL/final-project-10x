import React, { useState } from "react";

export default function CheckoutPage() {
  const [form, setForm] = useState({
    email: "",
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvc: "",
    paymentType: "credit",
    city: "",
    address: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto mt-16 p-8 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Thank you for your order!</h2>
        <p className="mb-2">Your payment has been received.</p>
        <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
          {JSON.stringify(form, null, 2)}
        </pre>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto mt-16 p-8 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />
        <input
          type="text"
          name="cardName"
          placeholder="Name on Card"
          value={form.cardName}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />
        <input
          type="text"
          name="cardNumber"
          placeholder="Card Number"
          value={form.cardNumber}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />
        <div className="flex gap-2">
          <input
            type="text"
            name="expiry"
            placeholder="MM/YY"
            value={form.expiry}
            onChange={handleChange}
            required
            className="w-1/2 border rounded px-3 py-2"
          />
          <input
            type="text"
            name="cvc"
            placeholder="CVC"
            value={form.cvc}
            onChange={handleChange}
            required
            className="w-1/2 border rounded px-3 py-2"
          />
        </div>
        <select
          name="paymentType"
          value={form.paymentType}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        >
          <option value="credit">Credit Card</option>
          <option value="debit">Debit Card</option>
          <option value="paypal">PayPal</option>
        </select>
        <input
          type="text"
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
        >
          Pay Now
        </button>
      </form>
    </div>
  );
}
