import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { RiDeleteBinLine } from 'react-icons/ri'; 
import { FaEdit } from 'react-icons/fa';
import MyLoader from '../../assets/MyLoader';

const HostedListings = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteListingId, setDeleteListingId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchHostedListings = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/hosting/hosted-listings`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setListings(response.data.listings);
    }
    catch (err) {
      console.error('Error fetching hosted listings:', err);
      setError('Failed to fetch hosted listings.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (listingId) => {
    setDeleteListingId(listingId);
    setShowModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/hosting/delete-listing/${deleteListingId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setListings(listings.filter((listing) => listing._id !== deleteListingId));
      setShowModal(false);
    } catch (err) {
      console.error('Error deleting listing:', err);
      setError('Failed to delete the listing.');
    }
  };

  const handleDeleteCancel = () => {
    setShowModal(false);
  };

  useEffect(() => { 
      window.scrollTo(0, 0); 
    fetchHostedListings();
  }, []);

  if (loading) {
    return <MyLoader />;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className='bg-gray-100 pt-[110px] border-b-[2px] pb-[15px] min-h-screen justify-center items-center '>
      <div className="md:px-[25px] px-[15px] xl:px-[150px]" >
        <h3 className='text-[24px] text-rose-600 font-[700] text-center'>Your Property Listings</h3>
        <div className='bg-rose-600  mt-[15px] mb-[35px] rounded-xl h-[2px]'></div>
        <div className="md:p-0 p-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
          {listings.map((listing) => (
            <div
              key={listing._id}
              className="border rounded-lg px-[25px] py-8 shadow-sm bg-white relative"
            >
              <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                  <img src={listing.images.placePicture} alt="Connection Error" className='h-[50px] w-[50px] rounded-xl' />
                  <p className="ml-[8px]">
                    <span className="text-lg font-semibold">{`${listing.name.slice(0, 18)}...`}</span> <br />
                    <span className="text-[12px] mt-[-4px] text-gray-500">{listing.address.suburb}, {listing.address.country}</span>
                  </p>
                </div>
                <button
                  onClick={() => handleDeleteClick(listing._id)}
                  className="absolute top-3 right-3 text-red-500 hover:text-red-700"
                >
                  <RiDeleteBinLine size={20}/>
                </button>
                <button
                  onClick={() => navigate(`/update-listing/${listing._id}`)}
                  className="absolute top-3 right-9 text-blue-500 hover:text-blue-700"
                >
                  <FaEdit size={20}/>
                </button>
              </div>
              <p className="text-[14px] break-words mt-[8px] text-gray-700">{listing.summary.slice(0,150)}</p>
              <p className="mt-2 text-[14px] text-green-700 font-medium">${listing.price} /night</p>

            </div>
          ))}
        </div>

        {listings.length === 0 && (
          <p className="mt-6 text-center text-gray-500">You have no hosted listings.</p>
        )}

        {showModal && (
          <div className="fixed inset-0 py-[35px] flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white px-6 py-[45px] rounded-xl shadow-md w-96">
              <h3 className="text-xl font-semibold text-center mb-4">Are you sure?</h3>
              <p className="text-center mb-4">Are you sure you want to delete this listing?</p>
              <div className="flex justify-evenly mt-[20px]">
                <button
                  onClick={handleDeleteConfirm}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={handleDeleteCancel}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HostedListings;
