import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const UploadAlbum = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [link, setLink] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [clicked, setClicked] = useState(false);

  const uploadAlbum = async (event) => {
    console.log("Upload album button pressed");
    console.log("Disabling button ...");
    setClicked(true);
    event.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/upload-album/${userId}`,
        {
          link,
          name,
          description,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        },
      );
      console.log(response.data);
      navigate(`/home/${userId}`);
    } catch (error) {
      console.log("error : ", error);
    }
  };

  return (
    <div className="flex flex-col w-full h-screen bg-[#151515] text-[#F7F9F2] font-poppins">
      {/* Header Section */}
      <div className="flex w-full p-4 items-center justify-start">
        <Link to={`/home/${userId}`} className="text-[#FFDB00] hover:underline">
          Back
        </Link>
      </div>

      {/* Page Title */}
      <h1 className="mx-4 mb-8 font-semibold w-3/4 text-xl text-[#F7F9F2]">
        Upload your own Google Drive folder here! 📂
      </h1>

      {/* Google Drive Folder Link Input */}
      <div className="flex flex-col w-full mb-8">
        <label htmlFor="link" className="mx-4 font-semibold text-[#F7F9F2]">
          Google Drive Folder Link
        </label>
        <input
          required
          onChange={(e) => setLink(e.target.value)}
          type="text"
          name="link"
          id="link"
          placeholder="Google Drive Folder Link"
          className="rounded-lg mx-4 my-2 p-2 bg-[#1E1E1E] text-[#F7F9F2] border-2 border-gray-600 focus:ring-2 focus:ring-[#FFDB00] outline-none"
        />
      </div>

      {/* Album Name Input */}
      <div className="flex flex-col w-full mb-8">
        <label htmlFor="name" className="mx-4 font-semibold text-[#F7F9F2]">
          Album Name
        </label>
        <input
          required
          onChange={(e) => setName(e.target.value)}
          type="text"
          name="name"
          id="name"
          placeholder="Album Name"
          className="rounded-lg mx-4 my-2 p-2 bg-[#1E1E1E] text-[#F7F9F2] border-2 border-gray-600 focus:ring-2 focus:ring-[#FFDB00] outline-none"
        />
      </div>

      {/* Album Description Input */}
      <div className="flex flex-col w-full mb-8">
        <label
          htmlFor="description"
          className="mx-4 font-semibold text-[#F7F9F2]"
        >
          Album Description
        </label>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          name="description"
          id="description"
          cols="30"
          rows="5"
          placeholder="Write a description for your album..."
          className="rounded-lg mx-4 my-2 p-2 bg-[#1E1E1E] text-[#F7F9F2] border-2 border-gray-600 focus:ring-2 focus:ring-[#FFDB00] outline-none"
        ></textarea>
      </div>

      {/* Upload Button */}
      <button
        disabled={clicked}
        type="submit"
        onClick={uploadAlbum}
        className={`flex items-center justify-center text-black font-semibold h-12 p-4 bg-[#FFDB00] rounded-lg m-4 ${
          clicked ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
        }`}
      >
        Upload Album 👉
      </button>
    </div>
  );
};

export default UploadAlbum;
