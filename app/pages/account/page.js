'use client';

import React from 'react';

const user = {
    address: {
        geolocation: {
            lat: "-37.3159",
            long: "81.1496"
        },
        city: "kilcoole",
        street: "new road",
        number: 7682,
        zipcode: "12926-3874"
    },
    id: 1,
    email: "john@gmail.com",
    username: "johnd",
    password: "m38rmF$",
    name: {
        firstname: "john",
        lastname: "doe"
    },
    phone: "1-570-236-7033",
    __v: 0
};

function AccountPage() {
    return (
        <div className="max-w-4xl mx-auto mt-8 p-4">
            <h1 className="text-3xl font-bold mb-6">Account Page</h1>

            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                <h2 className="text-2xl font-semibold mb-4 text-gray-700">Profile Information</h2>
                <p className="text-lg text-gray-700">Name: {user.name.firstname} {user.name.lastname}</p>
                <p className="text-lg text-gray-700">Email: {user.email}</p>
                <p className="text-lg text-gray-700">Username: {user.username}</p>
                <p className="text-lg text-gray-700">Phone: {user.phone}</p>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                <h2 className="text-2xl font-semibold mb-4 text-gray-700">Address</h2>
                <p className="text-lg text-gray-700">Street: {user.address.street}, {user.address.number}</p>
                <p className="text-lg text-gray-700">City: {user.address.city}</p>
                <p className="text-lg text-gray-700">Zipcode: {user.address.zipcode}</p>
                <p className="text-lg text-gray-700">Geolocation: Lat {user.address.geolocation.lat}, Long {user.address.geolocation.long}</p>
            </div>
        </div>
    );
}

export default AccountPage;
