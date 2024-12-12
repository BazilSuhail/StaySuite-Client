import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AiOutlineCalendar, AiOutlineUser } from 'react-icons/ai';
import MyLoader from '../../assets/MyLoader';
import noReservations from "../../assets/PhotosAssets/noReservations.webp";
import { Link, useNavigate } from 'react-router-dom';

const GetBookingHistory = () => {
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error("Authentication token not found.");
                }

                const response = await axios.get(
                    `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/reservation/reservations-history`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                setBookings(response.data.bookings || []);
            } 
            catch (err) {
                setError('Failed to fetch bookings. Please try again.');
                console.error('Error fetching bookings:', err.response?.data || err.message);
            } 
            finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    if (loading) {
        return <MyLoader />;
    }

    if (error || bookings.length === 0) {
        return <>
            <div className='bg-gray-100 pt-[115px] p-6 min-h-screen justify-center items-center '>
                <div className="max-w-[1150px] mx-auto" >
                    <h3 className='text-[24px] mb-[15px] text-rose-600 font-[700]'>Visited Places</h3>
                    <div className='h-[2.5px] bg-rose-600 mb-[35px] lg:mb-[55px]'></div>
                    <div className="min-h-screen w-full flex flex-col justify-center items-center mix-blend-multiply mt-[-150px]">
                        <img src={noReservations} alt="No Reservations" className="scale-[0.4]" />
                        <p className="text-rose-800 font-[400] text-[15px] text-center mt-[-45px] md:mt-[-100px]">
                            You haven't visited any place, make a Booking <br />
                            <Link to="/" className="text-rose-600 underline font-[600]">Start Exploring</Link>
                        </p>
                    </div>
                </div>
            </div>
        </>;
    }

    return (

        <div className='bg-gray-100 pt-[115px] p-6 min-h-screen justify-center items-center '>
            <div className="max-w-[1150px] mx-auto" >
                <h3 className='text-[24px] mb-[15px] text-rose-600 font-[700]'>Visited Places</h3>
                <div className='h-[2.5px] bg-rose-600 mb-[35px] lg:mb-[55px]'></div>
                <div className="grid gap-6 mx-auto sm:grid-cols-2  lg:grid-cols-3 ">
                    {bookings.map((booking) => (
                        <div key={booking._id}
                            onClick={() => navigate(`/listing/${booking.listingId}`)}
                            className="overflow-hidden mx-auto w-full px-[8px] cursor-pointer bg-white border rounded-xl hover:shadow-md transition duration-200" >
                            <img
                                src={booking.listingImage || 'https://via.placeholder.com/300'}
                                alt="Booking"
                                loading="lazy"
                                className="m-2 h-[220px] w-[95%]"
                            />
                            <h2 className="font-semibold ml-[10px] text-lg">
                                {booking.listingSuburb.substring(0, 8)}, {booking.listingCountry.substring(0, 8)}
                            </h2>
                            <div className="ml-[53px] md:mt-[15px]">
                                <div className="flex items-center space-x-2">
                                    <AiOutlineCalendar className="text-rose-800" />
                                    <p className="text-[13px] font-[600] text-gray-500">Check-In</p>
                                    <p className="font-[600] text-[14px] text-green-700">
                                        {new Date(booking.checkIn).toDateString()}
                                    </p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <AiOutlineCalendar className="text-rose-800" />
                                    <p className="text-[13px] font-[600] text-gray-500">Check-Out</p>
                                    <p className="font-[600] text-[14px] text-rose-800">
                                        {new Date(booking.checkOut).toDateString()}
                                    </p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <AiOutlineUser className="text-rose-800" />
                                    <p className="text-[13px] font-[600] text-gray-500">Guests:</p>
                                    <p className="font-[600] text-[13px] text-rose-800">
                                        {booking.guests.adults + booking.guests.children + booking.guests.infants}
                                    </p>
                                </div>
                                <div className="flex mb-[8px] items-center space-x-2">
                                    <AiOutlineUser className="text-rose-800" />
                                    <p className="text-[13px] font-[600] text-gray-500">Total Bill:</p>
                                    <p className="font-[600] text-[13px] text-rose-800">
                                        {booking.totalAmount || '100'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GetBookingHistory;
