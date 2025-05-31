import fs from 'fs-extra';
import path from 'path';

const usersFile = path.join(process.cwd(), 'data', 'users.json');

export async function GET(_, { params }) {
  const users = await fs.readJSON(usersFile);
  const user = users[params.userId];
  if (!user) return Response.json({ error: 'User not found' }, { status: 404 });
  return Response.json(user.cart || []);
}

export async function POST(req, { params }) {
  const { cart } = await req.json();
  const users = await fs.readJSON(usersFile);
  const user = users[params.userId];
  if (!user) return Response.json({ error: 'User not found' }, { status: 404 });

  user.cart = cart;
  await fs.outputJSON(usersFile, users);
  return Response.json({ message: 'Cart updated', cart });
}
