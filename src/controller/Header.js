import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
    return (
        <div className=' w-full bg-blue-500 '>
            <div className='h-[33%]'>
                <h1 className='text-center font-semibold p-5 text-2xl'>Wheather App</h1>
                <div className=' flex justify-around font-semibold text-xl p-3'>
                    <Link to="/login">Login</Link>
                    <Link to="/">Register</Link>
                </div>
            </div>
        </div>
    )
}

export default Header
