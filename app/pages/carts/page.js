import React from 'react';

const cartData = {
  id: 1,
  userId: 1,
  date: "2020-03-02T00:00:00.000Z",
  products: [
    {
      productId: 1,
      quantity: 4
    },
    {
      productId: 2,
      quantity: 1
    },
    {
      productId: 3,
      quantity: 6
    }
  ],
  __v: 0
};

function CartPage() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-gray-700">Cart Details</h1>
      <div className="bg-white p-4 rounded shadow-md mb-6">
        <p className="mb-2 text-gray-700"><strong>Cart ID:</strong> {cartData.id}</p>
        <p className="mb-2 text-gray-700"><strong>User ID:</strong> {cartData.userId}</p>
        <p className="mb-2 text-gray-700"><strong>Date:</strong> {new Date(cartData.date).toLocaleDateString()}</p>
      </div>
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Products</h2>
      <ul className="space-y-4">
        {cartData.products.map((product) => (
          <li key={product.productId} className="bg-white p-4 rounded shadow-md">
            <p className="mb-2 text-gray-700"><strong>Product ID:</strong> {product.productId}</p>
            <p className="text-gray-700"><strong>Quantity:</strong> {product.quantity}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CartPage;