import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from '../../AuthProvider';
import { useNavigate } from 'react-router-dom';
import noResults from "../../assets/PhotosAssets/noResults.webp"

const SearchListings = () => {
    const navigate = useNavigate()
    const { searchfilters } = useAuthContext();
    const [results, setResults] = useState([]);

    //const [displayedResults, setDisplayedResults] = useState([]);
    //const [currentPage, setCurrentPage] = useState(1);
    //const resultsPerPage = 1; 

    useEffect(() => {
        const fetchListings = async () => {
            try {
                //console.log(searchfilters)
                const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/home/filtered-listings`, searchfilters);

                setResults(response.data);
                //console.log(response.data)
                //setDisplayedResults(response.data.slice(0, resultsPerPage));
            }
            catch (error) {
                console.error('Error fetching listings:', error);
            }
        };

        fetchListings();
    }, [searchfilters]);


    /*const loadMoreResults = () => {
        const nextPage = currentPage + 1;
        const start = currentPage * resultsPerPage;
        const end = start + resultsPerPage;

        setDisplayedResults([...displayedResults, ...results.slice(start, end)]);
        setCurrentPage(nextPage);
    };*/

    return (
        <div className="min-h-screen bg-gray-50 lg:[pt-[150px] pt-[100px] xl:px-[75px] px-4">
            <h2 className="text-[20px] pl-[5px] lg:text-[18px] font-[700] mb-[8px] text-rose-500">
                Filtered Listings
            </h2>
            <div className='w-[98%] mx-auto bg-rose-300 rounded-xl h-[1.5px]'></div>
            {results.length === 0 &&
                <div className='mt-[150px] w-full flex flex-col  mx-auto contrast justify-center items-center '>
                    <img className='mix-blend-multiply z-10 scale-[0.8]' src={noResults} alt="" />
                    <p className='text-gray-400 bg-gray-50 z-30 pt-[18px] mt-[-70px] font-[600] text-[15px]'>No results found for your filter</p>
                </div>
            }
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 py-4">
                {results.map(listing => (
                    <div
                        key={listing._id}
                        onClick={() => navigate(`/listing/${listing._id}`)}
                        className="overflow-hidden border rounded-xl bg-white cursor-pointer"
                    >
                        <img
                            src={listing.images.placePicture || 'https://via.placeholder.com/300'}
                            alt={listing.name}
                            loading='lazy'
                            className="m-2 h-[290px] lg:h-[230px] xl:h-[240px] w-[95%] border rounded-xl hover:shadow-xl transition duration-200"
                        />
                        <div className="px-4 pb-3">
                            <h2 className="font-semibold text-lg">{listing.address.suburb}, {listing.address.country}</h2>
                            <p className="text-gray-500">{listing.type}</p>
                            <p className="text-rose-600 underline font-[600]">{listing.category}</p>
                            <p className="text-gray-500 text-[14px]">Bookings Made: <span className='font-[600]'>{listing.bookingsMade}</span></p>
                            <p className="font-bold text-lg">${listing.price} / night</p>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchListings;
