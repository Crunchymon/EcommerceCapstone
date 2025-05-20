"use client"
import { useAppContext } from '../../context/contextAPI'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

function Accounts() {
  const { currentUser } = useAppContext()
  const router = useRouter()
  const [userDetails, setUserDetails] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!currentUser) {
      router.push('/pages/Authentication')
      return
    }

    const fetchUserDetails = async () => {
      try {
        const response = await fetch('../../api/users')
        const data = await response.json()
        const userData = data[currentUser.id]
        if (userData) {
          setUserDetails(userData)
        }
      } catch (error) {
        console.error('Error fetching user details:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserDetails()
  }, [currentUser, router])

  if (!currentUser) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold mb-4 text-gray-700">Please login to view your account</h1>
        <button 
          onClick={() => router.push('/pages/Authentication')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Go to Login
        </button>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-xl text-gray-700">Loading...</div>
      </div>
    )
  }

  if (!userDetails) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-xl text-red-600">Error loading user details</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-700">My Account</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-700">Username</p>
            <p className="font-medium text-gray-700">{userDetails.username}</p>
          </div>
          <div>
            <p className="text-gray-700">Email</p>
            <p className="font-medium text-gray-700">{userDetails.email}</p>
          </div>
          <div>
            <p className="text-gray-700">First Name</p>
            <p className="font-medium text-gray-700">{userDetails.firstName}</p>
          </div>
          <div>
            <p className="text-gray-700">Last Name</p>
            <p className="font-medium text-gray-700">{userDetails.lastName}</p>
          </div>
          <div>
            <p className="text-gray-700">Phone Number</p>
            <p className="font-medium text-gray-700">{userDetails.phoneNumber}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Address</h2>
        <div className="space-y-2">
          <p className="font-medium text-gray-700">{userDetails.address.street}</p>
          <p className="font-medium text-gray-700">
            {userDetails.address.city}, {userDetails.address.state} {userDetails.address.zipCode}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Accounts 