import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

import Modal from "../components/Modal";

import Asset from "../assets/29.png";

const AlbumDetail = () => {
  const { userId, albumId } = useParams();
  console.log("USER IDD, ALBUM IDD : ", userId, albumId);

  const [images, setImages] = useState([]); // display the images
  const [scannedImages, setScannedImages] = useState([]); // detected images filenames
  const [selectedImage, setSelectedImages] = useState(null); // handle image input on change
  const [imageRetrieved, setImageRetrieved] = useState(false); // scanned face retrieved
  const [subimtted, setSubmitted] = useState(false); // disable submit button after pressed once
  const [error, setError] = useState(false);
  const [openedImage, setOpenedImage] = useState(null);

  const [faceScanned, setFaceScanned] = useState(false); // validate uploaded face to be scanned

  const [scanned, setScanned] = useState(true); // state to change between all images and detected images

  const navigate = useNavigate();

  const scanFace = async (event) => {
    // event.preventDefault();

    setSubmitted(true);

    const imgData = new FormData();
    // imgData.append('file', selectedImage)
    console.log("Selected image name : ", selectedImage.name);
    imgData.append("file", selectedImage);

    console.log("HALOOO MASUK SINI");
    console.log("imgData : ", imgData);

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/upload-face`,
      imgData,
    );

    console.log("HALOOO TERUSS MASUK SINI");
    console.log(response.data);
    setFaceScanned(true);
    console.log("Face berhasil di scan bro mantap");
    // navigate('/')

    // const scannedResponse = await axios.get(`${import.meta.env.VITE_API_URL}/scan-face?filename=` + selectedImage.name, {
    const scannedResponse = await axios.get(
      `${import.meta.env.VITE_API_URL}/scan-face/${selectedImage.name}/${albumId}`,
      {
        headers: {
          "ngrok-skip-browser-warning": "skip-browser-warning",
          // 'Content-Type': 'application/json'
          // 'Access-Control-Allow-Origin': '*'
        },
      },
    );
    console.log("HALOOO, datanya : ", scannedResponse.data);
    console.log("Kalo error : ", scannedResponse.data.status);
    console.log("HALOOO, datanya : ", scannedResponse.data.data);

    setScannedImages(scannedResponse.data.data || []);

    if (scannedResponse.data.data == undefined) {
      setError(true);
    }

    console.log("ERROR =", error);
    setImageRetrieved(true);
    setFaceScanned(false);
  };

  const openImage = (image) => {
    console.log("Openin image...", image);
    setOpenedImage(image);
  };

  useEffect(() => {
    const fetchAlbums = async (event) => {
      // event.preventDefault
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/album_images?album_id=${albumId}`,
          {
            headers: {
              "ngrok-skip-browser-warning": "skip-browser-warning",
            },
          },
        );
        console.log("HALOOO");
        console.log(response.data);
        setImages(response.data);
      } catch (error) {
        console.error("Error fetching albums", error);
      }
    };
    fetchAlbums();
  }, []);

  return (
    <div className="relative flex flex-col w-full h-screen bg-[#151515] text-[#F7F9F2] font-poppins">
      {/* Header Section */}
      <div className="flex w-full p-4 items-center justify-start">
        <Link to={`/home/${userId}`} className="text-[#FFDB00] hover:underline">
          Back
        </Link>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center justify-around h-16 border-t-4 border-[#FFDB00]">
        <button
          onClick={() => setScanned(true)}
          className={`flex w-full h-full items-center justify-center ${
            scanned
              ? "bg-[#1E1E1E] text-[#FFDB00] shadow-inner shadow-lg"
              : "bg-[#1E1E1E] text-gray-400"
          }`}
        >
          Scanned
        </button>
        <button
          onClick={() => setScanned(false)}
          className={`flex w-full h-full items-center justify-center ${
            !scanned
              ? "bg-[#1E1E1E] text-[#FFDB00] shadow-inner shadow-lg"
              : "bg-[#1E1E1E] text-gray-400"
          }`}
        >
          All Photos
        </button>
      </div>

      {/* Image Display Section */}
      <div className="relative flex flex-wrap w-full h-full items-start justify-evenly">
        {scanned === false ? (
          images.map((image, index) => (
            <div
              key={index}
              className="flex w-1/3 h-36 p-2"
              onClick={() =>
                openImage(
                  `${import.meta.env.VITE_API_URL}/images/${albumId}/${image}`,
                )
              }
            >
              <img
                src={`${image}`}
                alt={image}
                className="object-cover rounded-lg border-2 border-opacity-50 border-[#FFDB00] drop-shadow-xl flex w-36"
              />
            </div>
          ))
        ) : scannedImages && scannedImages.length !== 0 ? (
          scannedImages.map((image, index) => (
            <div
              key={index}
              className="flex w-1/3 h-36 p-2"
              onClick={() =>
                openImage(
                  `${import.meta.env.VITE_API_URL}/images/${albumId}/${image}`,
                )
              }
            >
              <img
                src={`${import.meta.env.VITE_API_URL}/images/${albumId}/${image}`}
                alt={image}
                className="object-cover rounded-lg border-2 border-opacity-50 border-[#FFDB00] drop-shadow-xl flex w-36"
              />
            </div>
          ))
        ) : (
          <div className="flex flex-col w-full h-full items-center justify-center">
            {selectedImage ? (
              <div>
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="asset"
                  className="mt-16 w-48"
                />
              </div>
            ) : (
              <div>
              </div>
            )}
            <h1 className="pt-8 p-4 text-lg text-[#F7F9F2]">
              Start looking for your photos! 🤳
            </h1>
            <label
              htmlFor="file"
              className="py-2 px-6 rounded-lg bg-[#FFDB00] text-black cursor-pointer hover:opacity-90 my-2"
            >
              Take a photo!
            </label>
            <input
              type="file"
              accept="image/*"
              capture="user"
              name="file"
              onChange={(e) => setSelectedImages(e.target.files[0])}
              className="hidden"
            />
            <button
              disabled={subimtted}
              className={`py-2 px-6 rounded-lg ${
                subimtted
                  ? "bg-[#FFDB00] text-black opacity-50 cursor-not-allowed"
                  : "bg-[#FFDB00] text-black hover:opacity-90"
              }`}
              onClick={() => scanFace()}
            >
              Submit
            </button>
          </div>
        )}
        {openedImage && <Modal imageUrl={openedImage} />}
      </div>

      {/* Scanning Status Section */}
      <div className="flex items-center justify-center w-full h-full text-[#FFDB00]">
        {scanned && faceScanned ? (
          <div>
            <h1>
              Successfully scanned face. Selecting images, please wait ...
            </h1>
            <h1>This process usually takes 3 - 5 minutes</h1>
          </div>
        ) : scanned && !imageRetrieved && selectedImage != null && subimtted ? (
          <div>
            <h1>Scanning face. Please wait...</h1>
          </div>
        ) : scanned && error ? (
          <div>
            <h1>There are no photos of you in this album.</h1>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default AlbumDetail;
