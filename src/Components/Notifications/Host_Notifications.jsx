import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MdClose } from "react-icons/md";
import { IoNotificationsCircleOutline } from "react-icons/io5";
import { TbBrandBooking } from "react-icons/tb";
import { FaArrowRight } from "react-icons/fa";
import { AiOutlineCalendar, AiOutlineUser } from "react-icons/ai"; 
import { motion } from "framer-motion";

const HostNotifications = () => {
    const navigate = useNavigate();
    const { notifications, userNotifications } = useAuthContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [bookingDetails, setBookingDetails] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const fetchBookingDetails = async (bookingId) => {
        //console.log(bookingId)
        try {
            const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/manage-bookings/booking-details/${bookingId}`,);
            //console.log(response.data.checkIn) 
            console.log(response.data.listing)
            setBookingDetails(response.data);
            setIsModalOpen(true);
        }
        catch (error) {
            console.error("Error fetching booking details", error);
            alert("Failed to fetch booking details");
        }
    };

    return (
        <div className="bg-gray-50 pt-[100px] min-h-screen pb-[65px] justify-center items-center">
            <div className="max-w-[950px] mx-auto px-6">
                <div className="flex items-center text-rose-600">
                    <IoNotificationsCircleOutline size={35} className="mr-[8px]" />
                    <h3 className="text-[24px] font-[700] text-start">Notifications</h3>
                </div>

                <div className="h-[2px] bg-rose-300 rounded-lg my-[15px] mb-[35px]" />

                {userNotifications.length === 0 && notifications.length === 0 &&
                    <div className="min-h-screen w-full flex justify-center items-center mix-blend-multiply mt-[-250px]">
                        <img src={Notification} alt="" className="scale-[0.55] md:scale-[0.4]" />
                    </div>
                }

                <div className="flex flex-col space-y-[15px]">
                    {notifications.map((notification, index) => (
                        <div key={index} className="border-b-[2px] border-rose-700 lg:px-[20px] py-[15px] flex flex-col">
                            <div className="flex items-center">
                                <div className="w-[32px] h-[32px] md:w-[38px] md:h-[38px] rounded-full flex items-center justify-center text-[28px] bg-rose-800 text-rose-50">
                                    <TbBrandBooking />
                                </div>
                                <h3 className="text-[16px] ml-[12px] text-rose-600 font-[500]">
                                    New Booking Created at Your Property In{" "}
                                    <span onClick={() => navigate(`/listing/${notification.listing_Id}`)} className="text-rose-800 text-[17px] cursor-pointer underline underline-offset-1 font-[600]">{notification.location}</span>
                                </h3>
                            </div>

                            <p className="ml-[49px]">
                                <span className="text-rose-500 text-[16px] font-[700]">Special Requests: </span>{notification.details}
                            </p>
                            <button
                                onClick={() => fetchBookingDetails(notification.bookingId)}
                                className="ml-[48px] text-rose-700 underline underline-offset-2 font-[500] mt-[4px] text-start"
                            >
                                See Booking
                            </button>
                        </div>
                    ))}


                    {/* Older notificaitons */}
                    {userNotifications.map((notification, index) => (
                        <div key={index} className="bg-rose-50 rounded-[25px] lg:px-[20px] py-[15px] flex flex-col">
                            <div className="flex items-center">
                                <div className="w-[32px] h-[32px] md:w-[38px] md:h-[38px] rounded-full flex items-center justify-center text-[28px] bg-rose-100 text-rose-600">
                                    <TbBrandBooking />
                                </div>
                                <h3 className="text-[16px] ml-[12px] text-rose-400 font-[500]">
                                    Booking Created at Your Property In{" "}
                                    <span onClick={() => navigate(`/listing/${notification.listing_Id}`)} className="text-rose-500 text-[17px] cursor-pointer underline underline-offset-1 font-[600]">{notification.location}</span>
                                </h3>
                            </div>

                            <p className="ml-[49px] text-rose-800   ">
                                <span className="text-rose-400 text-[16px] font-[600]">Special Requests: </span>{notification.details}
                            </p>
                            <button
                                onClick={() => fetchBookingDetails(notification.bookingId)} // Call to fetch booking details
                                className="ml-[48px] text-rose-700 underline underline-offset-2 font-[500] mt-[4px] text-start"
                            >
                                See Booking
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {isModalOpen &&
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <motion.div className="bg-white rounded-lg p-6 shadow-lg lg:w-[600px] w-[400px] relative"
                     initial={{ scale: 0.8, opacity: 1, y: -500 }}
                     animate={{ scale: 1, opacity: 1, y: 0 }}
                     transition={{
                         duration: 0.5,
                         ease: [0.2, 0.8, 0.2, 1], 
                     }}
                    > 
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                        >
                            <MdClose size={24} />
                        </button>

                        <div className=" flex justify-center items-center font-semibold mb-4 fkex text-center text-gray-800">
                            <p className='w-[38px] h-[38px] rounded-full flex items-center justify-center text-[28px] text-rose-100 bg-rose-600'>
                                <TbBrandBooking />
                            </p>
                            <p className='ml-[10px] text-rose-600 text-[25px]'>Booking Details</p>
                        </div>

                        <div className="space-y-2">
                            <div className='border-b-[2px] border-rose-700 pb-[8px] flex justify-between items-center'>
                                <p className="text-gray-700 font-medium">
                                    Name: <span className="font-normal">{bookingDetails.listing.name || 'sd'}</span>
                                </p>
                                <p onClick={() => navigate(`/listing/${bookingDetails.listing._id}`)} className='text-rose-700 hover:text-red-500 cursor-pointer flex items-center '>
                                    See Listings <FaArrowRight className='pl-[5px] mt-[2px]' />
                                </p>
                            </div>
                            <p className="text-gray-700 mb-[15px] font-medium">
                                Property Type: <span className="font-normal">{bookingDetails.listing.property_type || 'sd'}</span>
                            </p>
                            <p className="text-gray-700 mt-[15px] font-medium flex items-center gap-2">
                                <label className='w-[30px] h-[30px] text-[18px] bg-rose-600 flex justify-center items-center rounded-full text-white'><AiOutlineCalendar /></label>
                                Check-In: <span className="font-[600] text-green-700">{new Date(bookingDetails.booking.checkIn).toDateString()}</span>
                            </p>
                            <p className="text-gray-700 font-medium flex items-center gap-2">
                                <label className='w-[30px] h-[30px] text-[18px] bg-rose-600 flex justify-center items-center rounded-full text-white'><AiOutlineCalendar /></label>
                                Check-Out: <span className="font-[600] text-red-700">{new Date(bookingDetails.booking.checkOut).toDateString()}</span>
                            </p>
                        </div>

                        <div className="mt-4">
                            <p className="text-gray-700 font-medium mb-1 flex items-center gap-2">
                                <label className='w-[30px] h-[30px] text-[18px] bg-rose-600 flex justify-center items-center rounded-full text-white'><AiOutlineUser /></label>
                                Guests:
                            </p>
                            <ul className="list-disc list-inside ml-4 text-gray-600">
                                <li>Adults: {bookingDetails.booking.guests.adults || 'sd'}</li>
                                <li>Children: {bookingDetails.booking.guests.children || 'sd'}</li>
                                <li>Infants: {bookingDetails.booking.guests.infants || 'sd'}</li>
                            </ul>
                        </div>

                        <p className="text-gray-700 font-medium mt-4">
                            Total Amount: <span className="font-bold text-green-500">${bookingDetails.booking.totalAmount || 'sd'}</span>
                        </p>

                        {bookingDetails.specialRequests && (
                            <p className="text-sm text-gray-500 italic mt-2">
                                Special Requests: {bookingDetails.booking.specialRequests || 'sd'}
                            </p>
                        )}

                    </motion.div>
                </div>
            }

        </div>
    );
};

export default HostNotifications; 