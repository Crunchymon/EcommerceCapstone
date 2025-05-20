import { createUser } from '@/app/api/lib/users';

export async function POST(req) {
  const { 
    email, 
    password, 
    username, 
    firstName, 
    lastName, 
    phoneNumber,
    address 
  } = await req.json();
  
  if (!username || !email || !password || !firstName || !lastName || !phoneNumber || !address) {
    return Response.json({ error: 'All fields are required' }, { status: 400 });
  }

  const user = await createUser(
    email, 
    password, 
    username, 
    firstName, 
    lastName, 
    phoneNumber,
    address
  );

  if (!user) {
    return Response.json({ error: 'User already exists' }, { status: 400 });
  }

  return Response.json({ 
    message: 'User created', 
    user: { 
      id: user.id, 
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      address: user.address
    } 
  });
}
