import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../components/Loader';

function UpdateLinkForm() {
    const [websiteName, setwebsiteName] = useState('');
    const [link, setlink] = useState('');
    const [loading, setloading] = useState(false)
    const navigate = useNavigate();
    const { uniqueKey, linkId } = useParams();
    const localapi = `http://localhost:5000/api/users/${uniqueKey}/links/${linkId}`
    const remote = `https://hyperlinx-backend.onrender.com/api/users/${uniqueKey}/links/${linkId}`

    const handleSubmit = async (e) => {
        e.preventDefault();
        setloading(true)
        try {
            const response = await axios.put(remote, {websiteName, link });
            if (response && response.status === 201) {
                setloading(false)
                navigate(`/${uniqueKey}`);
            } else {
                setloading(false)
                alert(response.data.message)
            }
        } catch (error) {
            setloading(false)
            alert('Unexpected server error...')
        }
    };

    return (
        
                

                <div
                    className="w-80 m-auto mt-40 rounded-lg shadow h-auto p-6 bg-white relative overflow-hidden"
                    >
                        {loading && <Loader />}

                    <div className="flex flex-col justify-center items-center space-y-2">
                        <h2 className="text-2xl font-medium text-slate-700">Update the Link</h2>
                        <p className="text-slate-500">Enter details below.</p>
                    </div>
                    <form onSubmit={handleSubmit} className="w-full mt-4 space-y-3">
                    <div>
                        <input
                            className="outline-none border-2 rounded-md px-2 py-1 text-slate-500 w-full focus:border-blue-300"
                            placeholder="Updated Website Name"
                            value={websiteName}
                            onChange={(e) => setwebsiteName(e.target.value)}
                            id="websiteName"
                            name="websiteName"
                            type="text"
                        />
                        </div>
                        <div>
                        <input
                            className="outline-none border-2 rounded-md px-2 py-1 text-slate-500 w-full focus:border-blue-300"
                            placeholder="Updated Link"
                            value={link}
                            onChange={(e) => setlink(e.target.value)}
                            id="link"
                            name="link"
                            type="text"
                        />
                        </div>
                        
                        
                        <button
                        className="w-full justify-center py-1 bg-green-500 hover:bg-green-600 active:bg-green-700 rounded-md text-white ring-2"
                        id="postnewlink"
                        name="postnewlink"
                        type="submit"
                        >
                        Update Link
                        </button>
                        
                    </form>
                </div>



        
    );
}

export default UpdateLinkForm;
