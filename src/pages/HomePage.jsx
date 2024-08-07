import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import logo from '../assets/logo.png'
import Loader from '../components/Loader';

const trimLink = (link, maxLength) => {
    if (link.length > maxLength) {
        return `${link.substring(0, maxLength)}...`;
    }
    return link;
};

function HomePage({isLoggedIn}) {
    const { uniqueKey } = useParams();
    const [user, setUser] = useState(null);
    const [links, setlinks] = useState(null);
    const [loading, setloading] = useState(true)
    const navigate = useNavigate();

    const publiclink = `https://hyperlinx.netlify.app/${uniqueKey}`
    

    const maxLength = 30;

    const localapi = `http://localhost:5000/${uniqueKey}`
    const remote = `https://hyperlinx-backend.onrender.com/${uniqueKey}`

    useEffect(() => {
        setloading(true)
        const fetchUserData = async () => {
            try {
                const response = await axios.get(remote);
                setUser(response.data);
                setloading(false)
                // console.log(response.data);
                // Set logged-in status based on your auth logic
            } catch (error) {
                setloading(false)
                console.error(error);
            }
        };
        fetchUserData();
    }, [uniqueKey]);

    const handleAddLink = () => {
        // console.log(uniqueKey);
        navigate(`/${uniqueKey}/newlink`);
    };

    const handleUpdateLink = (linkId) => {
        // Logic for updating a link
        navigate(`/${uniqueKey}/newlink/${linkId}`);
    };

    const localdel = `http://localhost:5000/api/users/${uniqueKey}/links/`
    const remotedel = `https://hyperlinx-backend.onrender.com/api/users/${uniqueKey}/links/`

    const handleDeleteLink = async (linkId) => {
        setloading(true)
        try {
          const response = await axios.delete(remotedel+`${linkId}`);
    
          // Update the user state with the updated links
          setUser({ ...user, links: response.data });
          setloading(false)
        } catch (error) {
            setloading(false)
          console.error('Error deleting link:', error);
        }
      };

    const handleClick = (link) => {
        const isAbsolute = link.startsWith('http://') || link.startsWith('https://');
        const finalLink = isAbsolute ? link : `http://${link}`;
        window.open(finalLink, '_blank', 'noopener,noreferrer');
    }

    const handleCopy = (link) => {
        navigator.clipboard.writeText(link)
          .then(() => {
            alert('link copied...')
          })
          .catch(err => {
            alert('Failed to copy!');
          });
      };



    return (
        <div className='w-80 m-auto mt-6'>
            
            {loading && <Loader />}

            <div className='flex items-start justify-center'>
                <a href='/' className='text-center text-3xl sm:text-5xl font-bold bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent font-montserrat'>HyperLinX</a> 
                <img src={logo} style={{width:'25px'}} alt="logo" />
            </div>
            <hr className="w-full  m-auto  border-slate-500 my-4" />
            
            <div className='w-full flex p-3 gap-3 bg-white rounded-md shadow-md justify-normal items-start'>
                <div className=' flex rounded-sm bg-slate-200'>
                    <i className="fa-solid fa-user text-xl mx-2.5 my-1 text-slate-500"></i>
                </div>
                <div className='flex flex-col'>
                    <h1 className='mb-0 text-2xl  font-semibold text-slate-600 font-montserrat'>{trimLink((user) ? user.username : 'User', 12)}</h1>
                    <p className='text-xs font-semibold font-montserrat text-slate-400'>Public Url</p>
                    <p className='text-[10px] sm:text-xs text-slate-500'>{publiclink}</p>
                </div>
                <div className=' flex rounded-sm  self-end ml-auto'>
                    <button
                        onClick={() => {handleCopy(publiclink)}}
                        className="text-gray-600  hover:bg-white/5 rounded-md px-2 transition-colors ease-linear"
                        >
                        <i className="fa-solid fa-clipboard text-xl text-slate-500"></i>
                    </button>
                </div>

            </div>
            <h1 className='text-center mb-2 text-xl sm:text-2xl mt-3 font-semibold text-slate-600 font-montserrat'>Personal Links</h1>
            {isLoggedIn && (

                <div className='w-full flex justify-center'>
                    <button className="btn" type="button" 
                    onClick={handleAddLink}>
                    <span className="btn__text">Add Link</span>
                    <span className="btn__icon"><svg className="svg" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><line x1="12" x2="12" y1="5" y2="19"></line><line x1="5" x2="19" y1="12" y2="12"></line></svg></span>
                    </button>
                </div>



            )}
            <div className='mt-8'>
                {(user?.links.length === 0) && <h1 className=' text-slate-600 mt-16 font-semibold text-center'>No links added yet...</h1>}
                {user?.links?.map((link) => (
                    <div className=' mb-3 cursor-pointer' key={link._id}> 
                        <div className="flex flex-col gap-2 w-full text-[10px] sm:text-xs ">
                        <div
                            className="succsess-alert cursor-default flex items-center justify-between w-full h-14 sm:h-16 rounded-lg bg-[#232531] px-[10px]"
                        >
                            <div className="flex gap-2">
                            <div className="text-[#2b9875] bg-white/5 backdrop-blur-xl pt-2 px-2 rounded-full">
                            {/* <i className="fa-solid fa-pen-to-square text-xl"></i> */}
                            <img src={logo} style={{width:'30px', zIndex:1}} alt="logo" />
                            </div>
                            <div className='cursor-pointer' onClick={() => {handleClick(link.link)}}>
                                <p className="text-slate-300 text-lg font-semibold">{link.websiteName}</p>
                                <p className="text-slate-400">{trimLink(link.link, maxLength)}</p>
                            </div>
                            </div>

                            <div className='flex'>
                                    {/* edit */}
                                    {isLoggedIn && (
                                        <button
                                        onClick={() => {handleUpdateLink(link._id)}}
                                        className="text-gray-600  hover:bg-white/5 p-1 rounded-md px-2 transition-colors ease-linear"
                                        >
                                        <i className="fa-solid fa-pencil text-xl text-slate-500"></i>
                                        </button>
                                )}

                                {/* delete */}
                                {isLoggedIn && (
                                        <button
                                        onClick={() => {handleDeleteLink(link._id)}}
                                        className="text-gray-600  hover:bg-white/5 p-1 rounded-md px-2 transition-colors ease-linear"
                                        >
                                        <i className="fa-solid fa-trash text-xl text-slate-500"></i>
                                        </button>
                                )}


                                {/* copy */}
                                {!isLoggedIn && (
                                        <button
                                        onClick={() => {handleCopy(link.link)}}
                                        className="text-gray-600  hover:bg-white/5 p-1 rounded-md px-2 transition-colors ease-linear"
                                        >
                                        <i className="fa-solid fa-clipboard text-xl text-slate-500"></i>
                                        </button>
                                )}
                            </div>

                            
                            
                        </div>
                        </div>

                        
                    </div>
                ))}
            </div>
            
        </div>
    );
}

export default HomePage;
