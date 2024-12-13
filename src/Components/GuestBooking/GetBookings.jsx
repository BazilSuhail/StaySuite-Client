import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TbBrandBooking } from 'react-icons/tb';
import { AiOutlineCalendar, AiOutlineUser } from 'react-icons/ai';
import { MdClose } from 'react-icons/md';
import { FaArrowRight } from 'react-icons/fa';
import MyLoader from '../../assets/MyLoader';
import { motion } from 'framer-motion';
import noReservations from "../../assets/PhotosAssets/noReservations.webp"
import { Link } from 'react-router-dom';

const GuestBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchBookings = async () => {
            try {
                const token = localStorage.getItem('token'); // Retrieve token for authentication
                const response = await axios.get(
                    `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/reservation/made-reservations`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                setBookings(response.data.bookings);
            } catch (err) {
                setError('Failed to fetch bookings. Please try again.');
                console.error('Error fetching bookings:', err.response?.data || err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    const finalizeBooking = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/reservation/finalize-booking`,
                { bookingId: selectedBooking._id },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            alert('Thanyou For choosing Us ...');

            setSelectedBooking(null);
            setShowModal(false);
        } catch (err) {
            console.error('Error finalizing booking:', err.response?.data || err.message);
            alert('Failed to finalize booking. Please try again.');
        }
    };

    const openModal = (booking) => {
        setSelectedBooking(booking);
        setShowModal(true);
    };

    const closeModal = () => {
        setSelectedBooking(null);
        setShowModal(false);
    };

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
        <div className='bg-gray-50 pt-[120px] min-h-screen pb-[65px] justify-center items-center '>
            <div className="max-w-[950px] mx-auto px-6" >
                <h3 className='text-[24px]  text-rose-600 font-[700]  text-start'>My Reserved bookings</h3>
                <div className='h-[2px] bg-rose-300 rounded-lg my-[15px] mb-[35px]'></div>
                <div className="flex flex-col space-y-[15px]">
                    {bookings.map((booking) => (
                        <div
                            key={booking._id}
                            className="bg-white rounded-xl flex md:flex-row flex-col justify-between border py-4 px-6 md:px-[45px] lg:px-[55px] hover:bg-gray-100 hover:border-[2px] hover:border-gray-300 transition duration-300 ease-in-out"
                        >
                            <div className='md:border-b-0 border-b-[2px] border-rose-600 pb-[12px] md:pb-0 flex items-center'>
                                <div className='w-[45px] h-[45px] rounded-full flex items-center justify-center text-[28px] text-rose-100 bg-rose-600'>
                                    <TbBrandBooking />
                                </div>
                                <p className='font-[600] text-[18px] ml-[8px] text-rose-800'>
                                    {booking.listing.name.length > 25 ? `${booking.listing.name.slice(0, 25)}...` : booking.listing.name}
                                </p>
                            </div>

                            <div className='hidden md:flex items-center'>
                                <div className='flex flex-col items-center justify-center'>
                                    <p className='text-[13px] font-[600] text-gray-500 '>Check-In</p>
                                    <p className='font-[600] text-[14px] text-rose-800'>{new Date(booking.checkIn).toDateString()}</p>
                                </div>

                                <div className='ml-[20px] xl:ml-[50px] flex flex-col items-center justify-center'>
                                    <p className='text-[13px] font-[600] text-gray-500 '>Check Out</p>
                                    <p className='font-[600] text-[14px] text-rose-800'>{new Date(booking.checkOut).toDateString()}</p>
                                </div>
                            </div>

                            <div className='md:hidden justify-between mt-[15px] flex items-center'>
                                <div className='flex flex-col md:items-center justify-center'>
                                    <p className='text-[13px] font-[600] text-gray-500 '>Check-In</p>
                                    <p className='font-[600] text-[14px] text-rose-800'>{new Date(booking.checkIn).toDateString()}</p>
                                </div>

                                <div className='ml-[20px] xl:ml-[50px] flex flex-col md:items-center justify-center'>
                                    <p className='text-[13px] font-[600] text-gray-500 '>Check Out</p>
                                    <p className='font-[600] text-[14px] text-rose-800'>{new Date(booking.checkOut).toDateString()}</p>
                                </div>
                            </div>

                            <div className='hidden md:flex items-center'>
                                <div className='flex flex-col items-center justify-center'>
                                    <p className='text-[13px] font-[600] text-gray-500 '>Status</p>
                                    <p className={`font-[600] px-[12px] py-[3px] mt-[5px] text-white rounded-[30px] text-[12px] ${booking.status === 'paid' ? 'bg-green-800' : booking.status === 'pending' ? 'bg-yellow-600' : booking.status === 'confirmed' ? 'bg-blue-800' : booking.status === 'canceled' ? 'bg-red-800' : booking.status === 'completed' ? 'text-gray-800' : ''}`}>{booking.status}</p>
                                </div>
                                <div>
                                    <button onClick={() => openModal(booking)}
                                        className="ml-[20px] mt-[12px] bg-gradient-to-r from-rose-600 to-rose-900 hover:bg-rose-600 text-white rounded-[25px] px-[10px] whitespace-nowrap py-[4px] text-[13px]"
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>

                            <div className='md:hidden mt-[15px] flex justify-between items-center'>
                                <div className='flex flex-col'>
                                    <p className='text-[16px] font-[600] text-gray-500 '>Status</p>
                                    <p className={`font-[600] px-[12px] py-[2px] mt-[5px] text-white rounded-[30px] text-[12px] ${booking.status === 'approved' ? 'bg-green-800' : booking.status === 'pending' ? 'bg-yellow-600' : booking.status === 'confirmed' ? 'bg-blue-800' : booking.status === 'rejected' ? 'bg-red-800' : booking.status === 'completed' ? 'text-gray-800' : ''}`}>{booking.status}</p>

                                </div>
                                <button onClick={() => openModal(booking)}
                                    className="mt-[15px] bg-gradient-to-r from-rose-600 to-rose-900 hover:bg-rose-600 text-white rounded-[18px] px-[15px] py-[8px] text-[13px]"
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {showModal && selectedBooking && (
                    <div className="fixed inset-0 bg-black px-[15px] md:px-[25px] bg-opacity-50 flex items-center justify-center z-50">
                        <motion.div className="bg-white rounded-lg p-6 shadow-lg lg:w-[600px] w-[400px] relative"
                            initial={{ scale: 0.4, opacity: 1, y: 500 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.5,
                                ease: [0.2, 0.8, 0.2, 1],
                            }}
                        >
                            <button
                                onClick={closeModal}
                                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                                aria-label="Close Modal"
                            >
                                <MdClose size={24} />
                            </button>

                            <div className="flex justify-center items-center font-semibold mb-4 fkex text-center text-gray-800">
                                <p className='w-[38px] h-[38px] rounded-full flex items-center justify-center text-[28px] text-rose-100 bg-rose-600'>
                                    <TbBrandBooking />
                                </p>
                                <p className='ml-[10px] text-rose-600 text-[25px]'>Booking Details</p>
                            </div>

                            <div className="space-y-2">
                                {/*  <p className="text-gray-700 font-medium">
                                    Listing ID: <span className="font-normal">{selectedBooking.listingId}</span>
                                </p>
                                */}
                                <div className='border-b-[2px] w-full border-rose-700 pb-[8px] flex justify-between items-center'>
                                    <p className="text-gray-700 font-medium w-[calc(100%-105px)] overflow-hidden">
                                        Name: <span className="font-normal">{selectedBooking.listing.name.length > 25 ? `${selectedBooking.listing.name.slice(0, 25)}...` : selectedBooking.listing.name}</span>
                                    </p>
                                    <Link to={`/listing/${selectedBooking.listingId}`} className='w-[105px] overflow-hidden text-rose-700 hover:text-red-500 cursor-pointer flex items-center '>
                                        See Listings <FaArrowRight className='pl-[5px] mt-[2px]' />
                                    </Link>
                                </div>
                                <p className="text-gray-700 mb-[15px] font-medium">
                                    Property Type: <span className="font-normal">{selectedBooking.listing.property_type}</span>
                                </p>
                                <p className="text-gray-700 mt-[15px] font-medium flex items-center gap-2">
                                    <label className='w-[30px] h-[30px] text-[18px] bg-rose-600 flex justify-center items-center rounded-full text-white'><AiOutlineCalendar /></label>
                                    Check-In: <span className="font-[600] text-green-700">{new Date(selectedBooking.checkIn).toDateString()}</span>
                                </p>
                                <p className="text-gray-700 font-medium flex items-center gap-2">
                                    <label className='w-[30px] h-[30px] text-[18px] bg-rose-600 flex justify-center items-center rounded-full text-white'><AiOutlineCalendar /></label>
                                    Check-Out: <span className="font-[600] text-red-700">{new Date(selectedBooking.checkOut).toDateString()}</span>
                                </p>
                            </div>

                            <div className="mt-4">
                                <p className="text-gray-700 font-medium mb-1 flex items-center gap-2">
                                    <label className='w-[30px] h-[30px] text-[18px] bg-rose-600 flex justify-center items-center rounded-full text-white'><AiOutlineUser /></label>

                                    Guests:
                                </p>
                                <ul className="list-disc list-inside ml-4 text-gray-600">
                                    <li>Adults: {selectedBooking.guests.adults}</li>
                                    <li>Children: {selectedBooking.guests.children}</li>
                                    <li>Infants: {selectedBooking.guests.infants}</li>
                                </ul>
                            </div>

                            <p className="text-gray-700 font-medium mt-4">
                                Total Amount: <span className="font-bold text-green-500">${selectedBooking.totalAmount}</span>
                            </p>

                            {selectedBooking.specialRequests && (
                                <p className="text-sm text-gray-500 italic mt-2">
                                    Special Requests: {selectedBooking.specialRequests}
                                </p>
                            )}

                            {/* Buttons */}
                            <div className="mt-6 flex justify-end gap-4">
                                <button
                                    onClick={finalizeBooking}
                                    className="px-4 py-[5px] bg-red-500 text-white rounded-xl hover:bg-red-600"
                                >
                                    Finalize Booking
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GuestBookings;
