import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

import FlookLogo from "../assets/flook_logo.png";

const Homepage = () => {
  const { userId } = useParams();

  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchAlbums = async (event) => {
      // event.preventDefault
      console.log(import.meta.env.VITE_API_URL);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/albums/${userId}`,
          {
            headers: {
              "ngrok-skip-browser-warning": "skip-browser-warning",
            },
          },
        );
        setAlbums(response.data.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching albums", error);
      }
    };

    fetchAlbums();
  }, []);

  return (
    <div className="flex flex-col w-full h-screen items-start justify-between gap-4 bg-[#151515] text-[#F7F9F2] font-poppins">
      {/* Header Section */}
      <div className="flex flex-col w-full h-auto">
        <div className="flex w-full items-center justify-between p-4 pt-8">
          <img src={FlookLogo} alt="profile" className="flex w-16 h-auto" />
        </div>
        <h2 className="font-normal text-lg px-4">Your albums</h2>
        <h2 className="font-normal text-sm px-4 text-[#D9D9D9]">
          Share Your Albums Easily! 📷
        </h2>
      </div>

      {/* Albums Section */}
      <div className="flex flex-col w-full flex-grow px-6 pt-8 pb-16 gap-4">
        {albums.length > 0 ? (
          albums.map((album, index) => (
            <Link
              className="flex w-full h-48 rounded-lg shadow-lg bg-cover bg-center"
              style={{
                backgroundImage: `url(${import.meta.env.VITE_API_URL}/images/${album[1]}/${album[7]})`,
              }}
              to={`/album-detail/${userId}/${album[1]}`}
              key={index}
            >
              <h2 className="text-black text-md font-normal ml-auto mt-auto mr-2 mb-2 py-[4px] px-4 bg-[#FFDB00] rounded-full">
                {album[3]}
              </h2>
            </Link>
          ))
        ) : (
          <div className="flex flex-col w-full items-center justify-center gap-4 text-[#D9D9D9]">
            <h2 className="text-lg font-semibold">No Albums Found</h2>
            <p className="text-sm">
              Start creating albums to share your memories!
            </p>
          </div>
        )}
      </div>

      {/* Upload Album Button Section */}
      <div className="flex flex-col w-full pb-4 bg-transparent fixed bottom-4">
        <Link
          className="ml-4 mr-auto bg-[#FFDB00] py-4 px-6 rounded-md shadow-lg text-black m-4 font-semibold hover:opacity-80"
          to={`/upload-album/${userId}`}
        >
          Upload Album
        </Link>
      </div>
    </div>
  );
};

export default Homepage;
