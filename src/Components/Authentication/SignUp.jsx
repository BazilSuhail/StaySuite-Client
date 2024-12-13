import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AiOutlineLock, AiOutlineMail } from 'react-icons/ai';
import collaboratorLogo from "../../logo.svg";
import { useNavigate } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import { FaUserCircle } from 'react-icons/fa';
import { useAuthContext } from '../../AuthProvider';

const SignUpForm = () => {
  const { showToast} = useAuthContext();
  const navigate = useNavigate();
  const [focusField, setFocusField] = useState('');
    const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'Guest',
  });

  const { email, password, fullName } = formData;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    //const { name, value, type, checked } = e.target;
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    /*if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked ? value : 'Guest' });
    } else {
      setFormData({ ...formData, [name]: value });
    }*/
  };

  const handleRoleChange = (role) => {
    setFormData((prev) => ({ ...prev, role }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/auth/register`, formData);
      //alert('Registration successful!');
      showToast("Registration successfull! 😇");
      navigate('/signIn');
    }
    catch (error) {
      console.error(error);
      setLoading(false);
      //alert('Registration failed!' + error.response.data.error);
      showToast('Registration failed! ' + error.response.data.error);
    }
  };
  const handleFocus = (field) => {
    setFocusField(field);
  };

  const handleBlur = () => {
    setFocusField('');
  };
  
  if (loading) {
    return <div className="bg-white w-full min-h-screen flex justify-center items-center">
      <div>
        <div className="animate-spin"><div className="lg:scale-[0.7] scale-[0.65] custom-loader"></div></div>
        <p className='text-[14px] text-rose-700 font-[700]'>Registering Your Account In ...</p>
        <p className='text-[14px] text-rose-500 font-[600]'>Please Wait</p>
      </div>
    </div>;
  }

  return (
    <main className='h-screen w-full pt-[75px] flex justify-center items-center bg-gray-100'>
      <div className='flex flex-col w-[90%] md:w-[500px] md:scale-[1] scale-[0.9]'>

        <div className="scale-[1.2] flex mx-auto">
          <img src={collaboratorLogo} alt="Connection Failed" className="w-[34px] h-[30px] mt-[4px]" />
          <div className="text-rose-600 ml-[4px] md:text-[25px] text-[25px] font-[700]">Air<span className='text-red-400'>BnB</span></div>
        </div>
        <p className='text-[15px] mb-[15px] text-center mt-[8px] text-gray-500 font-[400]'>Stay, Host, Explore. To start your adventure <span className='text-rose-700 font-[600]'>Register Now !!</span></p>

        <div className='py-[35px] px-[25px] flex flex-col bg-white rounded-xl'>
          <form onSubmit={handleSubmit} className='lg:px-[15px]'>

            {/*<div className="mb-4">
            <p className="text-sm font-medium text-gray-600 mb-2">
              How would you like to continue?
            </p>
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                id="guestRole"
                name="role"
                value="Guest"
                checked={formData.role === 'Guest'}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="guestRole" className="text-sm text-gray-600">
                As a Guest
              </label>
            </div>
  
            <div className="flex items-center">
              <input
                type="checkbox"
                id="hostRole"
                name="role"
                value="Host"
                checked={formData.role === 'Host'}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="hostRole" className="text-sm text-gray-600">
                As a Host
              </label>
            </div>
          </div>*/}

            <div className="flex mb-[8px] justify-center space-x-4">
              <label className={`flex items-center w-[50%] text-rose-600 space-x-2 p-2 border-2 rounded-lg cursor-pointer ${formData.role === 'Guest' ? 'border-rose-600 bg-rose-100' : 'border-gray-300'}`}
                onClick={() => handleRoleChange('Guest')}
              >
                <FaUserCircle size={22} />
                <span className='text-rose-950 text-[17px]'>Guest</span>
              </label>
              <label className={`flex items-center w-[50%] text-rose-600 space-x-2 p-2 border-2 rounded-lg cursor-pointer ${formData.role === 'Host' ? 'border-rose-600 bg-rose-100' : 'border-gray-300'}`}
                onClick={() => handleRoleChange('Host')}
              >
                <FaUserCircle size={22} />
                <span className='text-rose-950 text-[17px]'>Host</span>
              </label>
            </div>

            <div className="relative mt-[25px] mb-6 flex items-center">
              <div className="bg-rose-700 mr-2 rounded-full flex items-center justify-center w-[40px] h-[40px]">
                <CgProfile className="text-gray-50 text-[22px]" />
              </div>

              <div className="flex-1">
                <label htmlFor="fullName" className={`absolute left-12 text-gray-900 font-[600] text-[16px] transition-all duration-300 ${focusField === 'fullName' || fullName ? '-top-5 text-sm' : 'top-2'}`}>
                  Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  onFocus={() => handleFocus('fullName')}
                  onBlur={handleBlur}
                  className="w-full py-3 bg-transparent text-gray-700 border-b-[2px] border-rose-800  focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="relative mt-4 mb-6 flex items-center">
              <div className="bg-rose-700 mr-2 rounded-full flex items-center justify-center w-[40px] h-[40px]">
                <AiOutlineMail className="text-gray-50 text-[22px]" />
              </div>

              <div className="flex-1">
                <label htmlFor="email" className={`absolute left-12 text-gray-900 font-[600] text-[16px] transition-all duration-300 ${focusField === 'email' || email ? '-top-5 text-sm' : 'top-2'}`}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => handleFocus('email')}
                  onBlur={handleBlur}
                  className="w-full py-3 bg-transparent text-gray-700 border-b-[2px] border-rose-800  focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="relative mt-4 mb-6 flex items-center">
              <div className="bg-rose-700 mr-2 rounded-full flex items-center justify-center w-[40px] h-[40px]">
                <AiOutlineLock className="text-gray-50 text-[22px]" />
              </div>
              <div className="flex-1">
                <label htmlFor="password" className={`absolute left-12 text-gray-900 font-[600] text-[16px] transition-all duration-300 ${focusField === 'password' || password ? '-top-5 text-sm' : 'top-2'}`}>
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => handleFocus('password')}
                  onBlur={handleBlur}
                  className="w-full py-3 bg-transparent text-gray-700 border-b-[2px] border-rose-800 focus:outline-none"
                  required
                />
              </div>
            </div>

            <button type="submit" className="hover:text-blue-100 hover:bg-blue-950 w-full my-[15px] bg-gradient-to-r from-pink-800 via-rose-700 to-pink-800 rounded-lg text-white font-[500] py-[12px] transition duration-300">
              Sign Up
            </button>

            {/* <p onClick={() => setIsModalOpen(true)} className='text-blue-600 underline mb-[8px] text-[15px] font-[600]'>Forgot Password</p> */}
          </form>
          <div className='w-full flex px-[12px] md:px-[19px]  items-center space-x-2'>
            <div className='w-[47%] h-[2px] bg-[#c5c5c5]'></div>
            <p className='text-gray-500 w-[4%] text-[14px]'>OR</p>
            <div className='w-[47%] h-[2px] bg-[#c5c5c5]'></div>
          </div>

          <p className='mx-auto cursor-pointer mt-[18px] text-gray-500 font-medium'>Already Have An Account?<span onClick={() => navigate("/signIn")} className='text-rose-700 ml-[8px] underline'>Sign In</span></p>

        </div>

      </div>
    </main>
  );
};

export default SignUpForm;
