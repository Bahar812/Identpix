import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import GoogleIcon from '../assets/google_icon.png'
import AppleIcon from '../assets/apple_icon.png'

const Register = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/register`, { fullname: name, email, password });
            console.log(response.data);
            navigate('/login')
        } catch (error) {
            console.error('Error registering user', error);
        }
    };

    return (
        <div className='flex flex-col items-center justify-center p-12 h-screen'>
            <h1 className='font-extrabold text-4xl m-8'>Sign Up</h1>
            <div className="flex flex-col gap-2 w-full">
                <input className='px-4 py-2 rounded-lg border' type="text" name="name" id="name" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                <input className='px-4 py-2 rounded-lg border' type="email" name="email" id="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input className='px-4 py-2 rounded-lg border' type="password" name="password" id="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <a href="#" className='text-xs font-medium'>Forget your password ?</a>
                <div className="flex w-full items-center justify-start">
                    <input type="checkbox" name="remember" id="remember" className='mt-1' />
                    <p className='font-medium text-sm pl-1'>I agree to IdentPix's <a href="#" className='text-[#2563EB]'>terms of services</a></p>
                </div>
                <div className="flex w-full items-start justify-start">
                    <input type="checkbox" name="remember" id="remember" className='mt-1' />
                    <p className='font-medium text-sm pl-1'>I accept to IdentPix’s use of my data for the service and
                        everything else described in the <a href="#" className='text-[#2563EB]'>Privacy Policy</a> and <a href="#" className='text-[#2563EB]'>Data
                            Processing Agreement</a></p>
                </div>
                <button type="submit" className='bg-[#2563EB] py-2 my-2 rounded-lg text-white font-medium hover:opacity-70' onClick={handleSubmit}>Continue</button>
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
                    <h1 className='mr-1'>Already have an accont?</h1>
                    <Link to="/login" className='font-semibold'>Sign In!</Link>
                </div>
            </div>
        </div>
    )
}

export default Register