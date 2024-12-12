import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterestP, FaLinkedinIn } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-100  mx-auto px-4 xl:px-[55px] py-10">
            <div className="flex px-4 justify-evenly mb-6">
                <div className="flex-1">
                    <h5 className="text-gray-700 font-semibold mb-2">Airbnb</h5>
                    <ul>
                        <li><Link to="about-us" className="text-gray-600 hover:text-gray-800">About Us</Link></li>
                        <li><Link to="privacy-policy" className="text-gray-600 hover:text-gray-800">Privacy</Link></li>
                        <li><Link to="term-of-service" className="text-gray-600 hover:text-gray-800">Terms</Link></li>
                        <li><Link to="faq" className="text-gray-600 hover:text-gray-800">FAQ's</Link></li>
                        <li><Link to="accessibility" className="text-gray-600 hover:text-gray-800">Accessbility</Link></li>
                    </ul>
                </div>

                <div className="flex-1">
                    <h5 className="text-gray-700 font-semibold mb-2">Hosting</h5>
                    <ul>
                        <li><Link to="signUp" className="text-gray-600 hover:text-gray-800">Host your home</Link></li>
                        <li><Link to="signUp" className="text-gray-600 hover:text-gray-800">Host an Online Experience</Link></li>
                        <li><Link to="help-center" className="text-gray-600 hover:text-gray-800">Help Center</Link></li> 
                        <li><Link to="trust-and-safety" className="text-gray-600 hover:text-gray-800">Trust & Safety</Link></li> 
                    </ul>
                </div>
                <div className="flex-1">
                    <h5 className="text-gray-700 font-semibold mb-2">Community and Support</h5>
                    <ul>
                        <li><Link to="help-center" className="text-gray-600 hover:text-gray-800">Help</Link></li>
                        <li><Link to="https://news.airbnb.com/" target='_blank' className="text-gray-600 hover:text-gray-800">NewsRoom</Link></li>
                        <li><Link to="https://www.airbnb.com/release" target='_blank' className="text-gray-600 hover:text-gray-800">News Features</Link></li>
                        <li><Link to="https://careers.airbnb.com/" target='_blank' className="text-gray-600 hover:text-gray-800">Careers</Link></li>
                        <li><Link to="https://careers.airbnb.com/internship-programs/" target='_blank' className="text-gray-600 hover:text-gray-800">Neighborhood Support</Link></li>
                    </ul>
                </div>
            </div>

            <div className='h-[3px] bg-gray-200 w-[85%] mx-auto'></div>
            <div className="flex mt-[15px] flex-wrap justify-between items-center">
                <div className="text-gray-600 flex items-center">
                    <p className='mr-[8px]'>© 2024 Airbnb, Inc.</p>
                    <p className='flex items-center'><span className='w-[4px] mt-[3px] mr-[4px] h-[4px] bg-gray-400 rounded-full'></span>Term</p>
                    <p className='flex items-center'><span className='w-[4px] mt-[3px] mx-[10px] h-[4px] bg-gray-400 rounded-full'></span>Sitemap</p>
                    <p className='flex items-center'><span className='w-[4px] mt-[3px] mx-[10px] h-[4px] bg-gray-400 rounded-full'></span>Privacy</p>
                    <p className='flex items-center'><span className='w-[4px] mt-[3px] mx-[10px] h-[4px] bg-gray-400 rounded-full'></span>Your Privacy Choices</p>
                </div>
                <div className="flex space-x-4">
                    <Link to="" className="bg-gray-600 text-white hover:text-gray-800 p-[3px] rounded-md"><FaFacebookF /></Link>
                    <Link to="" className="bg-gray-600 text-white hover:text-gray-800 p-[3px] rounded-md"><FaTwitter /></Link>
                    <Link to="" className="bg-gray-600 text-white hover:text-gray-800 p-[3px] rounded-md"><FaInstagram /></Link>
                    <Link to="" className="bg-gray-600 text-white hover:text-gray-800 p-[3px] rounded-md"><FaPinterestP /></Link>
                    <Link to="" className="bg-gray-600 text-white hover:text-gray-800 p-[3px] rounded-md"><FaLinkedinIn /></Link>
                </div>
            </div>

        </footer>
    );
};

export default Footer;
