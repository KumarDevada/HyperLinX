import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'
import giffy from '../assets/giffy.gif'

function LandingPage({isLoggedIn}) {
    return (

            
        <div className="w-80 mt-6 m-auto flex flex-col items-center justify-center h-full relative z-10">
            <div className='flex items-start justify-center '>
                <h1 className='text-center text-5xl font-bold bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent font-serif'>HyperLinX</h1> 
                <img src={logo} style={{width:'25px'}} alt="logo" />
            </div>
            <hr className="w-full  m-auto  border-slate-500 my-4" />

            <div className='bg-gradient-to-r from-green-100 to-pink-200 p-8 rounded-full ring ring-blue-300' style={{borderRadius:'61% 39% 57% 43% / 50% 32% 68% 50% '}}>
                <img src={giffy} style={{width:'250px', marginRight:'-50px'}} alt="gif" />
            </div>

            <div>
                <h1 className=' text-center text-2xl my-2 font-semibold font-mono bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent'>Forget the hassle of remembering URLs.</h1>
                <h1 className=' text-center text-md font-semibold text-slate-500'> HyperLinX organizes and shares your essential links effortlessly!</h1>
            </div>

            {(isLoggedIn) ? (
                <div className="">
                    <a href="/login" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Get Started</a>
                </div>
            ) : (
                <div className="w-full mt-5 flex gap-4">
                    <a href="/signup" className=" flex-1 text-center font-semibold px-4 py-2 bg-gradient-to-r from-rose-400 to-orange-300 text-white rounded-md hover:ring hover:ring-yellow-300 shadow-md">Sign Up</a>
                    <a href="/login" className=" flex-1 text-center font-semibold px-4 py-2 bg-gradient-to-r from-indigo-400 to-cyan-400 text-white rounded-md hover:ring hover:ring-blue- shadow-md">Login</a>
                </div>
            )}
            
        </div>
            
    );
}

export default LandingPage;
