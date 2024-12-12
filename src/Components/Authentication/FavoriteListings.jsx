import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RiDeleteBinLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import noFavourites from "../../assets/PhotosAssets/noFavourites.webp"

const FavoriteListings = () => {
    const navigate = useNavigate();
    const [listings, setListings] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        fetchListings();
    }, [currentPage]);

    const fetchListings = async () => {
        try {
            setLoading(true);
            setError('');
            const token = localStorage.getItem('token');
            const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/profile/guest-favourites?page=${currentPage}`, {
                headers: { Authorization: `Bearer ${token}` },
            }
            );

            if (currentPage === 1) {
                setListings(response.data.listings);
            }
            else {
                setListings((prev) => [...prev, ...response.data.listings]);
            }

            setTotalPages(response.data.totalPages);
        }
        catch (err) {
            setError('Failed to fetch favorite listings. Please try again.');
            console.error(err.response?.data || err.message);
        }
        finally {
            setLoading(false);
        }
    };

    const handleShowMore = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };
    if (error) {
        return <>
            <div className='bg-gray-100 pt-[115px] p-6 min-h-screen justify-center items-center '>
            <div className="max-w-[1150px] mx-auto" >
                <h3 className='text-[24px] mb-[15px] text-rose-600 font-[700]'>Favourite Listings</h3>
                <div className='h-[2.5px] bg-rose-600 mb-[35px] lg:mb-[55px]'></div>
                </div>
                <div className="flex flex-col justify-center items-center mix-blend-multiply">
                    <img src={noFavourites} alt="" className="scale-[0.6] md:scale-[0.7] opacity-70" />
                </div>
                <p className='text-center mt-[-65px] font-[600] text-rose-700 mx-auto'>You Have no favourite Listings</p>
            </div>
        </>;
    }

    return (
        <div className='bg-gray-100 pt-[115px] p-6 min-h-screen justify-center items-center '>
            <div className="max-w-[1150px] mx-auto" >
                <h3 className='text-[24px] mb-[15px] text-rose-600 font-[700]'>Favourite Listings</h3>
                <div className='h-[2.5px] bg-rose-600 mb-[35px] lg:mb-[55px]'></div>
                <div className="grid gap-6 mx-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
                    {listings.map((listing) => (
                        <div
                            key={listing._id}
                            onClick={() => navigate(`/listing/${listing._id}`)}
                            className="overflow-hidden mx-auto w-[330px] sm:w-full cursor-pointer bg-white border rounded-xl hover:shadow-md transition duration-200"
                        >
                            <img
                                src={listing.images.coverPicture || 'https://via.placeholder.com/300'}
                                alt={listing.name}
                                loading='lazy'
                                className="m-2 h-[220px] w-[95%] "
                            />
                            <div className="p-4">
                                <h2 className="font-semibold text-lg">{listing.name}</h2>
                                <p className="text-gray-500">{listing.property_type}</p> 
                                <p className="text-gray-700">Bedrooms: {listing.bedrooms}</p>
                                <p className="font-bold text-lg">${listing.price} / night</p>
                            </div>
                        </div>
                    ))}
                </div>
                {currentPage < totalPages && (
                    <div className="text-center mt-6">
                        <button
                            onClick={handleShowMore}
                            className="bg-rose-600 font-[600] text-white  px-4 hover:bg-rose-900 transition duration-300"
                            disabled={loading}
                        >
                            {loading ? 'Loading...' : 'Show More'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FavoriteListings;
