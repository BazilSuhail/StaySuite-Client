import React, { useEffect, useState } from 'react'; 
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { useAuthContext } from '../../AuthProvider';
import { useNavigate } from 'react-router-dom';
import { MdSearch } from 'react-icons/md';
import { categories } from '../Host/AddListings_Utility';
import { RiCloseFill } from 'react-icons/ri';
import { motion } from 'framer-motion';

const FiltersModal = ({ closeFilterModal }) => {
    const navigate = useNavigate();
    const { setSearchFilters } = useAuthContext();
    const [title, setTitle] = useState('');
    const [suburb, setSuburb] = useState('');
    const [country, setCountry] = useState('');
    const [minPrice, setMinPrice] = useState(20);
    const [maxPrice, setMaxPrice] = useState(250);
    const [beds, setBeds] = useState('Any');
    const [bathrooms, setBathrooms] = useState('Any');
    const [category, setCategory] = useState('Apartment');
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);


    const [heights, setHeights] = useState([]);
    const handleCategoryClick = (category) => {
        setCategory(category);
        setIsCategoryModalOpen(false); 
    };

    useEffect(() => {
        const calculatedHeights = Array.from({ length: 50 }, () => Math.floor(Math.random() * (80 - 10 + 1)) + 10);
        setHeights(calculatedHeights);
    }, []);

    const handleRangeChange = (e, type) => {
        const value = Number(e.target.value);
        if (type === 'min') {
            setMinPrice(Math.min(value, maxPrice));
        }
        else if (type === 'max') {
            setMaxPrice(Math.max(value, minPrice));
        }
    };

    const resetFilters = () => {
        setTitle('');
        setSuburb('');
        setCountry('');
        setMinPrice(10);
        setMaxPrice(130);
        setCategory("Apartment");
        setBeds('Any');
        setBathrooms('Any');
    };

    const logValues = () => {
        console.log({ title, suburb, country, minPrice, maxPrice, beds, bathrooms,category });
        setSearchFilters({ title, suburb, country, minPrice, maxPrice, beds, bathrooms,category });

        navigate("/search");
        closeFilterModal();
    };

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-[999]">
            <motion.div
            initial={{ opacity: 1, y: 500 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              ease: [0.2, 0.8, 0.2, 1], // Custom cubic-bezier easing
            }}
            className="bg-white rounded-lg w-[95%] sm:w-11/12 max-w-md sm:pb-6 pb-[150px] sm:mb-0 mb-[-180px] px-6 pt-6 shadow-lg"
            >

                <div className="flex justify-between items-center border-b pb-4">
                    <h2 className="text-lg font-semibold">Filters</h2>
                    <button onClick={closeFilterModal} className="text-gray-500 mt-[-15px] hover:text-black text-[28px]">&times;</button>
                </div>


                <div className="mt-4">

                    <div className="mb-[10px] pl-[6px] flex items-center border-[2px] border-gray-300 py-[4px] rounded-[15px]">
                        <MdSearch size={28} className='text-gray-400 mr-[6px]' />
                        <input
                            type="text"
                            placeholder="Search by title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="outline-none text-[14px]"
                        />
                    </div>

                    <div className="mb-6 grid grid-cols-2 gap-2">   <input
                        type="text"
                        placeholder="Enter Country Name"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="px-2 py-[4px] text-[13px] outline-none border-[2px] border-gray-300 rounded-[15px]"
                    />
                        <input
                            type="text"
                            placeholder="Enter Suburb of Country (optional*)"
                            value={suburb}
                            onChange={(e) => setSuburb(e.target.value)}
                            className="px-2 py-[4px] text-[13px] outline-none border-[2px] border-gray-300 rounded-[15px]"
                        />
                    </div>

                    <div className="mb-[65px] md:mb-[45px]">
                        <h3 className="font-medium">Price Range</h3>
                        <p className="text-[12px] mb-[15px] text-gray-500">Nightly prices before fees and taxes</p>
                        <div className="xl:pl-[12px] flex overflow-hidden rotate-180 scale-x-[-1] w-full mb-2">
                            {heights.map((randomHeight, index) => {
                                const stepValue = 10 + index * 5; // Each bar represents a step of 5
                                const isInRange = stepValue >= minPrice && stepValue <= maxPrice;

                                return (
                                    <div
                                        key={index}
                                        className={`w-full ${isInRange ? 'bg-pink-500' : 'bg-gray-300'}`}
                                        style={{ flex: '0 0 auto', width: '6.5px', marginRight: '1px', height: `${randomHeight}px` }}
                                    ></div>
                                );
                            })}
                        </div>
                        <div className="flex justify-between mt-2">
                            <span>${minPrice}</span>
                            <span>${maxPrice}+</span>
                        </div>
                        <div className=" relative mt-2 mb-[15px]">
                            <div className="absolute inset-0 bg-gray-300 h-1 rounded-full"></div>
                            <div
                                className="absolute bg-pink-500 h-1 rounded-full"
                                style={{
                                    left: `${((minPrice - 10) / 240) * 100}%`,
                                    right: `${100 - ((maxPrice - 10) / 240) * 100}%`,
                                }}
                            ></div>
                            <input
                                type="range"
                                className="absolute w-full slider-thumb text-rose-700 appearance-none bg-transparent z-10 pointer-events-auto"
                                min="10"
                                max="250"
                                value={minPrice}
                                onChange={(e) => handleRangeChange(e, 'min')}
                            />
                            <input
                                type="range"
                                className="absolute w-full slider-thumb2 appearance-none bg-transparent mt-[15px] z-10 pointer-events-auto"
                                min="10"
                                max="250"
                                value={maxPrice}
                                onChange={(e) => handleRangeChange(e, 'max')}
                            />
                        </div>
                    </div>

                    <div className="pt-[15px] mb-6 border-t-[2px] border-gray-300 border-b-[2px] pb-[28px] ">
                        <h3 className="font-medium">Beds and Bathrooms</h3>
                        <div className="flex justify-between items-center mt-2">
                            <span>Beds</span>
                            <div className="flex items-center">
                                <button className="p-[6px] border rounded-full shadow-md text-gray-700 hover:text-black"
                                    onClick={() => setBeds((prev) => (prev === 'Any' ? 0 : Math.max(0, prev - 1)))} >
                                    <AiOutlineMinus />
                                </button>
                                <span className="px-4">{beds}</span>

                                <button className="p-[6px] border rounded-full shadow-md text-gray-700 hover:text-black"
                                    onClick={() => setBeds((prev) => (prev === 'Any' ? 1 : prev + 1))}
                                >
                                    <AiOutlinePlus />
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-between items-center mt-2">
                            <span>Bathrooms</span>
                            <div className="flex items-center">
                                <button className="p-[6px] border rounded-full shadow-md text-gray-700 hover:text-black"
                                    onClick={() => setBathrooms((prev) => prev === 'Any' ? 0 : Math.max(0, prev - 1))} >
                                    <AiOutlineMinus />
                                </button>

                                <span className="px-4">{bathrooms}</span>

                                <button className="p-[6px] border rounded-full shadow-md text-gray-700 hover:text-black"
                                    onClick={() => setBathrooms((prev) => (prev === 'Any' ? 1 : prev + 1))} >
                                    <AiOutlinePlus />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Cayegory */}
                    <div className='mb-6'>
                        <div onClick={() => setIsCategoryModalOpen(true)} className='flex items-center mb-[20px]'>
                            <div className='text-[17px] text-rose-800 font-[600]'>Selected Category:</div>
                            <div className="bg-gradient-to-r text-[12px] ml-[20px] from-rose-600 to-rose-900 text-white px-[15px] py-[3px] rounded-lg">
                              {category || 'Select a category'}
                            </div>
                        </div>
                    </div>
                    {isCategoryModalOpen && (
                        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
                            <div className="bg-white w-[85vw] md:max-w-3xl h-[60vh] overflow-y-auto flex flex-col  no-scrollbar p-6 rounded-lg">
                                <button onClick={() => setIsCategoryModalOpen(false)} className="text-[28px] ml-auto text-gray-700 hover:text-gray-400" >
                                    <RiCloseFill />
                                </button>

                                <h3 className="text-xl sm:mt-[-20px] font-semibold text-center text-rose-600 mb-4">Select Category</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {categories.map((category) => (
                                        <div
                                            key={category.name}
                                            className="flex items-center px-4 py-[4px] border rounded-lg shadow-md cursor-pointer hover:bg-rose-100"
                                            onClick={() => handleCategoryClick(category.name)}
                                        >
                                            <category.icon className="text-[15px] text-rose-600 mb-[3px] mr-[8px]" />
                                            <span className="text-center whitespace-nowrap text-[17px] text-gray-700">{category.name}</span>
                                        </div>
                                    ))}
                                </div>

                            </div>
                        </div>
                    )}


                </div>

                <div className="flex justify-between items-center mt-6">
                    <button
                        className="text-gray-700 underline hover:text-black"
                        onClick={resetFilters}
                    >
                        Clear all
                    </button>
                    <button
                        className="bg-rose-700 flex items-center text-white font-[600] px-[15px] py-[3px] rounded-[20px] hover:bg-rose-900 duration-200"
                        onClick={logValues}
                    >
                       <MdSearch className="text-[20px] mt-[3px] mr-[3px]"/> Search
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default FiltersModal;