import fs from 'fs-extra';
import path from 'path';

const usersFile = path.join(process.cwd(), 'data', 'users.json');

export async function POST(req) {
    try {
      const { userId, product, isCartCheckout, items } = await req.json();

      if (!userId) {
        return new Response(JSON.stringify({ error: 'User ID is required' }), { status: 400 });
      }

      // Validate request data based on order type
      if (isCartCheckout) {
        if (!items || !Array.isArray(items) || items.length === 0) {
          return new Response(JSON.stringify({ error: 'Cart items are required for checkout' }), { status: 400 });
        }
      } else {
        if (!product) {
          return new Response(JSON.stringify({ error: 'Product data is required for single order' }), { status: 400 });
        }
      }

      const users = await fs.readJSON(usersFile);
      const user = users[userId];

      if (!user) {
        return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
      }

      // Initialize orders array if it doesn't exist
      if (!user.orders) {
        user.orders = [];
      }

      const orderDate = new Date().toISOString();
      const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      if (isCartCheckout) {
        // Create a single order for all cart items
        const order = {
          orderId,
          items: items.map(item => ({
            id: item.id,
            title: item.title,
            price: item.price,
            quantity: item.quantity,
            thumbnail: item.thumbnail,
            total: item.price * item.quantity
          })),
          total: items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
          purchaseDate: orderDate,
          status: 'Processing'
        };
        user.orders.push(order);
      } else {
        // Single product order
        const order = {
          orderId,
          items: [{
            id: product.id,
            title: product.title,
            price: product.price,
            quantity: product.quantity,
            thumbnail: product.thumbnail,
            total: product.price * product.quantity
          }],
          total: product.price * product.quantity,
          purchaseDate: orderDate,
          status: 'Processing'
        };
        user.orders.push(order);
      }

      await fs.outputJSON(usersFile, users, { spaces: 2 });

      return new Response(JSON.stringify({ 
        message: 'Order placed successfully', 
        orderId,
        purchaseDate: orderDate
      }), { status: 200 });

    } catch (error) {
      console.error('Error processing order:', error);
      return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}
  