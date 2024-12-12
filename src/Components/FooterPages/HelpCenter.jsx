import { useEffect } from 'react';
import { FaQuestionCircle, FaSearch, FaHome, FaUsers, FaCog } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const HelpCenter = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
  return (
    <div className="font-sans w-full overflow-x-hidden pt-[120px] text-gray-900"> 
     
      <header className="text-center  py-10  border-b border-gray-200">
                <h1 className="text-[55px] xl:scale-[1.5] space-y-[-15px] xl:text-[75px] font-bold">Help <span className='text-rose-600'>Centre</span></h1>
                <p className="mt-8 xl:mt-[55px] text-lg text-gray-600">
                Find answers to your questions and learn how to make the most of our platform.
                </p>
            </header>
 
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center bg-gray-100 rounded-lg p-4 shadow-md">
          <FaSearch className="text-gray-500 text-xl mr-3" />
          <input
            type="text"
            placeholder="Search for answers"
            className="flex-grow bg-transparent outline-none text-gray-700"
          />
        </div>
      </section>
  
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 py-12"> 
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <FaQuestionCircle className="text-blue-600 text-4xl mx-auto mb-4" />
            <h2 className="text-xl font-semibold">FAQs</h2>
            <p className="mt-2 text-gray-600 mb-[18px]">
              Browse through frequently asked questions to find what you need.
            </p>
            <Link to="https://www.airbnb.com/help/article/1376" target='_blank' className="bg-rose-700 text-white py-2 px-4 rounded hover:bg-blue-700">
              View FAQs
            </Link>
          </div>
  
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <FaUsers className="text-green-600 text-4xl mx-auto mb-4" />
            <h2 className="text-xl font-semibold">Account Support</h2>
            <p className="mt-2 text-gray-600 mb-[18px]">
              Need help with your account? We've got you covered.
            </p>
            <Link to="https://www.airbnb.com/help/article/1376" target='_blank' className="bg-rose-700  text-white py-2 px-4 rounded hover:bg-green-700">
              Get Support
            </Link>
          </div>
 
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <FaHome className="text-purple-600 text-4xl mx-auto mb-4" />
            <h2 className="text-xl font-semibold">Hosting Help</h2>
            <p className="mt-2 text-gray-600 mb-[18px]">
              Learn how to host and manage your listings effectively.
            </p>
            <Link to="https://www.airbnb.com/help/article/1376" target='_blank' className="bg-rose-700 0 text-white py-2 px-4 rounded hover:bg-purple-700">
              Learn More
            </Link>
          </div>
 
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <FaCog className="text-red-600 text-4xl mx-auto mb-4" />
            <h2 className="text-xl font-semibold">Safety Information</h2>
            <p className="mt-2 text-gray-600 mb-[18px]">
              Stay informed about safety tips and guidelines.
            </p>
            <Link to="https://www.airbnb.com/help/article/1376" target='_blank' className="bg-rose-700 text-white py-2 px-4 rounded hover:bg-red-700">
              Read Safety Tips
            </Link>
          </div>
 
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <FaUsers className="text-yellow-600 text-4xl mx-auto mb-4" />
            <h2 className="text-xl font-semibold">Community Guidelines</h2>
            <p className="mt-2 text-gray-600  mb-[18px]">
              Understand our rules to foster a safe community.
            </p>
            <Link to="https://www.airbnb.com/help/article/1376" target='_blank' className="bg-rose-700 0 text-white py-2 px-4 rounded hover:bg-yellow-700">
              View Guidelines
            </Link>
          </div>
 
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <FaCog className="text-teal-600 text-4xl mx-auto mb-4" />
            <h2 className="text-xl font-semibold">Technical Support</h2>
            <p className="mt-2 text-gray-600 mb-[18px]">
              Facing issues? Let us help you resolve them.
            </p>
            <Link to="https://www.airbnb.com/help/article/1376" target='_blank' className="bg-rose-700 text-white py-2 px-4 rounded hover:bg-teal-700">
              Get Help
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HelpCenter;
