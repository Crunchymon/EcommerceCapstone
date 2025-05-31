import { loginUser } from '../../lib/users';

export async function POST(req) {
  try {
  const { email, password } = await req.json();
    
    if (!email || !password) {
      return Response.json({ error: 'Email and password are required' }, { status: 400 });
    }

  const user = await loginUser(email, password);
    
  if (!user) {
    return Response.json({ error: 'Invalid credentials' }, { status: 401 });
  }

    // Remove sensitive information before sending
    const { password: _, ...userWithoutPassword } = user;
    
    return Response.json({ 
      message: 'Login successful', 
      user: userWithoutPassword 
    });
  } catch (error) {
    console.error('Login error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
