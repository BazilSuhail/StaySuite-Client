
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FaMedal, FaHome, FaDoorOpen, FaToilet, FaStarHalfAlt, FaStar } from 'react-icons/fa';
import { AddRating, FavoriteButton, Reviews } from './ListingRating';
import { useAuthContext } from '../../AuthProvider';
import { GiAngelWings } from 'react-icons/gi';

const LisitngDetailsLoader = () => {
  return (
    <div className="w-full overflow-x-hidden xl:px-[160px] pt-[100px] lg:pt-[120px] min-h-screen p-6 bg-white">
      <div className="w-full h-6 bg-gray-200 animate-pulse-fast mb-[25px] rounded"></div>

      <div className='grid w-full overflow-hidden gap-[6px] grid-cols-5 rounded-[25px]'>
        <div className="col-span-5 h-[250px] sm:h-[350px] md:h-[430px] md:col-span-3">
          <div className="col-span-2 h-full bg-gray-200 rounded animate-pulse-fast"></div>
        </div>

        <div className='hidden h-[430px] col-span-2 md:grid grid-cols-2 grid-rows-2 gap-[6px]'>
          <div className="bg-gray-200 rounded animate-pulse-fast"></div>
          <div className="bg-gray-200 rounded animate-pulse-fast"></div>
          <div className="bg-gray-200 rounded animate-pulse-fast"></div>
          <div className="bg-gray-200 rounded animate-pulse-fast"></div>
        </div>
      </div>

      <div className="h-[55px] mt-[15px] animate-pulse-fast bg-gray-200 rounded-xl"></div>
      <div className='w-full mt-[18px] grid lg:grid-cols-2'>
        <div className="w-full lg:order-1 order-2 space-y-2">
          <div className="h-[35px] animate-pulse-fast bg-gray-200 rounded lg:w-[85%] lg:ml-[45px]"></div>
          <div className="h-[35px] animate-pulse-fast bg-gray-200 rounded lg:w-[85%] lg:ml-[45px]"></div>
          <div className="h-[35px] animate-pulse-fast bg-gray-200 rounded lg:w-[85%] lg:ml-[45px]"></div>
          <div className="h-[35px] animate-pulse-fast bg-gray-200 rounded lg:w-[85%] lg:ml-[45px]"></div>
          <div className="h-[35px] animate-pulse-fast bg-gray-200 rounded lg:w-[85%] lg:ml-[45px]"></div>
          <div className="h-[35px] animate-pulse-fast bg-gray-200 rounded lg:w-[85%] lg:ml-[45px]"></div>
          <div className="h-[35px] animate-pulse-fast bg-gray-200 rounded lg:w-[85%] lg:ml-[45px]"></div>
        </div>
        <div className="bg-gray-200 animate-pulse-fast rounded-[25px] lg:w-[75%] lg:ml-auto mb-[15px] lg:mb-0 h-[310px]"></div>
      </div>
    </div>
  );
};

const isLoggedIn = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return false;
  }

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const isTokenExpired = payload.exp * 1000 < Date.now();
    return !isTokenExpired;
  }
  catch (err) {
    console.warn('Invalid token structure');
    return false;
  }
};

const ListingDetails = () => {
  const navigate = useNavigate();
  const { userRole } = useAuthContext();
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [userLoginStatus, setUserLoginStatus] = useState(null);
  const [hostdetails, setHostdetails] = useState(null);
  const [isInitiallyFavorited, setIsInitiallyFavorited] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ratingerror, setRatingerror] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [ratingReviews, setRatingReviews] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fetch_Review_count_and_rating = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/listing-rating/rating-review-count/${id}`);
      setRatingReviews(response.data);
    }
    catch (err) {
      setRatingerror('Failed to fetch reviews. Please try again.');
      console.error('Error fetching reviews:', err.response?.data || err.message);
    }
  };

  useEffect(() => {
    const status = isLoggedIn();
    setUserLoginStatus(status);
    //console.log(status)
    fetch_Review_count_and_rating();
  }, []);

  useEffect(() => {
    if (userLoginStatus === null) return;

    const fetchListingDetails = async () => {
      try {
        const token = userLoginStatus ? localStorage.getItem('token') : null;
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/home/${userLoginStatus ? 'listings' : 'listing-details'}/${id}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        setListing(response.data.listing);
        setIsInitiallyFavorited(response.data.isLiked);
        setHostdetails(response.data.hostDetails);

        //console.log(response.data.listing.images.coverPicture) 
        //console.log(hostdetails.name)

        setLoading(false);
      }
      catch (err) {
        console.error(err);
        setError('Failed to fetch listing details');
        setLoading(false);
      }
    };

    fetchListingDetails();
  }, [userLoginStatus]);

  if (loading) {
    return <LisitngDetailsLoader />;
  }

  if (error) {
    return <div className="text-center min-h-screen mt-[250px] text-red-500">{error}</div>;
  }

  const handleBooking = (id) => {
    navigate(`/booking/${listing.hostID}/${id}`, {
      state: { listing, ratingReviews },
    });
  };

  return (
    <div className="w-full overflow-x-hidden xl:px-[160px] min-h-screen p-6 bg-white">

      {showModal && <Reviews listingId={id} ratingReviews={ratingReviews} onClose={() => setShowModal(false)} />}
      <h2 className="mt-[85px] mb-[20px] text-[22px] md:text-[30px] text-rose-950  font-semibold">{listing.name}</h2>

      <div className='grid w-full overflow-hidden gap-[6px] grid-cols-5 rounded-[25px]'>
        <div className="col-span-5 h-[250px] sm:h-[350px] md:h-[430px] md:col-span-3">
          <img
            src={listing.images.coverPicture}
            alt={listing.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className='hidden h-[430px] col-span-2 md:grid grid-cols-2 grid-rows-2 gap-[6px]'>
          {listing.images.additionalPictures.slice(0, 4).map((url, index) => (
            <div key={index} className="flex items-center justify-center h-full">
              <img src={url} alt={`Additional ${index + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-[15px] mx-auto md:p-4 space-y-6 md:space-y-8 lg:grid lg:grid-cols-3 lg:gap-6 lg:space-y-0">
        <div className="lg:col-span-2 space-y-4">
          <div className='flex md:flex-row flex-col md:justify-between md:items-center space-y-4'>
            <div>
              <h2 className="text-2xl font-semibold">{listing.property_type || ''} In {listing.address.suburb || ''}, {listing.address.country || ''}</h2>
              <p className="text-gray-600">{listing.bedrooms} beds · {listing.bathrooms} Shared bathroom</p>
            </div>
            {userRole === 'Guest' &&
              <FavoriteButton listingId={id} isInitiallyFavorited={isInitiallyFavorited} />
            }
          </div>

          <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-5 border shadow-md px-[8px] md:px-[45px] py-[15px] rounded-[28px] space-y-2 md:space-y-0 md:flex-row md:items-center md:space-x-4">
            <div className="flex border-r-[2px]  flex-col items-center justify-center">
              <GiAngelWings className="text-[22px] lg:text-[30px]" />
              <div className='mt-[5px] text-[10px] flex  md:text-[15px] font-[500]'>Guest <div className='ml-[4px]'>Favourite</div></div>
            </div>

            <p className="text-[14px] font-[600] border-r-[2px] col-span-2 lg:block hidden text-center">
              One of the most loved homes on Airbnb, according to guests
            </p>

            <div className='flex flex-col items-center border-r-[2px] justify-center'>
              <p className="font-semibold text-[15px] mt-[6px]  md:text-[18px]">{ratingReviews.averageRating}</p>
              <div className='flex'>
                {[...Array(Math.floor(ratingReviews.averageRating))].map((_, index) => (
                  <FaStar size={15} key={`full-${index}`} className="text-yellow-500" />
                ))}
                {(ratingReviews.averageRating % 1 >= 0.5) && (
                  <FaStarHalfAlt size={15} key="half" className="text-yellow-500" />
                )}
                {[...Array(5 - (Math.floor(ratingReviews.averageRating)) - ((ratingReviews.averageRating % 1 >= 0.5) ? 1 : 0))].map((_, index) => (
                  <FaStar size={15} key={`empty-${index}`} className="text-gray-300" />
                ))}
              </div>
            </div>

            <button onClick={() => setShowModal(true)} className="flex flex-col items-center justify-center">
              <span className='text-[20px] md:text-[24px] text-rose-700 font-[600]'>{ratingReviews.arraySize}</span>
              <span className='text-rose-900 mt-[-8px] text-[14px] md:text-[19px] underline'>Review</span>
            </button>

          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gray-600">
              <div className='h-full w-full rounded-full bg-gray-600'></div>
            </div>
            <div>
              <p className="font-semibold text-red-700">{hostdetails.name}</p>
              <p className="text-gray-500 text-sm">{ratingReviews.averageRating > 4 ? 'Super Host' : 'Host'} ·
                {(() => {
                  const reviewDate = new Date(hostdetails.createdAt);
                  const now = new Date();
                  const timeDiff = now - reviewDate;

                  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
                  const months = Math.floor(days / 30);
                  const years = Math.floor(days / 365);

                  if (years >= 1) {
                    return `${years} year${years > 1 ? 's' : ''} ago`;
                  } else if (months >= 1) {
                    return `${months} month${months > 1 ? 's' : ''} ago`;
                  } else {
                    return `${days} day${days > 1 ? 's' : ''} ago`;
                  }
                })()}
              </p>
            </div>
          </div>

          <div className="">
            <div className="flex items-start space-x-2 text-[17px] mb-[32px]">
              <FaMedal className="text-yellow-500 mt-[12px] text-[28px] mr-[15px] " />
              <div>
                <p className="font-semibold">Top 5% of homes</p>
                <p className="text-gray-700">This home is highly ranked based on ratings, reviews, and reliability.</p>
              </div>
            </div>

            <div className="flex items-start space-x-2 text-[17px] mb-[32px]">
              <FaHome className="text-gray-700 mt-[12px] text-[28px] mr-[15px] " />
              <div>
                <p className="font-semibold">{listing.bedrooms || ''} Bed Room{listing.bedrooms > 1 && 's'}</p>
                <p className="text-gray-700">Your own {listing.bedrooms || ''} bedroom{listing.bedrooms > 1 && 's'} in the {listing.property_type}, plus access to shared spaces.</p>
              </div>
            </div>

            <div className="flex items-start space-x-2 text-[17px] mb-[32px]">
              <FaToilet className="text-gray-700 mt-[12px] text-[28px] mr-[15px] " />
              <div>
                <p className="font-semibold">{listing.bathrooms || ''} Bath Room{listing.bathrooms > 1 && 's'}</p>
                <p className="text-gray-700">Your own {listing.bathrooms || ''} bathroom{listing.bathrooms > 1 && 's'} in the {listing.property_type} and access to shared spaces.</p>
              </div>
            </div>

            <div className="flex items-start space-x-2 text-[17px] mb-[32px]">
              <FaDoorOpen className="text-gray-700 mt-[12px] text-[28px] mr-[15px] " />
              <div>
                <p className="font-semibold">Amenities</p>
                <div className='flex mt-[8px] items-center'>
                  {listing.amenities.map((amenity, index) => (
                    <p key={index} className="text-gray-800 px-[7px] py-[1px] text-[13px] font-[500] border-[2px] border-gray-500 rounded-xl mr-[10px] flex items-center break-words">{amenity}</p>
                  ))}
                </div>

              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg">About this place</h3>
            <p className="text-sm break-words text-gray-600">{listing.summary}</p>
          </div>

          {userLoginStatus && <AddRating listingId={id} />}

        </div>

        <div className="space-y-4">
          <div className="border bg-white shadow-lg rounded-lg py-[30px] px-4 border-[#e7e7e7] space-y-[18px]">
            <div className="flex justify-between items-center">
              <p className="text-2xl font-semibold">{listing.price}</p>
              <p className="text-sm text-gray-600 font-[600]">/ night</p>
            </div>

            <div className="border border-[#818181] rounded-lg py-4 w-full">
              <div className="grid grid-cols-2 px-[15px] border-b border-[#818181] pb-4 gap-4">
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-gray-600">CHECK-IN</p>
                  <p className="text-sm font-medium text-gray-800">6/25/2025</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-gray-600">CHECKOUT</p>
                  <p className="text-sm font-medium text-gray-800">7/4/2025</p>
                </div>
              </div>
              <div className="px-4 pt-4">
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-gray-600">Max Accomodation</p>
                  <p className="text-sm font-medium text-gray-800">{listing.maxGuests} {listing.maxGuests > 1 ? 'Guests' : 'Guest'}</p>
                </div>
              </div>
            </div>

            {userRole === 'Guest' ?
              <button onClick={() => handleBooking(id)} className="w-full py-2 bg-gradient-to-r from-pink-600 to-pink-800 text-white font-semibold rounded-lg">
                Reserve
              </button> :
              <div>
                <div className="w-full py-2 bg-rose-300 text-center text-rose-100 cursor-pointer font-semibold rounded-lg">Reserve</div>
                <p onClick={() => navigate("/signIn")} className='text-rose-700 underline font-[500] text-[14px] text-center mt-[8px]'>Login as a Guest To Reserve a booking</p>
              </div>
            }

            <p className="text-center text-gray-600 font-[500] text-[15px]">You won't be charged yet</p>

            <div className="space-y-1 text-gray-600 font-[500] underline text-[15px]">
              <div className="flex justify-between">
                <p>${listing.price} x 7 nights</p>
                <p>${listing.price * 7}</p>
              </div>
              <div className="flex justify-between">
                <p>Cleaning fee</p>
                <p>$29</p>
              </div>
              <div className="flex justify-between">
                <p>Airbnb service fee</p>
                <p>$89</p>
              </div>
            </div>
            <div className='mx-auto h-[2px] bg-gray-300'></div>
            <div className="flex justify-between font-semibold">
              <p>Total before taxes</p>
              <p>${(listing.price * 7) + 29 + 89}</p>
            </div>
          </div>

          <div className="border rounded-lg p-4 shadow-sm">
            <p className="text-pink-800 font-semibold">{listing.bookingsMade > 20 ? 'This is a rare find' : 'Seize this exclusive opportunity now.'}</p>
            <p className="text-sm text-gray-600">{listing.bookingsMade || ""} booking made {listing.bookingsMade > 1 && 's'} till now</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetails;
