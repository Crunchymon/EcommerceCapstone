import fs from 'fs-extra';
import path from 'path';

const usersFile = path.join(process.cwd(), 'data', 'users.json');

export async function GET(_, { params }) {
  const users = await fs.readJSON(usersFile);
  const user = users.find(u => u.id === params.userId);
  if (!user) return Response.json({ error: 'User not found' }, { status: 404 });
  return Response.json(user.cart || []);
}

export async function POST(req, { params }) {
  const { productId, quantity } = await req.json();
  const users = await fs.readJSON(usersFile);
  const userIndex = users.findIndex(u => u.id === params.userId);
  if (userIndex === -1) return Response.json({ error: 'User not found' }, { status: 404 });

  const cart = users[userIndex].cart || [];
  const existing = cart.find(item => item.productId === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ productId, quantity });
  }

  users[userIndex].cart = cart;
  await fs.outputJSON(usersFile, users);
  return Response.json({ message: 'Cart updated', cart });
}
