import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const RedirectPage = () => {

    const navigate = useNavigate()

    useEffect(() => {
        const toLogin = () => {
            navigate('/login')
        }
        toLogin()
    }, [])

  return (
    <div className='flex flex-col w-full h-screen items-center justify-center'>
        <h1 className='text-lg'>Redirecting to Login screen ...</h1>
    </div>
  )
}

export default RedirectPage