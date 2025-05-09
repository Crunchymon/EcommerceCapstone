import { createUser } from '@/lib/users';

export async function POST(req) {
  const { email, password } = await req.json();
  const user = await createUser(email, password);
  if (!user) {
    return Response.json({ error: 'User already exists' }, { status: 400 });
  }
  return Response.json({ message: 'User created', user: { id: user.id, email: user.email } });
}
