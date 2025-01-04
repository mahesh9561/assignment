import React, { useState } from 'react'

function Login() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = () => {

    }
    return (
        <div>
            <div>
                <div className=' flex justify-center text-sla bg-white text-slate-700 mb-10 '>
                    <div className=' p-5 border w-1/2 items-center shadow-md rounded-lg mt-10 bg-white'>
                        <div className=' text-center text-2xl font-semibold uppercase py-3'>Register Form</div>
                        <form onSubmit={handleSubmit} className=' font-semibold '>

                            <div className=' py-2'>
                                <label className='text-sm md:text-base'>Email:</label>
                                <input type="text" className=' w-full px-3 py-2 border outline-none rounded-md' value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>

                            <div className=' py-2'>
                                <label className='text-sm md:text-base'>Password:</label>
                                <input type="password" className=' w-full px-3 py-2 border outline-none rounded-md' value={pass} onChange={(e) => setPass(e.target.value)} />
                            </div>
                            <div className=' py-2'>
                                <button className=' px-4 py-2 bg-blue-400 rounded-lg text-white'>Register</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
