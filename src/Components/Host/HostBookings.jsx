import { useState, useEffect } from 'react';
import axios from 'axios';
import { TbBrandBooking } from 'react-icons/tb';
import { FaUserCircle, FaEnvelope, FaMapMarkerAlt, FaInfoCircle, FaArrowRight, FaLinkedinIn, FaPhoneAlt } from "react-icons/fa";
import { AiOutlineCalendar, AiOutlineInstagram } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { MdClose, MdOutlinePropane } from 'react-icons/md';
import { GrStatusInfo } from 'react-icons/gr';
import { motion } from 'framer-motion';
import MyLoader from '../../assets/MyLoader';
import noReservations from "../../assets/PhotosAssets/noReservations.webp"
import { TiSocialFacebook } from 'react-icons/ti';

const HostBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [guestDetails, setGuestDetails] = useState(null);
    const [modalLoading, setModalLoading] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchBookings = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(
                    `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/manage-bookings/host-listings-bookings`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                setBookings(response.data.bookings);
            }
            catch (err) {
                //setError('Failed to fetch bookings. Please try again.');
                setError(err);
                console.error('Error fetching bookings:', err.response?.data || err.message);
            }
            finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    const updateStatus = async (bookingID, status) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(
                `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/manage-bookings/update-booking-status`,
                { bookingID, status },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert('Booking status updated successfully!');
        } catch (err) {
            console.error('Error updating booking status:', err.response?.data || err.message);
            alert('Failed to update booking status.');
        }
    };

    const fetchGuestDetails = async (userId) => {
        setModalLoading(true);
        console.log(userId);
        try {
            const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/manage-bookings/get-reservers-details/${userId}`);
            setGuestDetails(response.data.user);
            setShowModal(true);
        } catch (err) {
            console.error('Error fetching guest details:', err.response?.data || err.message);
            alert('Failed to fetch guest details.');
        } finally {
            setModalLoading(false);
        }
    };

    if (loading) {
        return <MyLoader />;
    }

    if (error) {
        return (
            <div className='bg-gray-50 pt-[90px] min-h-screen pb-[65px] justify-center items-center '>
                <div className="max-w-[950px] mx-auto px-6" >
                    <h3 className='text-[22px]  text-rose-600 font-[700]  text-start'>Bookings reserved on your Listings</h3>
                    <div className='h-[2px] bg-rose-300 rounded-lg my-[15px] mb-[35px]'></div>
                    <div className="flex flex-col space-y-[15px]">
                        <div className="min-h-screen w-full flex flex-col justify-center items-center mix-blend-multiply mt-[-150px]">
                            <img src={noReservations} alt="" className="scale-[0.4]" />
                            <p className='text-rose-800 font-[400] text-[15px] text-center mt-[-45px] md:mt-[-100px]'>No reservations Made on any of your Lisitngs</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className='bg-gray-100 pt-[115px] p-6 min-h-screen justify-center items-center '>
            <div className="max-w-[1350px] mx-auto" >
                <h3 className='text-[20px] md:text-[24px] mb-[15px] text-rose-600 font-[700]'>Applied Bookings For Your Properties:</h3>
                <div className='h-[2.5px] bg-rose-600 mb-[35px] lg:mb-[55px]'></div>
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 ">
                    {bookings.map((booking) => (
                        <div
                            key={booking._id}
                            className="bg-white flex flex-col border rounded-lg overflow-hidden pb-4 hover:shadow-md transition duration-300 ease-in-out"
                        >
                            <div className='flex px-4 pt-3 bg-rose-700 items-center md:mb-0 mb-[15px] space-x-2 pb-[8px] border-b-[2px] border-rose-700 '>
                                <div className='w-[32px] h-[32px] md:w-[38px] md:h-[38px] rounded-full flex items-center justify-center text-[28px] bg-rose-100 text-rose-600'>
                                    <TbBrandBooking />
                                </div>
                                <div className='flex w-[85%] pb-[4px] justify-between items-center'>
                                    <div className='font-[600] text-[15px] md:text-[20px] text-rose-50'><p>{`${booking.listingDetails.name.slice(0, 20)}` || 'N/A'}</p></div>
                                    <Link to={`/listing/${booking.listingId}`} className='text-rose-50 w-[110px] text-[15px] hover:text-red-300 hover:underline cursor-pointer flex items-center '>
                                        See Listings <FaArrowRight className='pl-[5px] mt-[2px]' />
                                    </Link>
                                </div>
                            </div>

                            <div className='ml-[53px] md:mt-[15px]'>
                                <div className='flex items-center space-x-2'>
                                    <AiOutlineCalendar className='text-rose-800' />
                                    <p className='text-[13px] font-[600] text-gray-500 '>Check-In</p>
                                    <p className='font-[600] text-[14px] text-green-700'>{new Date(booking.checkIn).toDateString()}</p>
                                </div>

                                <div className='flex items-center space-x-2'>
                                    <AiOutlineCalendar className='text-rose-800' />
                                    <p className='text-[13px] font-[600] text-gray-500 '>Check Out</p>
                                    <p className='font-[600] text-[14px] text-rose-800'>{new Date(booking.checkOut).toDateString()}</p>
                                </div>

                                <div className='flex items-center space-x-2'>
                                    <MdOutlinePropane className='text-rose-800' />
                                    <p className='text-[13px] font-[600] text-gray-500 '>Property Type</p>
                                    <p className='font-[600] text-[14px] text-rose-800'>{booking.listingDetails.property_type}</p>
                                </div>

                                <div className='flex  mt-[8px] items-center space-x-2'>
                                    <GrStatusInfo className='text-rose-800 text-[18px]' />
                                    <p className='text-[15px] font-[600] text-gray-500 '>Status</p>
                                    <p className={`font-[600] px-[12px] py-[2px] mt-[5px] text-white rounded-[30px] text-[12px] ${booking.status === 'approved' ? 'bg-green-800' : booking.status === 'pending' ? 'bg-yellow-600' : booking.status === 'confirmed' ? 'bg-blue-800' : booking.status === 'rejected' ? 'bg-red-800' : booking.status === 'completed' ? 'text-gray-800' : ''}`}>{booking.status}</p>
                                </div>

                            </div>

                            <p className="mt-[15px] ml-[53px] flex space-x-3 items-center text-rose-600 cursor-pointer underline" onClick={() => fetchGuestDetails(booking.userID)} >
                                <FaInfoCircle size={20} />
                                <span>User Contact/Info</span>
                            </p>


                            <div className="mt-5 md:mt-4 ml-auto mr-[8px]">
                                <button
                                    onClick={() => updateStatus(booking._id, 'rejected')}
                                    className="px-4 py-[4px] mr-2 bg-red-700 text-[13px] text-white rounded-md hover:bg-red-600"
                                >
                                    Reject
                                </button>
                                <button
                                    onClick={() => updateStatus(booking._id, 'approved')}
                                    className=" px-4 py-[4px] bg-green-700 text-[13px] text-white rounded-md hover:bg-green-600"
                                >
                                    Approve
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Modal for Guest Details */}
                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 1, x: -500 }}
                            animate={{ scale: 1, opacity: 1, x: 0 }}
                            transition={{
                                duration: 0.5,
                                ease: [0.2, 0.8, 0.2, 1],
                            }}
                            className="bg-white rounded-lg shadow-lg p-6 w-96">
                            {modalLoading ? (
                               <MyLoader/>
                            ) : guestDetails ? (
                                <div className='relative'>
                                    <button onClick={() => setShowModal(false)} className="absolute top-[-5px] right-4 text-gray-500 hover:text-gray-700" aria-label="Close Modal" >
                                        <MdClose size={24} />
                                    </button>
                                    <div className="flex items-center pt-[5px] mb-4">
                                        <div className="w-11 h-11 bg-gray-300 rounded-full flex-shrink-0 flex items-center justify-center">
                                            <FaUserCircle size={24} className="text-gray-500" />
                                        </div>
                                        <h2 className="text-xl font-semibold ml-4">{guestDetails.username}</h2>
                                    </div>

                                    <div className="space-y-[13px]">
                                        <p className="flex items-center gap-2">
                                            <label className='w-[34px] h-[34px] rounded-full flex items-center justify-center text-[17px] text-rose-100 bg-rose-600'>
                                                <FaEnvelope />
                                            </label>
                                            {guestDetails.email}
                                        </p>
                                        <p className="flex items-center text-[14px] gap-2">
                                            <label className='w-[34px] h-[34px] rounded-full flex items-center justify-center text-[17px] text-rose-100 bg-rose-600'>
                                                <FaPhoneAlt />
                                            </label>
                                            {guestDetails.phoneNumber || `No Phone numebr added by ${guestDetails.username}`}
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <label className='w-[34px] h-[34px] rounded-full flex items-center justify-center text-[17px] text-rose-100 bg-rose-600'>
                                                <FaMapMarkerAlt />
                                            </label>
                                            <strong>Lives In:</strong> {`${guestDetails.location.city}, ${guestDetails.location.country}`}
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <label className='w-[34px] h-[34px] rounded-full flex items-center justify-center text-[17px] text-rose-100 bg-rose-600'>
                                                <FaInfoCircle />
                                            </label>
                                            <strong>Bio:</strong> {guestDetails.bio}
                                        </p>
                                    </div>

                                    <div className="mt-4 border-t-[2px] pt-[8px]">
                                        <p className="flex items-center gap-2">
                                            <FaUserCircle className="text-purple-500" size={28}/>
                                            <strong>Social Links:</strong>
                                        </p>
                                        <ul className="list-none mt-3 ml-[35px] flex gap-[8px]">
                                            {guestDetails.socialLinks?.facebook && (
                                                <li className='w-[30px] h-[30px] rounded-full text-white flex items-center justify-center overflow-hidden bg-blue-700'>
                                                    <Link
                                                        to={guestDetails.socialLinks.facebook}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <TiSocialFacebook size={24} />
                                                    </Link>
                                                </li>
                                            )}
                                            {guestDetails.socialLinks?.instagram && (
                                                <li className='w-[30px] h-[30px] rounded-full text-white flex items-center justify-center overflow-hidden bg-pink-700'>
                                                    <Link
                                                        to={guestDetails.socialLinks.instagram}
                                                        target="_blank"
                                                        rel="noopener noreferrer" 
                                                    >
                                                        <AiOutlineInstagram size={24} />
                                                    </Link>
                                                </li>
                                            )}
                                            {guestDetails.socialLinks?.linkedin && (
                                                 <li className='w-[30px] h-[30px] rounded-full text-white flex items-center justify-center overflow-hidden bg-blue-700'>
                                                    <Link
                                                        to={guestDetails.socialLinks.linkedin}
                                                        target="_blank"
                                                        rel="noopener noreferrer" 
                                                    >
                                                        <FaLinkedinIn size={19} />
                                                    </Link>
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            ) : (
                                <p>No details available.</p>
                            )}
                        </motion.div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HostBookings;
