import React from 'react'
import { Link } from 'react-router-dom'

const BottomBar = ({ home, userId }) => {

    return (
        <div className='flex w-full h-[80px] bg-white shadow-inner items-center justify-around'>
            <Link to={`/home/${userId}`} className={home ? 'text-[#2563EB]' : 'text-black'}>Home</Link>
            {/* <Link to={`/profile/${userId}`}>Home</Link> */}
            <Link to={`/profile/${userId}`}className={home ? 'text-black' : 'text-[#2563EB]'}>Profile</Link>
        </div>
    )
}

export default BottomBar