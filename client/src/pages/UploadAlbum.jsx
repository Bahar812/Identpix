import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const UploadAlbum = () => {

    const { userId } = useParams()
    const navigate = useNavigate()

    const [link, setLink] = useState("")
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")

    const [clicked, setClicked] = useState(false)

    const uploadAlbum = async (event) => {
        console.log("Upload album button pressed")
        console.log("Disabling button ...")
        setClicked(true)
        event.preventDefault()
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/upload-album/${userId}`, {
                link,
                name,
                description
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            })
            console.log(response.data)
            navigate(`/home/${userId}`)
        } catch (error) {
            console.log("error : ", error)
        }
    }

    return (
        <div className='flex flex-col w-full h-screen'>
            <div className="flex w-full p-4 items-center justify-start">
                <Link to={`/home/${userId}`} className='text-blue-500'>Back</Link>
            </div>
            <h1 className='mx-4 mb-8 font-semibold w-3/4 text-xl'>Upload your own Google Drive folder here! 🔮📂</h1>
            <div className="flex flex-col w-full mb-8">
                <label htmlFor="link" className='mx-4 font-semibold'>Google Drive Folder Link</label>
                <input required onChange={(e) => setLink(e.target.value)} type="text" name="link" id="link" placeholder='Google Drive Folder Link' className='rounded-lg mx-4 my-2 p-2 border-2 border-gray-400' />
            </div>
            <div className="flex flex-col w-full">
                <label htmlFor="link" className='mx-4 font-semibold'>Album Name</label>
                <input required onChange={(e) => setName(e.target.value)} type="text" name="name" id="link" placeholder='Album Name' className='rounded-lg mx-4 my-2 p-2 border-2 border-gray-400' />
            </div>
            <div className="flex flex-col w-full">
                <label htmlFor="link" className='mx-4 font-semibold'>Album Description</label>
                {/* <input type="textarea" name="description" id="link" className='rounded-lg mx-4 my-2 p-2 h-24 border-2 border-gray-400' /> */}
                <textarea onChange={(e) => setDescription(e.target.value)} name="description" id="description" cols="30" rows="5" className='rounded-lg mx-4 my-2 p-2 border-2 border-gray-400'></textarea>
            </div>
            <button disabled={clicked} type='submit' onClick={uploadAlbum} className={clicked ? `flex items-center justify-center text-white font-semibold h-12 p-4 bg-[#2563EB] rounded-lg m-4 opacity-50` : `flex items-center justify-center text-white font-semibold h-12 p-4 bg-[#2563EB] rounded-lg m-4`}>Upload Album 👉</button>

        </div>
    )
}

export default UploadAlbum