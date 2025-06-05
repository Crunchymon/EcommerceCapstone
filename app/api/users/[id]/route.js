import { getAllUsers } from '../../lib/users'

export async function GET(_, { params }) {
    try {
        const users = await getAllUsers()
        const userId = params.id;
        const user = users[userId];
        
        if (!user) {
            return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
        }

        // Ensure user has all required fields
        const validatedUser = {
            id: userId,
            email: user.email || '',
            username: user.username || '',
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            phoneNumber: user.phoneNumber || '',
            cart: Array.isArray(user.cart) ? user.cart : [],
            orders: Array.isArray(user.orders) ? user.orders : [],
            createdAt: user.createdAt || new Date().toISOString()
        };
        
        return Response.json(validatedUser);
    }
    catch (error) {
        console.error('Error in fetching the user:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch user' }), { status: 500 });
    }
} 