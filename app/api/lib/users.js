import fs from 'fs-extra';
import path from 'path';
import bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';

const usersFile = path.join(process.cwd(), 'data', 'users.json');

export async function getAllUsers() {
  try {
    return await fs.readJSON(usersFile);
  } catch {
    return [];
  }
}

export async function createUser(email, password) {
  const users = await getAllUsers();
  if (users.find(user => user.email === email)) return null;

  const newUser = {
    id: uuid(),
    email,
    password: await bcrypt.hash(password, 10),
    cart: []
  };
  users.push(newUser);
  await fs.outputJSON(usersFile, users);
  return newUser;
}

export async function loginUser(email, password) {
  const users = await getAllUsers();
  const user = users.find(u => u.email === email);
  if (!user) return null;
  const match = await bcrypt.compare(password, user.password);
  return match ? user : null;
}
