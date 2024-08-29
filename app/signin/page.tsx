'use client'
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
export default function(){
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [loading , setLoading] = useState<boolean>(false);
    const navigate = useRouter();
    const handleSubmit = async (e: React.FormEvent) => {
        const result = await signIn('credentials', {
            redirect: false,
            email,
            password,
        });
        
        if (result?.error) {
            // Handle the error, e.g., display an error message
            setError(result.error);
        } else {
            // Manually redirect the user after a successful sign-in
            navigate.push('/signin');
        }
    }
    if(loading){
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <div className="text-2xl font-semibold text-gray-700 animate-pulse">
                    Loading...
                </div>
            </div>
        );
    }  
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
                <form onSubmit={handleSubmit}>
                    {error && <div className="mb-4 text-red-600">{error}</div>}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
                    >
                        Sign In
                    </button>
                </form>
                <div className="text-center mt-4 flex gap-x-5 justify-center">
                    <button className='border p-2 rounded hover:bg-gray-200' onClick={async()=>{await signIn("google")}}>GOOGLE</button>
                    <button className='border p-2 rounded hover:bg-gray-200' onClick={async()=>{await signIn("github")}}>GITHUB</button>
                </div>
            </div>
        </div>
    );
};