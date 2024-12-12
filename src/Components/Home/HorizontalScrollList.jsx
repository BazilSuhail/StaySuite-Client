import React from 'react';
import { categories } from '../Host/AddListings_Utility';


const HorizontalScrollList = ({ setCategory }) => {
    return (
        <div className='flex overflow-x-hidden pt-4 xl:w-[88vw] lg:px-[30px] xl:px-0 px-[15px] mx-auto relative'>
        <div className="flex bg-white overflow-x-auto gap-x-[35px] py-4 no-scrollbar relative">
            {categories.map((category, index) => (
                <div
                    key={index}
                    onClick={() => setCategory(category.name)}
                    className="flex cursor-pointer flex-col justify-center items-center hover:text-gray-800 text-gray-400 font-[600] transition duration-200"
                >
                    <category.icon className="text-[25px] mb-[3px]" />
                    <p className="text-center text-[12px]">{category.name}</p>
                </div>
            ))}
        </div>
        
        <div className="absolute top-0 right-0 h-full w-[90px] bg-gradient-to-l from-white via-white/30 to-transparent pointer-events-none" />
    </div>
    
    );
};

export default HorizontalScrollList;
