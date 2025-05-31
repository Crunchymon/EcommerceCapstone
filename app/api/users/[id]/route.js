import { getAllUsers } from '../../lib/users'

export async function GET(_, { params }) {
    try {
        const users = await getAllUsers()
        const response = await params
        return Response.json(users[`${response.id}`])
    }
    catch (error) {
        console.log(error)
        return Response.json('Error in fetching the users')
    }


} 