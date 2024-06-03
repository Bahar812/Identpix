import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

import BottomBar from '../components/BottomBar';
import ProfileIcon from '../assets/ProfileIcon.png'

const Homepage = () => {

    const { userId } = useParams();

    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        const fetchAlbums = async (event) => {
            // event.preventDefault
            console.log(import.meta.env.VITE_API_URL)
            console.log("USERIDD: ", userId)
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/albums/${userId}`, {
                    headers: {
                        'ngrok-skip-browser-warning': 'skip-browser-warning'
                    }
                });
                setAlbums(response.data.data)
                console.log("HALOOO")
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching albums', error);
            }
        };

        fetchAlbums();
    }, []);

    return (
        <div className="flex flex-col w-full h-full items-start justify-between gap-4">
            <div className="flex flex-col w-full h-full">
                <div className="flex w-full items-center justify-between p-4 pt-8">
                    <h1 className='flex w-full items-center justify-start font-bold text-2xl text-[#2563EB]'>IdentPIX</h1>
                    <Link to={`/profile/${userId}`}>
                        <img src={ProfileIcon} alt="profile" className='flex w-10 h-auto' />
                    </Link>
                </div>
                <h2 className='font-normal text-lg text-gray-700 px-4'>Your albums</h2>
                <h2 className='font-normal text-sm text-gray-700 px-4'> Effortlessly share your favorite moments with friends and family. Capture, organize, and cherish every memory, all in one place. Let's get started! 📷🖼️</h2>
                <div className="flex flex-col w-full h-full px-6 pt-8 pb-16 gap-4">
                    {albums.map((album, index) => (
                        // <Link className={`flex w-full h-36 rounded-lg shadow-xl bg-[url('${import.meta.env.VITE_API_URL}/images/${album[1]}/${album[7]}')]`} to={`/album-detail/${userId}/${album[1]}`} key={index}>
                        //     {/* <Link to={`/home/${userId}`} key={index}> */}
                        //     <h2 className='text-black text-xl font-bold'>{album[3]}</h2> {/* Album name */}
                        //     {/* https://3c10-114-141-92-36.ngrok-free.app/images/1QB1OAeHfScpPsQ3RUXFhWQDYuvpqNqGR/1709098585979.jpg */}
                        //     {/* <img src={`${import.meta.env.VITE_API_URL}/images/${album[1]}/${album[7]}`} alt={album[4]} className='rounded-lg border-4 border-opacity-50 border-[#2563EB] drop-shadow-2xl ' /> */}
                        // </Link>
                        <Link
                            className="flex w-full h-48 rounded-lg shadow-xl bg-cover bg-center"
                            style={{ backgroundImage: `url(${import.meta.env.VITE_API_URL}/images/${album[1]}/${album[7]})` }}
                            to={`/album-detail/${userId}/${album[1]}`}
                            key={index}
                        >
                            <h2 className='text-white text-md font-normal ml-auto mt-auto mr-2 mb-2 py-[4px] px-4 bg-[#2563EB] rounded-full'>{album[3]}</h2> {/* Album name */}
                        </Link>
                    ))}
                </div>
            </div>

            <div className="flex flex-col w-full pb-4 bg-transparent fixed bottom-4">
                <Link className='ml-4 mr-auto bg-black py-4 px-6 rounded-md shadow-lg text-white m-4 font-semibold' to={`/upload-album/${userId}`}>Upload Album</Link>
                {/* <BottomBar home={true} userId={userId} /> */}
            </div>
        </div>
    )
}

export default Homepage