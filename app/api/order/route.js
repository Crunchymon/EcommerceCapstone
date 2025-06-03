import fs from 'fs-extra';
import path from 'path';

const usersFile = path.join(process.cwd(), 'data', 'users.json');

export async function POST(req) {
    try {
      const { userId, product } = await req.json();

      if (!userId || !product) {
        return new Response(JSON.stringify({ error: 'User ID and product data are required' }), { status: 400 });
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

      // Add the purchased product to the user's orders
      // You might want to add more details here like timestamp, order ID, etc.
      user.orders.push({ ...product, purchaseDate: new Date().toISOString(), status: 'Processing' });

      // Optionally remove the item from the cart if it exists there
      // This depends on your Buy Now flow - if it bypasses the cart,
      // you might not need to remove it from the cart here.
      // user.cart = user.cart.filter(item => item.id !== product.id);

      await fs.outputJSON(usersFile, users, { spaces: 2 });

      return new Response(JSON.stringify({ message: 'Order placed successfully', order: product }), { status: 200 });

    } catch (error) {
      console.error('Error processing order:', error);
      return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
  }
  