import { getAllUsers } from '../../lib/users'

export async function GET(_, { params }) {
    try {
        const users = await getAllUsers()
        const userId = params.id;
        const user = users[userId];
        
        if (!user) {
            return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
        }
        
        // Return the full user object, including orders if they exist
        return Response.json(user);
    }
    catch (error) {
        console.error('Error in fetching the user:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch user' }), { status: 500 });
    }
} 