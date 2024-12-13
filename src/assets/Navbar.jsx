import React, { useState, useEffect } from 'react';
import { FaBars, FaBed, FaBell, FaHeart, FaSearch, FaSlidersH, FaTimes, FaUser, FaUserCircle } from 'react-icons/fa';
import { AiOutlineCheckCircle, AiOutlineClose, AiOutlineSearch } from 'react-icons/ai';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import airbnb from "../logo.svg";

import { motion, useScroll, useTransform } from 'framer-motion';
import { FiHome } from 'react-icons/fi';
import { useAuthContext } from '../AuthProvider';
import { MdAssessment } from 'react-icons/md';
import { IoBookmarksOutline } from 'react-icons/io5';
import { BiLogIn } from 'react-icons/bi';
import FiltersModal from '../Components/Home/FilterModal';

const Navbar = () => {
    const navigate = useNavigate();

    const { user, userRole, notificationsCount, logout, toast, closeToast } = useAuthContext();

    const [isOpen, setIsOpen] = useState(false);
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [homePath, sethomePath] = useState(true);
    const location = useLocation();

    // bottom navigaiton

    const [scrollPosition, setScrollPosition] = useState(0);
    const [isScrollingUp, setIsScrollingUp] = useState(true);
    const [prevScrollPosition, setPrevScrollPosition] = useState(0);

    const [showFilterModal, setShowFilterModal] = useState(false);

    /*function isTokenValid() {
        const token = localStorage.getItem('token');

        if (!token) {
            return false;
        }

        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            if (payload.exp && Date.now() >= payload.exp * 1000) {
                return false;
            }
            return true;
        }
        catch (error) {
            console.error('Invalid token:', error);
            return false;
        }
    }

    const isUserLoggedIn = isTokenValid();*/

    const { scrollY } = useScroll();
    const opacity = useTransform(scrollY, [0, 150], [1, 0]);
    const y = useTransform(scrollY, [0, 200], [0, -120]);

    useEffect(() => {
        sethomePath(location.pathname === '/');
    }, [location.pathname]);


    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleScroll = () => {
        if (window.scrollY > 50) {
            setShowSearchBar(true);
        }
        else {
            setShowSearchBar(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;
            if (currentScrollPos > prevScrollPosition) {
                setIsScrollingUp(false);
            } else {
                setIsScrollingUp(true);
            }

            setPrevScrollPosition(currentScrollPos);
            setScrollPosition(currentScrollPos);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [prevScrollPosition]);

    const handleLogout = () => {
        //localStorage.removeItem('token');
        logout();
        toggleMenu();
        navigate('/signin');
    };

    const getNavbarClasses = () => {
        if (scrollPosition > window.innerHeight) {
            return 'bg-[#000000c5]';
        }
        return 'bg-navbar-color';
    };

    const getNavbarTranslateClasses = () => {
        if (!isScrollingUp && scrollPosition > 50) {
            return 'translate-y-[70px]';
        }
        return 'translate-y-0';
    };

    const closeFilterModal = () => {
        setShowFilterModal(false);
    }

    return (
        <header className="bg-white fixed w-full z-50 top-0">
            {showFilterModal && <FiltersModal closeFilterModal={closeFilterModal} />}
            <nav className='md:block hidden'>
                <div className={`${location.pathname === '/' ? 'border-white pt-4' : 'border-b-[3px] border-gray-100 py-4'} mx-auto px-4 sm:px-6 md:px-[15px] lg:px-[35px] xl:px-[75px]`}>
                    <div className="flex justify-between items-center ">
                        <div className="flex items-center">
                            <img src={airbnb} alt="" className='w-[32px] mr-[5px] h-[27px] mt-[2px]' />
                            <NavLink to="/" className="text-[24px] font-[780] text-red-500">
                                airbnb
                            </NavLink>
                        </div>

                        {!homePath ?
                            <div onClick={() => setShowFilterModal(true)} className="hidden cursor-pointer sm:flex items-cente border-[2px] xl:mr-[-165px] z-90 rounded-full py-2 px-4 shadow-md">
                                <p className="bg-transparent flex-grow outline-none border-r-[2px] border-gray-200 px-[8px] font-[600] text-gray-700">Anywhere</p>
                                <p className="bg-transparent flex-grow outline-none border-r-[2px] border-gray-200 px-[8px] font-[600] text-[15px] text-gray-700">Any week</p>
                                <p className="bg-transparent flex-grow outline-none px-[8px] font-[600] text-[15px] text-gray-500">Any Guests</p>
                                <AiOutlineSearch className="bg-red-500 text-white rounded-full p-[5.5px] ml-[6px] text-[28px]" />
                            </div>
                            : <>
                                {showSearchBar ? (
                                    <div onClick={() => setShowFilterModal(true)} className="hidden cursor-pointer sm:flex z-50 items-cente border-[2px] xl:mr-[-165px] z-90 rounded-full py-2 px-4 shadow-md">
                                        <p className="bg-transparent flex-grow outline-none border-r-[2px] border-gray-200 px-[8px] font-[600] text-gray-700">Anywhere</p>
                                        <p className="bg-transparent flex-grow outline-none border-r-[2px] border-gray-200 px-[8px] font-[600] text-[15px] text-gray-700">Any week</p>
                                        <p className="bg-transparent flex-grow outline-none px-[8px] font-[600] text-[15px] text-gray-500">Any Guests</p>
                                        <AiOutlineSearch className="bg-red-500 text-white rounded-full p-[5.5px] ml-[6px] text-[28px]" />
                                    </div>
                                ) : (
                                    <motion.div
                                        style={{ opacity, y }}
                                        className="hidden cursor-pointer sm:flex xl:mr-[-165px] bg-white z-90 space-x-6"
                                    >
                                        <div onClick={() => setShowFilterModal(true)} className="text-gray-600 hover:text-black font-medium">
                                            Explore
                                        </div>
                                        {user && userRole === 'Guest' ?
                                            <NavLink to="/reserved-bookings-history" className="text-gray-600 hover:text-black font-medium">
                                                Experiences
                                            </NavLink> : 
                                            <div onClick={() => setShowFilterModal(true)} className="text-gray-600 hover:text-black font-medium">
                                            Experiences
                                        </div>
                                        }
                                    </motion.div>
                                )}
                            </>
                        }

                        <div className="flex items-center space-x-4">
                            <span className='text-gray-700 xl:block hidden text-md'>Airbnb Your Home</span>
                            <NavLink to={userRole === "Guest" ? "/guest_notifications" : "/host_notifications"} className="hidden md:inline-flex items-center  space-x-2 hover:text-black">
                                <FaBell className={`text-xl ${notificationsCount === 0 ? 'text-gray-500' : ' mr-[-20px]'}`} />
                                {notificationsCount !== 0 && <div className='text-[12px] font-[600] rounded-full w-[20px] h-[20px] text-white text-center bg-rose-600 mt-[-20px]'>{notificationsCount}</div>}
                            </NavLink>
                            <div onClick={toggleMenu} className="flex items-center space-x-2 border rounded-full px-3 py-2 hover:shadow-lg transition-shadow">
                                <div className='sm:block hidden'><GiHamburgerMenu className="text-xl text-gray-500" /></div>
                                <div className="sm:hidden">
                                    <button onClick={toggleMenu}>
                                        {isOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
                                    </button>
                                </div>
                                <FaUserCircle className="text-3xl text-gray-500" />
                            </div>

                        </div>
                    </div>

                    {isOpen && (
                        <div className="md:block hidden" >
                            <motion.div onClick={toggleMenu}
                                initial={{ opacity: 1, x: 500 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                    duration: 0.5,
                                    ease: [0.2, 0.8, 0.2, 1],
                                }}
                                className="flex flex-col absolute right-0 mr-[75px] w-[250px] bg-white rounded-lg border shadow-xl mt-5 p-4">
                                {user ? (
                                    <>
                                        <NavLink to="/profile" className="pl-[12px] block py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                                            Profile
                                        </NavLink>
                                        <button onClick={handleLogout} className="pl-[12px] text-start text-white py-[3px] bg-rose-500 my-[8px] hover:bg-rose-200 hover:text-rose-700 rounded-lg">
                                            Logout
                                        </button>
                                    </>
                                ) : (<>
                                    <NavLink to="/signUp" className="pl-[12px] block py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                                        Sign up
                                    </NavLink>
                                    <NavLink to="/signIn" className="pl-[12px] block py-2 text-rose-600 font-[600] hover:bg-gray-100 rounded-lg">
                                        Log in
                                    </NavLink>
                                </>
                                )}

                                <div className="w-full bg-gray-200 h-[2px] my-2"></div>

                                {user &&
                                    <>{userRole === 'Host' ? <>
                                        <NavLink to="/host-listing" className="pl-[12px] block py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                                            Host Listing
                                        </NavLink>
                                        <NavLink to="/host-bookings" className="pl-[12px] block py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                                            Host Bookings
                                        </NavLink>
                                        <NavLink to="/add-listing" className="pl-[12px] block py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                                            Add Listing
                                        </NavLink>
                                    </>
                                        : <>
                                            <NavLink to="/favourite-listings" className="pl-[12px] block py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                                                Favourites
                                            </NavLink>

                                            <NavLink to="/reserved-bookings" className="pl-[12px] block py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                                                Reserved Bookings
                                            </NavLink>
                                            <NavLink to="/reserved-bookings-history" className="pl-[12px] block py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                                                Past Experiences
                                            </NavLink>
                                        </>}
                                    </>
                                }
                                <NavLink to="/privacy-policy" className="pl-[12px] block py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                                    Privacy Policy
                                </NavLink>
                                <NavLink to="/help-center" className="pl-[12px] block py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                                    Help Center
                                </NavLink>
                            </motion.div>
                        </div>
                    )}
                </div>
            </nav>

            <nav className='md:hidden block'>
                <div className="flex z-[999] items-center py-[10px] px-[18px] w-screen">
                    <div onClick={() => setShowFilterModal(true)} className='border-[2px] w-[85%] border-gray-300 rounded-[25px] flex items-center py-[5px] px-3'>
                        <FaSearch className="text-gray-700 mr-5" size={25} />
                        <div className="flex-1 text-[14px] text-gray-500">
                            <div className="font-medium">Where to?</div>
                            <div className="text-[12px] text-gray-400">Anywhere · Any week · Add guests</div>
                        </div>
                    </div>
                    <div className='w-[15%] flex justify-center'>
                        <p className=" border-[2px] p-2 border-gray-500 rounded-full bg-gray-100">
                            <FaSlidersH onClick={toggleMenu} className="text-gray-500" size={20} />
                        </p>
                    </div>
                </div>
                {isOpen && (
                    <div className="sm:hidden">
                        <motion.div className="flex flex-col z-10 bg-white rounded-lg shadow-md mt-2 p-4"
                            initial={{ opacity: 1, y: -500 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.5,
                                ease: [0.2, 0.8, 0.2, 1],
                            }}
                        >

                            {user &&
                                <>{userRole === 'Host' ? <>
                                    <NavLink to="/host-bookings" onClick={toggleMenu} className="pl-[12px] block py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                                        Host Bookings
                                    </NavLink>
                                    <NavLink to="/add-listing" onClick={toggleMenu} className="pl-[12px] block py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                                        Add Listing
                                    </NavLink>
                                </>
                                    : <>
                                        <NavLink to="/reserved-bookings-history" onClick={toggleMenu} className="pl-[12px] block py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                                            Bookings History
                                        </NavLink>
                                        <NavLink to="/reserved-bookings" onClick={toggleMenu} className="pl-[12px] block py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                                            Reserved Bookings
                                        </NavLink>
                                    </>}
                                </>
                            }
                            <NavLink to="/privacy-policy" onClick={toggleMenu} className="pl-[12px] block py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                                Privacy Policy
                            </NavLink>
                            <NavLink to="/accessibility" onClick={toggleMenu} className="pl-[12px] block py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                                Accessibility
                            </NavLink>

                            <div className="w-full bg-gray-200 h-[2px] my-2"></div>
                            {user ? (
                                <>
                                    <NavLink to="/profile" onClick={toggleMenu} className="pl-[12px] block py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                                        Profile
                                    </NavLink>
                                    <button onClick={handleLogout} className="pl-[12px] text-start block py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                                        Logout
                                    </button>
                                </>
                            ) : (<>
                                <NavLink to="/signUp" onClick={toggleMenu} className="pl-[12px] block py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                                    Sign up
                                </NavLink>
                                <NavLink to="/signIn" onClick={toggleMenu} className="pl-[12px] block py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                                    Log in
                                </NavLink>
                            </>
                            )}

                        </motion.div>
                    </div>
                )}

                <div className={`fixed bottom-0 left-0 w-full bg-white shadow-lg flex  justify-between py-2 transition-transform duration-300 ${getNavbarTranslateClasses()} ${getNavbarClasses()} ${user ? 'px-[40px]' : 'px-[110px]'}`}>
                    <NavLink to="/" className={({ isActive }) => `flex flex-col items-center ${isActive ? 'text-rose-600' : 'text-gray-400'}`} >
                        <FiHome className="mb-[6px]" size={22} />
                        <span className="text-xs">Home</span>
                    </NavLink>

                    {user &&
                        <>{userRole === 'Host' ? <>
                            <NavLink to="/host-bookings" className={({ isActive }) => `flex flex-col items-center ${isActive ? 'text-rose-600' : 'text-gray-400'}`} >
                                <IoBookmarksOutline className="mb-[6px]" size={22} />
                                <span className="text-xs">Bookly</span>
                            </NavLink>
                            <NavLink to="/host-listing" className={({ isActive }) => `flex flex-col items-center ${isActive ? 'text-rose-600' : 'text-gray-400'}`} >
                                <MdAssessment className="scale-[1.2] mb-[6px]" size={22} />
                                <span className="text-xs">Dashboard</span>
                            </NavLink></>
                            : <>
                                <NavLink to="/favourite-listings" className={({ isActive }) => `flex flex-col items-center ${isActive ? 'text-rose-600' : 'text-gray-400'}`} >
                                    <FaHeart className="mb-[6px]" size={22} />
                                    <span className="text-xs">Favourites</span>
                                </NavLink>
                                <NavLink to="/reserved-bookings" className={({ isActive }) => `flex flex-col items-center ${isActive ? 'text-rose-600' : 'text-gray-400'}`} >
                                    <FaBed className="scale-[1.2] mb-[6px]" size={22} />
                                    <span className="text-xs">MyBookings</span>
                                </NavLink>
                            </>}
                        </>
                    }

                    {user ?
                        <NavLink to={userRole === "Guest" ? "/guest_notifications" : "/host_notifications"} className={({ isActive }) => `relative flex flex-col items-center ${isActive ? 'text-rose-600' : 'text-gray-400'}`} >
                            <FaBell className="mb-[6px]" size={22} />
                            {notificationsCount !== 0 && <div className='absolute text-[12px] font-[600] rounded-full w-[22px] h-[22px] ml-[20px] text-white text-center bg-rose-800 border-[2px] border-white mt-[-10px]'>{notificationsCount}</div>}
                            <span className="text-xs">Alerts</span>
                        </NavLink>
                        :
                        <NavLink to="/signUp" className={({ isActive }) => `flex flex-col items-center ${isActive ? 'text-rose-600' : 'text-gray-400'}`} >
                            <FaBell className="mb-[6px]" size={22} />
                            <span className="text-xs">Alerts</span>
                        </NavLink>
                    }


                    {user ?
                        <NavLink to="/profile" className={({ isActive }) => `flex flex-col items-center ${isActive ? 'text-rose-600' : 'text-gray-400'}`} >
                            <FaUser className="mb-[6px]" size={22} />
                            <span className="text-xs">Profile</span>
                        </NavLink>
                        :
                        <NavLink to="/signIn" className={({ isActive }) => `flex flex-col items-center ${isActive ? 'text-rose-600' : 'text-gray-400'}`} >
                            <BiLogIn className="mb-[6px]" size={22} />
                            <span className="text-xs">JoinUs</span>
                        </NavLink>
                    }
                </div>
            </nav>
            {toast.visible && (
                <motion.div
                    className="fixed top-4 right-4 bg-white border text-black py-[4px] shadow-lg rounded-lg"
                    initial={{ scale: 0.7, opacity: 1, x: 500 }}
                    animate={{ scale: 1, opacity: 1, x: 0 }}
                    exit={{ scale: 0.7, opacity: 0, x: 500 }}
                    transition={{
                        duration: 0.5,
                        ease: [0.2, 0.8, 0.2, 1],
                    }}
                >
                    <div className='flex flex-col px-[15px]'>
                        <AiOutlineClose className="cursor-pointer ml-auto text-[14px] text-gray-600 hover:text-gray-800" onClick={closeToast} />
                        <div className='w-full bg-gray-200 rounded-xl h-[1.5px] my-[4px]'></div>
                        <div className='flex items-center pb-[10px] mt-[6px]' >
                            <FaBell className='text-[28px] text-rose-500 border-[3px] border-rose-300 rounded-full p-[4px]' />
                            <p className='mx-[15px]'>{toast.message}</p>
                        </div>
                    </div>
                    <motion.div
                        className="absolute bottom-0 left-0 h-[3px] bg-rose-300 rounded"
                        initial={{ width: "100%" }}
                        animate={{ width: 0 }}
                        transition={{
                            duration: 6,
                            ease: "linear",
                        }}
                    />
                </motion.div>
            )}
        </header >
    );
};

export default Navbar; 