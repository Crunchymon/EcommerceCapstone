
import { getAllUsers } from '../lib/users'

export async function GET() {
  try {
    const users = await getAllUsers()
    return Response.json(users)
  } catch (error) {
    console.error('Error fetching users:', error)
    return Response.json({ error: 'Failed to fetch users' }, { status: 500 })
  }
} 