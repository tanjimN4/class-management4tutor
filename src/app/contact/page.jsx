"use client"
import React, { useState } from 'react';
import Link from 'next/link'; // Importing Link for navigation

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you can handle form submission, like sending the data to a server
        console.log('Form Submitted:', formData);
        setFormData({
            name: '',
            email: '',
            message: ''
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-6 h-screen flex flex-col justify-center">
            {/* Home Link */}
            <Link href="/" passHref>
                <button className="text-green-500 text-lg font-semibold mb-6">
                    &larr; Back to Home
                </button>
            </Link>

            <h1 className="text-3xl font-semibold mb-4 text-center text-green-600">Contact Us</h1>

            <div className="mb-6">
                <h2 className="text-xl font-medium mb-2">Our Contact Information</h2>
                <p className="mb-2"><strong>Email:</strong> contact@company.com</p>
                <p><strong>Phone:</strong> (123) 456-7890</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 bg-slate-800 p-6 rounded-lg shadow-lg">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="mt-1 p-2 w-full border bg-slate-600 text-white border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="mt-1 p-2 w-full border bg-slate-600 text-white border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                </div>

                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-white">Message</label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="mt-1 p-2 w-full bg-slate-600 text-white border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        rows="5"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Contact;
