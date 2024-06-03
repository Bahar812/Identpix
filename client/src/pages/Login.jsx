import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import GoogleIcon from '../assets/google_icon.png'
import AppleIcon from '../assets/apple_icon.png'

const Login = ({ user_id }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, { email, password }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            });
            console.log(response.data)
            user_id(response.data.data[0])
            navigate(`/home/${response.data.data[0]}`)
        } catch (error) {
            console.error('Error logging in', error);
            // Handle login error
            setErrorMessage('Invalid email or password')
        }
    };

    return (
        <div className='flex flex-col items-center justify-center p-12 h-screen'>
            <h1 className='font-extrabold text-4xl m-8'>Sign In</h1>
            <div className="flex flex-col gap-2 w-full">
                {/* <input className='px-4 py-2 rounded-lg border' type="text" name="name" id="name" placeholder='Name' /> */}
                <input className='px-4 py-2 rounded-lg border' type="email" name="email" id="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                <input className='px-4 py-2 rounded-lg border' type="password" name="password" id="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                <a href="#" className='text-xs font-medium'>Forget your password ?</a>
                <div className="flex w-full items-center justify-start">
                    <input type="checkbox" name="remember" id="remember" />
                    <p className='font-medium text-sm pl-1'>Remember me</p>
                </div>
                {errorMessage && <p className='flex w-full items-center justify-center text-red-700'>{errorMessage}</p>}
                <button type="submit" className='bg-[#2563EB] py-2 my-2 rounded-lg text-white font-medium hover:opacity-70' onClick={handleLogin} >Continue</button>
                <span className='flex w-full h-[2px] bg-gray-300 mb-2'></span>
                <div className='flex items-center justify-center w-full border-2 border-black p-2 rounded-lg text-black font-medium hover:opacity-70'>
                    <div>
                        <img src={GoogleIcon} alt="google_icon" className='mr-2' />
                    </div>
                    <h1 className='text-xs'>Sign In with Google</h1>
                </div>
                <div className='flex items-center justify-center w-full border-2 border-black p-2 rounded-lg text-black font-medium hover:opacity-70'>
                    <div>
                        <img src={AppleIcon} alt="google_icon" className='mr-2' />
                    </div>
                    <h1 className='text-xs'>Sign In with AppleID</h1>
                </div>
                <div className="flex items-center justify-center text-xs mt-2">
                    <h1 className='mr-1'>Don't have an accont?</h1>
                    <Link to="/register" className='font-semibold'>Sign Up now!</Link>
                </div>
            </div>
        </div>
    )
}

export default Login