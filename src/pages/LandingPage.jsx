import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'
import giffy from '../assets/giffy.gif'

function LandingPage({isLoggedIn}) {
    return (

            
        <div className="w-80 mt-6 m-auto flex flex-col items-center justify-center h-full relative z-10">
            <div className='flex items-start justify-center'>
                <h1 className='text-center text-5xl font-bold bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent font-montserrat'>HyperLinX</h1> 
                <img src={logo} style={{width:'25px'}} alt="logo" />
            </div>
            <hr className="w-3/5  m-auto  border-slate-500 my-4" />

            <div className='bg-slate-300 p-8 rounded-full '>
                <img src={giffy} style={{width:'250px', marginRight:'-50px'}} alt="gif" />
            </div>

            <div>
                <h1 className=' text-center text-2xl my-2 font-semibold font-phudu bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent'>Forget the hassle of remembering URLs.</h1>
                <h1 className=' text-center text-md font-semibold text-slate-500'> HyperLinX organizes and shares your essential links effortlessly!</h1>
            </div>

            {(isLoggedIn) ? (
                <div className="">
                    <a href="/login" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Get Started</a>
                </div>
            ) : (
                <div className="w-full mt-5 flex gap-4">
                    <a href="/signup" className=" flex-1 text-center font-semibold px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600">Sign Up</a>
                    <a href="/login" className=" flex-1 text-center font-semibold px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600">Login</a>
                </div>
            )}
            
        </div>
            
    );
}

export default LandingPage;
