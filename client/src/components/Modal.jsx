// Modal.js

import React, { useState, useEffect } from 'react';

const Modal = ({ imageUrl }) => {
    const [isModalOpen, setIsModalOpen] = useState(true);

    const handleDownload = () => {
        // Implement your download logic here
        // For example, create a link to download the image
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = 'image.jpg'; // Set the desired filename
        link.click();
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    if (!isModalOpen) {
        return null; // Don't render the modal if it's closed
    }

    useEffect(() => {
        console.log("Image URL di modaal : ", imageUrl)
    }, [])

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg shadow-lg">
                <img src={imageUrl} alt="Clicked Image" className="w-full" />
                <button
                    onClick={handleDownload}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                    Download
                </button>
                {/* <button
                    onClick={handleCloseModal}
                    className="text-gray-500 hover:text-gray-700"
                >
                    Close
                </button> */}
            </div>
        </div>
    );
};

export default Modal;
