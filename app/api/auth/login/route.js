import { loginUser } from '@/app/api/lib/users';

export async function POST(req) {
  const { email, password } = await req.json();
  const user = await loginUser(email, password);
  if (!user) {
    return Response.json({ error: 'Invalid credentials' }, { status: 401 });
  }
  return Response.json({ message: 'Login successful', user: { id: user.id, email: user.email , username: user.username} });
}
