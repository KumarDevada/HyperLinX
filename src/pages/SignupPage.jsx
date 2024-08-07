import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'
import Loader from '../components/Loader';

function SignupPage({setIsLoggedIn}) {
    const [username, setusername] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setloading] = useState(false)
    const navigate = useNavigate();

    const localapi = 'http://localhost:5000/api/users/register'
    const remote = 'https://hyperlinx-backend.onrender.com/api/users/register'

    const handleSubmit = async (e) => {
        e.preventDefault();
        setloading(true);
        try {
            const response = await axios.post(remote, {username, phoneNumber, password });
            if (response.status === 201) {
                setIsLoggedIn(true);
                setloading(false)
                navigate(`/${response.data.uniqueKey}`);
            } else {
                setloading(false)
                alert(response.data.message)
            }
        } catch (error) {
            setloading(false)
            alert('Phone number already exists!')
        }
    };

    return (
        
                

                <div
                    className="w-80 m-auto mt-36 rounded-lg shadow h-auto p-6 bg-white relative overflow-hidden"
                    >
                        {loading && <Loader />}

                        <div className='flex items-start justify-center'>
                            <h1 className='text-center text-5xl font-bold bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent font-montserrat'>HyperLinX</h1> 
                            <img src={logo} style={{width:'25px'}} alt="logo" />
                        </div>

                    <div className="flex flex-col justify-center items-center space-y-2">
                        <h2 className="text-2xl font-medium text-slate-500">Sign up here</h2>
                    </div>
                    <form onSubmit={handleSubmit} className="w-full mt-4 space-y-3">
                    <div>
                        <input
                            className="outline-none border-2 rounded-md px-2 py-1 text-slate-500 w-full focus:border-blue-300"
                            placeholder="UserName"
                            value={username}
                            onChange={(e) => setusername(e.target.value)}
                            id="username"
                            name="username"
                            type="text"
                        />
                        </div>
                        <div>
                        <input
                            className="outline-none border-2 rounded-md px-2 py-1 text-slate-500 w-full focus:border-blue-300"
                            placeholder="Phone Number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            id="phoneNumber"
                            name="phoneNumber"
                            type="text"
                        />
                        </div>
                        <div>
                        <input
                            className="outline-none border-2 rounded-md px-2 py-1 text-slate-500 w-full focus:border-blue-300"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            id="password"
                            name="password"
                            type="password"
                        />
                        </div>
                        
                        <button
                        className="w-full justify-center py-1 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded-md text-white ring-2"
                        id="signup"
                        name="signup"
                        type="submit"
                        >
                        signup
                        </button>
                        <p className="flex justify-center space-x-1">
                        <span className="text-slate-700"> Have an account? </span>
                        <a className="text-blue-500 hover:underline" href="/login">Login</a>
                        </p>
                    </form>
                </div>



        
    );
}

export default SignupPage;
