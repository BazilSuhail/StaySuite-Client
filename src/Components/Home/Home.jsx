import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import { FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import HorizontalScrollList from './HorizontalScrollList';
import noResults from "../../assets/PhotosAssets/noResults.webp";

const Homeloader = () => {
  return (
    <div className='w-full px-[25px] xl:px-[55px] overflow-x-hidden flex justify-center items-center flex-col'>
      <div className='w-full'>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 pt-4 pb-[45px]">
          {Array.from({ length: 15 }).map((_, index) => (
            <div
              key={index}
              className="h-[290px] lg:h-[230px] xl:h-[240px] w-full md:w-[95%] bg-gray-200 rounded-xl animate-pulse-fast"
            ></div>
          ))}
        </div>
      </div>
    </div>
  )
}

const Home = () => {
  const navigate = useNavigate();

  const [listings, setListings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  //const [errorStatus, setErrorSttaus] = useState('');
  const [category, setCategory] = useState('All');
  const [searchParams, setSearchParams] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fetchListings = async (page, category) => {
    setLoading(true);
    try {
      let url = `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/home/listings`;
      let params = { page, limit: 10, category };

      if (searchParams) {
        const tempLocation = searchParams.location || 'invalid'
        url = `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/home/listing-searched/${searchParams.guests}/${tempLocation}`;
        //console.log(searchParams)
      }
      const response = await axios.get(url, { params });
      const newListings = response.data.listings;

      //console.log(newListings)
      if (page === 1) {
        setListings(newListings);
      }
      else {
        setListings((prev) => [...prev, ...newListings]);
      }
      setHasMore(page < response.data.totalPages);
    }
    catch (err) {
      setError(err)
      //setError('Failed to fetch listings. Please try again later.');
    }
    finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setCurrentPage(1);
    fetchListings(1, category);
  }, [category]);

  useEffect(() => {
    if (searchParams) {
      setCurrentPage(1);
      fetchListings(1, category, searchParams);
    }
  }, [searchParams, category]);

  useEffect(() => {
    if (!searchParams) {
      fetchListings(currentPage, category);
    }
  }, [currentPage, category, searchParams]);


  const handleSearch = (location, guests) => {
    //console.log(location)
    //console.log(guests)
    setSearchParams({ location, guests });
    setCurrentPage(1);
    fetchListings(1, category, { location, guests });
  };


  /*const loadMore = () => {
    if (hasMore) {
      setCurrentPage((prev) => prev + 1);
    }
  };*/

  const loadMore = () => {
    if (hasMore && !searchParams) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  if (error) {
    return (
      <div className='mt-[85px] min-h-screen md:mt-[95px]'>
        <SearchBar handleSearch={handleSearch} />
        <div className='top-[60px] w-full bg-white sticky'>
          <HorizontalScrollList setCategory={setCategory} />
        </div>
        <Homeloader />
      </div>
    );
  }

  return (
    <div className='mt-[85px] min-h-screen md:mt-[95px]'>
      <SearchBar handleSearch={handleSearch} />

      <div className='top-[60px] w-full bg-white sticky'>
        <HorizontalScrollList setCategory={setCategory} />
      </div>

      {loading ? <Homeloader /> :
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 pt-4 xl:px-[75px] pb-[45px] px-4">
          {listings.map(listing => (
            <div
              key={listing._id}
              onClick={() => navigate(`/listing/${listing._id}`)}
              className="overflow-hidden mt-[15px] cursor-pointer"
            >
              <img
                src={listing.images.placePicture || 'https://via.placeholder.com/300'}
                alt={listing.name}
                loading='lazy'
                className="m-2 h-[290px] lg:h-[230px] xl:h-[240px] w-[95%] border rounded-xl hover:shadow-xl transition duration-200"
              />
              <div className="px-4">
                <div className='w-full flex justify-between'>
                  <h2 className="font-semibold text-lg">{listing.address.suburb.substring(0, 8)}, {listing.address.country.substring(0, 8)}</h2>
                  {listing.rating > 0 && <p className='flex items-center'>{listing.rating} <FaStar size={18} className="text-yellow-500" /></p>}
                </div>
                <p className="text-rose-600 font-[700] text-[12px]">{listing.property_type}</p>
                <p className="text-gray-500">{listing.category}</p>
                <p className="font-bold text-[14px] mt-[6px]">${listing.price} / night</p>
              </div>
            </div>
          ))}
        </div>
      }
      {listings.length === 0 &&
        <div className='mt-[150px] w-full flex flex-col  mx-auto contrast justify-center items-center '>
          <img className='mix-blend-multiply z-10 scale-[0.8]' src={noResults} alt="" />
          <p className='text-gray-400 bg-white z-30 pt-[18px] mt-[-70px] px-[55px] font-[600] text-[15px]'>No listings found</p>
        </div>
      }

      {hasMore && (
        <div className="text-center mt-6">
          <button
            onClick={loadMore}
            className="text-rose-500 font-[600] py-2 px-4 rounded hover:bg-text-600 underline mb-[25px] transition"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Show More'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;