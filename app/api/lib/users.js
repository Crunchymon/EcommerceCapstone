import fs from 'fs-extra';
import path from 'path';
import bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';

const usersFile = path.join(process.cwd(), 'data', 'users.json');
const emailIndexFile = path.join(process.cwd(), 'data', 'email-index.json');

// Helper function to ensure both files exist
async function ensureFilesExist() {
  try {
    await fs.ensureFile(usersFile);
    await fs.ensureFile(emailIndexFile);
  } catch (error) {
    console.error('Error ensuring files exist:', error);
    throw new Error('Failed to initialize user storage');
  }
}

export async function getAllUsers() {
  try {
    await ensureFilesExist();
    return await fs.readJSON(usersFile);
  } catch {
    return {};
  }
}

export async function getEmailIndex() {
  try {
    await ensureFilesExist();
    return await fs.readJSON(emailIndexFile);
  } catch {
    return {};
  }
}

export async function createUser(email, password, username, firstName, lastName, phoneNumber, address) {
  try {
    await ensureFilesExist();
    const users = await getAllUsers();
    const emailIndex = await getEmailIndex();
    
    // Fast lookup using email index
    if (emailIndex[email]) {
      return null; // User already exists
    }

    const userId = uuid();
    const newUser = {
      email,
      username,
      firstName,
      lastName,
      phoneNumber,
      address,
      password: await bcrypt.hash(password, 10),
      cart: [],
      createdAt: new Date().toISOString()
    };
    
    // Update both files atomically
    users[userId] = newUser;
    emailIndex[email] = userId;
    
    await Promise.all([
      fs.outputJSON(usersFile, users),
      fs.outputJSON(emailIndexFile, emailIndex)
    ]);
    
    return { id: userId, ...newUser };
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Failed to create user');
  }
}

export async function loginUser(email, password) {
  try {
    await ensureFilesExist();
    const users = await getAllUsers();
    const emailIndex = await getEmailIndex();
    
    const userId = emailIndex[email];
    if (!userId) return null;
    
    const userData = users[userId];
    if (!userData) {
      // Handle case where user exists in index but not in users
      console.error(`User ${email} found in index but not in users`);
      return null;
    }
    
    const match = await bcrypt.compare(password, userData.password);
    return match ? { id: userId, ...userData } : null;
  } catch (error) {
    console.error('Error during login:', error);
    throw new Error('Failed to login');
  }
}

// Helper function to update user data
export async function updateUser(userId, updates) {
  try {
    await ensureFilesExist();
    const users = await getAllUsers();
    const emailIndex = await getEmailIndex();
    
    if (!users[userId]) {
      return null; // User not found
    }

    // If email is being updated, update the index
    if (updates.email && updates.email !== users[userId].email) {
      // Check if new email is already taken
      if (emailIndex[updates.email]) {
        return null; // Email already in use
      }
      
      // Remove old email from index
      delete emailIndex[users[userId].email];
      // Add new email to index
      emailIndex[updates.email] = userId;
    }

    // Update user data
    users[userId] = { ...users[userId], ...updates };
    
    // Save both files
    await Promise.all([
      fs.outputJSON(usersFile, users),
      fs.outputJSON(emailIndexFile, emailIndex)
    ]);
    
    return { id: userId, ...users[userId] };
  } catch (error) {
    console.error('Error updating user:', error);
    throw new Error('Failed to update user');
  }
}
