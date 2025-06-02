"use client"
import { useAppContext } from '../../context/contextAPI'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'

function Accounts() {
  const { currentUser, setCurrentUser } = useAppContext()
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState(null)

  useEffect(() => {
    if (currentUser) {
      setEditedUser(currentUser)
    }
  }, [currentUser])

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-6">Please login to view your account</h1>
          <button
            onClick={() => router.push('/pages/Authentication')}
            className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold rounded-lg bg-[#023047] text-white hover:bg-[#012235] transition-colors duration-200"
          >
            Go to Login
          </button>
        </div>
      </div>
    )
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    // Here you would typically make an API call to update the user data
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedUser(currentUser)
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      {/* Account Header */}
      <section className="bg-[#023047] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">My Account</h1>
          <p className="mt-2 text-white/80">Manage your personal information and preferences</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Overview */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-20 h-20 bg-[#023047] rounded-full flex items-center justify-center text-white text-3xl font-bold">
                  {currentUser.firstName[0]}{currentUser.lastName[0]}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">{currentUser.firstName} {currentUser.lastName}</h2>
                  <p className="text-slate-600">{currentUser.email}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-slate-500">Account Status</h3>
                  <p className="text-green-600 font-medium">Active</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-slate-500">Member Since</h3>
                  <p className="text-slate-900">January 2024</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setCurrentUser(null)}
              className="my-4 px-4 py-2 rounded-lg bg-[#023047] hover:bg-[#02547d] text-white transition-colors duration-200"
            >
              Logout
            </button>
          </div>

          {/* Personal Information */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-slate-900">Personal Information</h2>
                {!isEditing ? (
                  <button
                    onClick={handleEdit}
                    className="px-4 py-2 text-sm font-medium text-[#023047] hover:text-[#012235] transition-colors duration-200"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <div className="space-x-2">
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 text-sm font-medium text-white bg-[#023047] rounded-lg hover:bg-[#012235] transition-colors duration-200"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-500 mb-1">Username</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedUser.username}
                      onChange={(e) => setEditedUser({ ...editedUser, username: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#023047] focus:border-transparent"
                    />
                  ) : (
                    <p className="text-slate-900">{currentUser.username}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-500 mb-1">Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editedUser.email}
                      onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#023047] focus:border-transparent"
                    />
                  ) : (
                    <p className="text-slate-900">{currentUser.email}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-500 mb-1">First Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedUser.firstName}
                      onChange={(e) => setEditedUser({ ...editedUser, firstName: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#023047] focus:border-transparent"
                    />
                  ) : (
                    <p className="text-slate-900">{currentUser.firstName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-500 mb-1">Last Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedUser.lastName}
                      onChange={(e) => setEditedUser({ ...editedUser, lastName: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#023047] focus:border-transparent"
                    />
                  ) : (
                    <p className="text-slate-900">{currentUser.lastName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-500 mb-1">Phone Number</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editedUser.phoneNumber}
                      onChange={(e) => setEditedUser({ ...editedUser, phoneNumber: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#023047] focus:border-transparent"
                    />
                  ) : (
                    <p className="text-slate-900">{currentUser.phoneNumber}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Address Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-500 mb-1">Street Address</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedUser.address.street}
                      onChange={(e) => setEditedUser({
                        ...editedUser,
                        address: { ...editedUser.address, street: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#023047] focus:border-transparent"
                    />
                  ) : (
                    <p className="text-slate-900">{currentUser.address.street}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-500 mb-1">City</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedUser.address.city}
                      onChange={(e) => setEditedUser({
                        ...editedUser,
                        address: { ...editedUser.address, city: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#023047] focus:border-transparent"
                    />
                  ) : (
                    <p className="text-slate-900">{currentUser.address.city}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-500 mb-1">State</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedUser.address.state}
                      onChange={(e) => setEditedUser({
                        ...editedUser,
                        address: { ...editedUser.address, state: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#023047] focus:border-transparent"
                    />
                  ) : (
                    <p className="text-slate-900">{currentUser.address.state}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-500 mb-1">ZIP Code</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedUser.address.zipCode}
                      onChange={(e) => setEditedUser({
                        ...editedUser,
                        address: { ...editedUser.address, zipCode: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#023047] focus:border-transparent"
                    />
                  ) : (
                    <p className="text-slate-900">{currentUser.address.zipCode}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Accounts 