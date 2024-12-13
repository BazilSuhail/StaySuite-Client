import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaPlusCircle, FaLinkedinIn } from "react-icons/fa";
import { RiDeleteBinLine } from 'react-icons/ri';
import MyLoader from '../../assets/MyLoader';
import { AiOutlineInstagram } from 'react-icons/ai';
import { TiSocialFacebook } from 'react-icons/ti';
import { motion } from 'framer-motion';

const Profile = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [updatedData, setUpdatedData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Avatar code 
    const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
    const [selectedAvatar, setSelectedAvatar] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/profile/user-info`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUserInfo(response.data);
                setLoading(false);
            } catch (err) {
                setError('Error fetching profile data');
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "city" || name === "country") {
            setUpdatedData({
                ...updatedData,
                location: {
                    ...userInfo.location,
                    ...updatedData.location,
                    [name]: value,
                },
            });
        }
        else {
            setUpdatedData({
                ...updatedData,
                [name]: value,
            });
        }
    };

    const handleArrayDelete = (attribute, value) => {
        setUpdatedData({
            ...updatedData,
            [attribute]: (updatedData[attribute] || userInfo[attribute] || []).filter((item) => item !== value),
        });
    };

    const openAvatarModal = () => {
        setIsAvatarModalOpen(true);
    };

    const closeAvatarModal = () => {
        setIsAvatarModalOpen(false);
    };

    const selectAvatar = (index) => {
        setSelectedAvatar(index);
        /*setUpdatedData({
            ...updatedData,
            profilePicture: index,
        });*/
        closeAvatarModal();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const updatedProfile = { ...updatedData, profilePicture: selectedAvatar || userInfo.profilePicture }; // Include avatar in profile update
            const response = await axios.put(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/profile/update-info`, updatedProfile, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUserInfo(response.data);
            setIsEditing(false);
        } catch (err) {
            setError('Error updating profile data');
        }
    };


    if (loading) {
        return <MyLoader />;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
    }

    const addNewField = (attribute) => {
        setUpdatedData({
            ...updatedData,
            [attribute]: [...(updatedData[attribute] || userInfo[attribute] || []), ''],
        });
    };

    const updateFieldValue = (attribute, index, value) => {
        const updatedArray = [...(updatedData[attribute] || userInfo[attribute] || [])];
        updatedArray[index] = value;
        setUpdatedData({
            ...updatedData,
            [attribute]: updatedArray,
        });
    };


    return (
        <main className='px-6 min-h-screen bg-gray-100 pt-[110px] lg:pt-[150px]'>
            {isEditing ?
                <div className="lg:flex lg:space-x-8 lg:items-start max-w-5xl mx-auto">
                    {/* Left wala Section */}
                    <div className="lg:w-1/3 mb-6 lg:mb-0">
                        <div className="flex justify-between py-6 p-[35px] bg-white rounded-[28px] shadow-sm ">
                            {/*<div className='flex flex-col items-center justify-center'>
                                <div className="w-[100px] h-[100px] bg-gray-300 rounded-full flex items-center justify-center mx-auto text-4xl font-bold text-gray-700 mb-[3px]">
                                    {userInfo.username.charAt(0)}
                                </div>
                                <h2 className="text-[25px] font-semibold">{userInfo.username}</h2>
                                <p className="bg-gray-500 text-gray-100 text-center py-[1px] mt-[8px] text-[13px] rounded-[35px] w-[70px]">{userInfo.role}</p>

                            </div>*/}

                            <div className='flex flex-col justify-center items-center mb-4'>
                                <img
                                    src={`/Avatars/${selectedAvatar || userInfo.profilePicture}.jpg`}
                                    alt="Profile Avatar"
                                    className="w-24 h-24 rounded-full border border-gray-300 shadow-md"
                                />
                                <button
                                    type="button"
                                    onClick={openAvatarModal}
                                    className='bg-blue-900 ml-[10px] text-white px-4 py-[2px] text-[12px] mt-[5px] rounded-md hover:bg-gray-600'
                                >
                                    Change Avatar
                                </button>
                                <h2 className="text-[25px] font-semibold">{userInfo.username}</h2>
                                <p className="bg-gray-500 text-gray-100 text-center py-[1px] mt-[8px] text-[13px] rounded-[35px] w-[70px]">{userInfo.role}</p>

                            </div>
                            <div className="flex flex-col mr-[25px] items-center justify-center text-gray-500">
                                <p className='text-[18px]'> {(() => {
                                    const reviewDate = new Date(userInfo.createdAt);
                                    const now = new Date();
                                    const timeDiff = now - reviewDate; // Difference in milliseconds

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
                                <p className='text-rose-700 font-[700]'>On AirBnb</p>
                            </div>
                        </div>

                        <div className="mt-8 p-6  border bg-white rounded-[24px]">
                            <h3 className="text-[17px] font-semibold mb-4">Bazil's confirmed information status</h3>
                            {userInfo.phoneNumber ?
                                <div className="flex items-center space-x-2 mb-2">
                                    <FaCheckCircle className="text-green-500" />
                                    <p className="text-sm text-gray-600">Phone number: <span className='font-[500]'>{userInfo.phoneNumber}</span></p>
                                </div>
                                :
                                <div className="flex items-center space-x-2 mb-2">
                                    <FaCheckCircle className="text-green-500" />
                                    <p className="text-sm text-gray-600">Phone number</p>
                                </div>
                            }

                            <hr className="my-4" />
                            <div>
                                <h3 className="text-lg font-semibold mb-2">Verify your identity</h3>
                                <p className="text-sm text-gray-500 mb-4">
                                    Before you book or host on Airbnb, you must to complete this step.
                                </p>
                                <button className="px-4 py-2 lg:pb-[24px] text-white text-sm rounded-md  ">
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className='lg:flex-1'>
                        <div className=" bg-white p-6 rounded-[22px] border ">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-[28px] font-semibold">About Bazil</h3>
                                <button onClick={handleSubmit} className="text-sm font-medium border-[2px]  text-gray-50 bg-gray-800 px-2 py-[4px] rounded-lg">Done</button>
                            </div>

                            <p className=''>
                                <span className='font-[700]  mr-[4px]'>Fullname:</span>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    value={updatedData.fullName || userInfo.fullName || ''}
                                    onChange={handleChange}
                                    className="p-[5px] border w-full my-[12px] border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </p>
                            <p className=''>
                                <span className='font-[700]  mr-[4px]'>User Name:</span>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={updatedData.username || userInfo.username || ''}
                                    onChange={handleChange}
                                    className="p-[5px] border w-full my-[12px] border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </p>
                            <p>
                                <span className='font-[700]  mr-[4px]'>Phone Number:</span>
                                <input
                                    type="text"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={updatedData.phoneNumber || userInfo.phoneNumber || ''}
                                    onChange={handleChange}
                                    className="p-[5px] border w-full my-[12px] border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    inputMode="numeric"
                                    maxLength={11}
                                    required
                                    title="Please enter exactly 11 digits"
                                />
                            </p>
                            <p>
                                <span className='font-[700]  mr-[4px]'>About:</span>
                                <input
                                    type="text"
                                    id="about"
                                    name="about"
                                    value={updatedData.about || userInfo.about || ''}
                                    onChange={handleChange}
                                    className="p-[5px] border w-full my-[12px]border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </p>
                            <p>
                                <span className='font-[700]  mr-[4px]'>Occupation:</span>
                                <input
                                    type="text"
                                    id="occupation"
                                    name="occupation"
                                    value={updatedData.occupation || userInfo.occupation || ''}
                                    onChange={handleChange}
                                    className="p-[5px] border w-full my-[12px] border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </p>
                            <p>
                                <span className="font-[700] mr-[4px]">Location:</span>
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    value={(updatedData.location?.city) || userInfo.location.city || ''}
                                    onChange={handleChange}
                                    placeholder="Enter City"
                                    className="p-[5px] placeholder:text-gray-800 border w-full my-[12px] border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                                <input
                                    type="text"
                                    id="country"
                                    name="country"
                                    value={(updatedData.location?.country) || userInfo.location.country || ''}
                                    onChange={handleChange}
                                    placeholder="Enter Country"
                                    className="p-[5px] border placeholder:text-gray-800 w-full my-[12px] border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </p>
                        </div>
                        <div className="lg:flex lg:space-x-8 lg:items-start max-w-5xl mx-auto">
                            {/* Edit Right Section */}
                            <div className="lg:flex-1">
                                <div className="mt-8 bg-white p-6 rounded-[22px] border ">
                                    <h3 className="text-[20px] font-semibold">Ask Me In</h3>
                                    <div className="mt-8">
                                        <h3 className="text-[17px] font-semibold">Languages</h3>
                                        {(updatedData.languages || userInfo.languages || []).map((language, index) => (
                                            <div key={index} className="flex items-center my-2">
                                                <input
                                                    type="text"
                                                    value={language}
                                                    onChange={(e) => updateFieldValue('languages', index, e.target.value)}
                                                    className="p-2 border rounded-md w-full"
                                                />
                                                <button
                                                    onClick={() => handleArrayDelete('languages', language)}
                                                    className="ml-2 px-2 py-1 bg-red-100 text-red-800 rounded-md"
                                                >
                                                    <RiDeleteBinLine />
                                                </button>
                                            </div>
                                        ))}
                                        <button type="button" onClick={() => addNewField('languages')} className="bg-green-700 flex items-center mt-[15px] text-white px-3 py-1 rounded-xl hover:bg-green-600 focus:outline-none">
                                            <FaPlusCircle className="mr-2" />
                                            Add Language
                                        </button>
                                    </div>

                                    <div className="mt-8">
                                        <h3 className="text-[17px] font-semibold">Interests</h3>
                                        {(updatedData.interests || userInfo.interests || []).map((interest, index) => (
                                            <div key={index} className="flex items-center my-2">
                                                <input
                                                    type="text"
                                                    value={interest}
                                                    onChange={(e) => updateFieldValue('interests', index, e.target.value)}
                                                    className="px-2 py-[3px] border rounded-md w-full"
                                                />
                                                <button
                                                    onClick={() => handleArrayDelete('interests', interest)}
                                                    className="ml-2 px-2 py-1 bg-red-100 text-red-800 rounded-md"
                                                >
                                                    <RiDeleteBinLine />
                                                </button>
                                            </div>
                                        ))}
                                        <button type="button" onClick={() => addNewField('interests')} className="bg-blue-500 flex items-center mt-[15px] text-white px-3 py-1 rounded-xl hover:bg-green-600 focus:outline-none">
                                            <FaPlusCircle className="mr-2" />
                                            Add Amenity
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 bg-white p-6 rounded-[22px] border ">
                            <h3 className="text-[20px] font-semibold">Ask Me In</h3>
                            <div className="list-disc list-inside space-y-2">
                                {userInfo.languages && userInfo.languages.length > 0 ? (
                                    userInfo.languages.map((language, index) => (
                                        <p key={index} className="inline-block px-[15px] text-sm mr-[4px] bg-gray-600 text-white rounded-[25px]">
                                            {language}
                                        </p>
                                    ))
                                ) : (
                                    <p className="text-gray-500">No languages available.</p>
                                )}
                            </div>
                            <h3 className="text-[20px] mt-[35px] font-semibold">Interest</h3>
                            <div className="list-disc list-inside space-y-2">
                                {userInfo.interests && userInfo.interests.length > 0 ? (
                                    userInfo.interests.map((interests, index) => (
                                        <p key={index} className="inline-block px-[15px] text-sm mr-[4px] bg-gray-200 text-gray-600 rounded-[25px]">
                                            {interests}
                                        </p>
                                    ))
                                ) : (
                                    <p className="text-gray-500">No interests Added.</p>
                                )}
                            </div>

                            <div className="mt-8">
                                <h3 className="text-[17px] font-semibold">Social Links</h3>
                                {['facebook', 'instagram', 'linkedin'].map((platform) => (
                                    <div key={platform} className="flex items-center my-2">
                                        <label className="w-20 font-semibold capitalize">{platform}:</label>
                                        <input
                                            type="text"
                                            name={platform}
                                            value={updatedData.socialLinks?.[platform] || userInfo.socialLinks?.[platform] || ''}
                                            onChange={(e) =>
                                                setUpdatedData({
                                                    ...updatedData,
                                                    socialLinks: {
                                                        ...userInfo.socialLinks,
                                                        ...updatedData.socialLinks,
                                                        [platform]: e.target.value,
                                                    },
                                                })
                                            }
                                            className="px-2 py-[2px] ml-[8px] border rounded-md w-full"
                                            placeholder={`Enter ${platform} link`}
                                        />
                                    </div>
                                ))}
                            </div>

                        </div>

                    </div>
                </div>
                :
                <div className="lg:flex lg:space-x-8 lg:items-start max-w-5xl mx-auto">
                    {/* Left Section */}
                    <div className="lg:w-1/3 mb-6 lg:mb-0">
                        <div className="flex justify-between py-6 p-[35px] bg-white rounded-[28px] shadow-sm ">
                            <div className='flex flex-col items-center justify-center'>
                                <img
                                    src={`/Avatars/${selectedAvatar || userInfo.profilePicture}.jpg`}
                                    alt="Profile Avatar"
                                    className="w-24 h-24 rounded-full border border-gray-300 shadow-md"
                                />
                                <h2 className="text-[25px] font-semibold">{userInfo.username}</h2>
                                <p className="bg-gray-500 text-gray-100 text-center py-[1px] mt-[8px] text-[13px] rounded-[35px] w-[70px]">{userInfo.role}</p>

                            </div>
                            <div className="flex flex-col mr-[25px] items-center justify-center text-gray-500">
                                <p className='text-[18px]'> {(() => {
                                    const reviewDate = new Date(userInfo.createdAt);
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
                                <p className='text-rose-700 font-[700]'>On AirBnb</p>
                            </div>
                        </div>

                        <div className="mt-8 p-6  border bg-white rounded-[24px]">
                            <h3 className="text-[17px] font-semibold mb-4">Bazil's confirmed information status</h3>
                            {userInfo.phoneNumber ?
                                <div className="flex items-center space-x-2 mb-2">
                                    <FaCheckCircle className="text-green-500" />
                                    <p className="text-sm text-gray-600">Phone number: <span className='font-[500]'>{userInfo.phoneNumber}</span></p>
                                </div>
                                :
                                <div className="flex items-center space-x-2 mb-2">
                                    <FaCheckCircle className="text-green-500" />
                                    <p className="text-sm text-gray-600">Phone number</p>
                                </div>
                            }

                            <hr className="my-4" />
                            <div>
                                <h3 className="text-lg font-semibold mb-2">Verify your identity</h3>
                                <p className="text-sm text-gray-500 mb-4">
                                    Before you book or host on Airbnb, you must to complete this step.
                                </p>
                                <button className="px-4 py-2 lg:pb-[24px] text-white text-sm rounded-md  ">
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className='lg:flex-1'>
                        <div className=" bg-white p-6 rounded-[22px] border ">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-[28px] font-semibold">About Bazil</h3>
                                <button onClick={() => setIsEditing(true)} className="text-sm font-medium border-[2px] border-gray-700 text-gray-800 px-2 py-[4px] rounded-lg">Edit profile</button>
                            </div>

                            <p><span className='font-[700]  mr-[4px]'>Fullname:</span> {userInfo.fullName}</p>
                            <p><span className='font-[700]  mr-[4px]'>Email:</span> {userInfo.email}</p>
                            <p><span className='font-[700]  mr-[4px]'>About:</span> {userInfo.about}</p>
                            <p><span className='font-[700]  mr-[4px]'>Occupation:</span> {userInfo.occupation}</p>
                            <p><span className='font-[700]  mr-[4px]'>Location:</span> {userInfo.location.city}, {userInfo.location.country}</p>

                        </div>

                        <div className="mt-8 bg-white p-6 rounded-[22px] border ">
                            <h3 className="text-[20px] font-semibold">Ask Me In</h3>
                            <div className="list-disc list-inside space-y-2">
                                {userInfo.languages && userInfo.languages.length > 0 ? (
                                    userInfo.languages.map((language, index) => (
                                        <p key={index} className="inline-block px-[15px] text-sm mr-[4px] bg-gray-600 text-white rounded-[25px]">
                                            {language}
                                        </p>
                                    ))
                                ) : (
                                    <p className="text-gray-500">No languages available.</p>
                                )}
                            </div>
                            <h3 className="text-[20px] mt-[35px] font-semibold">Interest</h3>
                            <div className="list-disc list-inside space-y-2">
                                {userInfo.interests && userInfo.interests.length > 0 ? (
                                    userInfo.interests.map((interests, index) => (
                                        <p key={index} className="inline-block px-[15px] text-sm mr-[4px] bg-gray-200 text-gray-600 rounded-[25px]">
                                            {interests}
                                        </p>
                                    ))
                                ) : (
                                    <p className="text-gray-500">No interests Added.</p>
                                )}
                            </div>

                            <div className='flex mt-[15px] items-center'>
                                <p className='text-rose-900 font-[500] mr-[15px]'>Found Me at:</p>
                                {userInfo.socialLinks.facebook && userInfo.socialLinks.instagram && userInfo.socialLinks.linkedin && <p>No Social Links Attached</p>}
                                <ul className="list-none mt-3 ml-[35px] flex gap-[8px]">
                                    {userInfo.socialLinks?.facebook && (
                                        <li className='w-[30px] h-[30px] rounded-full text-white flex items-center justify-center overflow-hidden bg-blue-700'>
                                            <Link
                                                to={userInfo.socialLinks.facebook}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <TiSocialFacebook size={24} />
                                            </Link>
                                        </li>
                                    )}
                                    {userInfo.socialLinks?.instagram && (
                                        <li className='w-[30px] h-[30px] rounded-full text-white flex items-center justify-center overflow-hidden bg-pink-700'>
                                            <Link
                                                to={userInfo.socialLinks.instagram}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <AiOutlineInstagram size={24} />
                                            </Link>
                                        </li>
                                    )}
                                    {userInfo.socialLinks?.linkedin && (
                                        <li className='w-[30px] h-[30px] rounded-full text-white flex items-center justify-center overflow-hidden bg-blue-700'>
                                            <Link
                                                to={userInfo.socialLinks.linkedin}
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

                    </div>
                </div>
            }
            {/* Avatar Selection Modal */}
            {isAvatarModalOpen && (
                <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
                    <motion.div
                        className='bg-white p-6 rounded-lg shadow-lg'
                        initial={{ y: -100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -100, opacity: 0 }}
                    >
                        <h2 className='text-xl font-bold mb-4'>Select an Avatar</h2>
                        <div className='grid grid-cols-3 lg:grid-cols-4 gap-4'>
                            {Array.from({ length: 12 }).map((_, index) => (
                                <img
                                    key={index}
                                    src={`/Avatars/${index + 1}.jpg`}
                                    alt={`Avatar ${index + 1}`}
                                    className='w-24 h-24 rounded-full border border-gray-300 shadow-md cursor-pointer hover:opacity-75'
                                    onClick={() => selectAvatar(index + 1)}
                                />
                            ))}
                        </div>
                        <button
                            onClick={closeAvatarModal}
                            className='mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600'
                        >
                            Close
                        </button>
                    </motion.div>
                </div>
            )}
        </main >
    );
};

export default Profile; 