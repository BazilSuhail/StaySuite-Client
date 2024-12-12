
import React, { useState, useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { motion } from 'framer-motion';

const SearchBar = ({ handleSearch }) => {
    const [scrollY, setScrollY] = useState(0);
    const [location, setLocation] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState(1);

    const onSearch = () => {
        handleSearch(location, guests);
    };


    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scale = Math.max(1 - scrollY / 0.005, 0.1);
    const translateY = Math.min(scrollY, 120);
    const opacity = Math.max(1 - scrollY / 200, 0);

    return (
        <div className='scale-[0.88] mt-[-25px]'>
            <motion.div className="z-[900] w-[950px] hidden lg:flex items-center bg-white border-[2px] border-gray-200 rounded-[45px] shadow-md mx-auto"
                initial={{ opacity: 1 }}
                animate={{ transform: `translateY(-${translateY}px) scale(${scale})`, opacity }}
                transition={{ type: 'tween', duration: 0.2 }}
            >
                <div className="flex pl-[35px] hover:bg-gray-100 px-[15px] rounded-[45px] py-[18px] group flex-col">
                    <label className="text-[12px] font-[700] mb-[-2px] text-gray-600">Where</label>
                    <input
                        type="text"
                        placeholder="Search by Country"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="outline-none placeholder:font-[600] group-hover:bg-gray-100"
                    />
                </div>

                <div className="flex hover:bg-gray-100 px-[35px] rounded-[45px] py-[10px] group flex-col">
                    <label className="text-[12px] font-[700] mb-[-2px]  text-gray-600">Check-In</label>
                    <input
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="outline-none group-hover:bg-gray-100 focus:ring-2 focus:ring-red-500"
                    />
                </div>

                <div className="flex hover:bg-gray-100 px-[35px] rounded-[45px] py-[10px] group flex-col">
                    <label className="text-[12px] font-[700] mb-[-2px] text-gray-600">Check-Out</label>
                    <input
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className=" outline-none group-hover:bg-gray-100 focus:none"
                    />
                </div>

                <div className="flex hover:bg-gray-100 px-[35px] rounded-[45px] py-[10px] group flex-col">
                    <label className="text-[12px] font-[700] mb-[-2px] text-gray-600">Guests</label>
                    <select
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        className="outline-none group-hover:bg-gray-100 focus:none"
                    >
                        {[1, 2, 3, 4, 5].map((num) => (
                            <option key={num} value={num}>
                                {num} guest{num > 1 ? 's' : ''}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    onClick={onSearch}
                    className=" bg-red-500 ml-[85px] mr-[35px] text-white text-[22px] p-[10px] rounded-full hover:bg-red-600 transition duration-200"
                >
                    <AiOutlineSearch />
                </button>
            </motion.div>
        </div>
    );
};

export default SearchBar;