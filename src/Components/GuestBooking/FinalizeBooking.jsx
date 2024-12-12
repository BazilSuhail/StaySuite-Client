import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const FinalizeBooking = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const booking = location.state?.booking;

    if (!booking) {
        return <div className="text-center mt-10 text-red-500">No booking data found.</div>;
    }

    const finalizeBooking = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/manage-bookings/finalize-booking`,
                { bookingId: booking._id },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert('Booking finalized successfully!');
            navigate('/host-bookings');
        } catch (err) {
            console.error('Error finalizing booking:', err.response?.data || err.message);
            alert('Failed to finalize booking. Please try again.');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-[150px] p-4">
            <h1 className="text-2xl font-semibold text-center mb-6">Finalize Booking</h1>
            <div className="bg-white shadow-lg rounded-lg p-6">
                <p className="text-gray-600">Guest: {booking.userID || 'N/A'}</p>
                <p className="text-gray-600">Listing ID: {booking.listingId}</p>
                <p className="text-gray-600">Check-In: {new Date(booking.checkIn).toDateString()}</p>
                <p className="text-gray-600">Check-Out: {new Date(booking.checkOut).toDateString()}</p>
                <p className="text-gray-600">Guests: {booking.guests}</p>
                <p className="text-gray-600">Total Amount: ${booking.totalAmount}</p>
                <button
                    onClick={finalizeBooking}
                    className="w-full mt-6 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                    Finalize Booking
                </button>
            </div>
        </div>
    );
};

export default FinalizeBooking;
