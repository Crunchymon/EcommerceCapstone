export async function POST(req) {
    const { userId } = await req.json();
    const users = await fs.readJSON(usersFile);
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex === -1) return Response.json({ error: 'User not found' }, { status: 404 });
  
    const cart = users[userIndex].cart;
    if (!cart.length) return Response.json({ error: 'Cart is empty' }, { status: 400 });
  
    users[userIndex].cart = [];
    await fs.outputJSON(usersFile, users);
    return Response.json({ message: 'Order placed', order: cart });
  }
  