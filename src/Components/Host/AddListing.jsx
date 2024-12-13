import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { RiDeleteBinLine } from 'react-icons/ri';
import { FaRegImage, FaLink } from 'react-icons/fa';
import { RiCloseFill } from 'react-icons/ri';
import { categories } from './AddListings_Utility';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../AuthProvider';


const Step1 = ({ formData, handleChange, setCurrentStep }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCategoryClick = (category) => {
        handleChange({ target: { name: 'category', value: category } }); 
        setIsModalOpen(false);
    };

    return (
        <div>
            <h2 className="text-[18px] lg:text-xl text-rose-600 font-semibold mb-4">
                Enter Property's Info:
            </h2>
            <div>
                <label>Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full py-2 border-b border-gray-400 focus:outline-none mb-4"
                />
                <label>Description</label>
                <textarea
                    name="summary"
                    placeholder='Write a short Description about your property ...'
                    value={formData.summary}
                    onChange={handleChange}
                    className="w-full py-2 placeholder:text-[14px] appearance-none border-b border-gray-400 focus:outline-none mb-4"
                />
                <label>Property Type</label>
                <input
                    type="text"
                    name="property_type"
                    value={formData.property_type}
                    onChange={handleChange}
                    className="w-full py-2 border-b border-gray-400 focus:outline-none mb-4"
                />
                <div onClick={() => setIsModalOpen(true)} className='flex items-center mb-[20px]'>
                    <div className='text-[17px] text-rose-800 font-[600]'>Selected Category:</div>
                    <div className="bg-gradient-to-r text-[12px] ml-[20px] from-rose-600 to-rose-900 text-white px-[15px] py-[3px] rounded-lg">
                    {formData.category || 'Select a category'}
                    </div>
                </div>
               {
                /*
                 <label>Category</label>
                <div
                    className="w-full py-2 border-b border-gray-400 focus:outline-none mb-4 cursor-pointer text-gray-700"
                    onClick={() => setIsModalOpen(true)}
                >
                    {formData.category || 'Select a category'}
                </div>
                */
               }
            </div>

            {/* Modal for Categories */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white w-[85vw] md:max-w-3xl h-[70vh] overflow-y-auto flex flex-col  no-scrollbar p-6 rounded-lg">
                    <button
                            onClick={() => setIsModalOpen(false)}
                            className="text-[28px] ml-auto text-gray-700 hover:text-gray-400"
                        >
                            <RiCloseFill />
                        </button>
                        <h3 className="text-xl sm:mt-[-20px] font-semibold text-center mb-4">Choose a Category</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {categories.map((category) => (
                                <div
                                    key={category.name}
                                    className="flex items-center p-4 border rounded-lg shadow-md cursor-pointer hover:bg-rose-100"
                                    onClick={() => handleCategoryClick(category.name)}
                                >
                                    <category.icon className="text-[20px] text-rose-600 mb-[3px] mr-[8px]" />
                                    <span className="text-center whitespace-nowrap text-gray-700">{category.name}</span>
                                </div>
                            ))}
                        </div>
                      
                    </div>
                </div>
            )}

            <button
                onClick={() => setCurrentStep(2)}
                className="bg-gradient-to-r from-rose-600 to-rose-900 text-white ml-auto mt-[8px] px-[25px] py-[5px] rounded-lg"
            >
                Next
            </button>
        </div>
    );
};


const Step2 = ({ formData, handleChange, setCurrentStep }) => (
    <div>
        <h2 className="text-[18px] lg:text-xl text-rose-600 font-semibold mb-4">Enter Property Details:</h2>
        <label>Max Number Of Guests</label>
        <input
            type="number"
            name="maxGuests"
            value={formData.maxGuests}
            onChange={handleChange}
            className="w-full py-2 border-b border-gray-400 focus:outline-none mb-4"
        />
        <label>Bedrooms</label>
        <input
            type="number"
            name="bedrooms"
            value={formData.bedrooms}
            onChange={handleChange}
            className="w-full py-2 border-b border-gray-400 focus:outline-none mb-4"
        />
        <label>Bathrooms</label>
        <input
            type="number"
            name="bathrooms"
            value={formData.bathrooms}
            onChange={handleChange}
            className="w-full py-2 border-b border-gray-400 focus:outline-none mb-4"
        />
        <label>Price</label>
        <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full py-2 border-b border-gray-400 focus:outline-none mb-4"
        />
        <button
            onClick={() => setCurrentStep(1)}
            className="bg-gray-600 text-white mr-[10px] mt-auto ml-auto  px-[25px] py-[5px] rounded-lg"
        >
            Back
        </button>
        <button
            onClick={() => setCurrentStep(3)}
            className="bg-gradient-to-r from-rose-600 to-rose-900 text-white ml-auto mt-[8px] px-[25px] py-[5px] rounded-lg"
        >
            Next
        </button>
    </div>
);

const Step3 = ({ formData, handleChange, setCurrentStep }) => (
    <div>
        <h2 className="text-[18px] lg:text-xl text-rose-600 font-semibold mb-4">Enter Property's Address:</h2>
        <label>Street</label>
        <input
            type="text"
            name="address.street"
            value={formData.address.street}
            onChange={handleChange}
            className="w-full py-2 border-b border-gray-400 focus:outline-none mb-4"
        />
        <label>Suburb</label>
        <input
            type="text"
            name="address.suburb"
            value={formData.address.suburb}
            onChange={handleChange}
            className="w-full py-2 border-b border-gray-400 focus:outline-none mb-4"
        />
        <label>Country</label>
        <input
            type="text"
            name="address.country"
            value={formData.address.country}
            onChange={handleChange}
            className="w-full py-2 border-b border-gray-400 focus:outline-none mb-4"
        />
        <button
            onClick={() => setCurrentStep(2)}
            className="bg-gray-600 text-white mr-[10px] mt-auto ml-auto  px-[25px] py-[5px] rounded-lg"
        >
            Back
        </button>
        <button
            onClick={() => setCurrentStep(4)}
            className="bg-gradient-to-r from-rose-600 to-rose-900 text-white ml-auto mt-[8px] px-[25px] py-[5px] rounded-lg"
        >
            Next
        </button>
    </div>
);

const Step4 = ({ formData, setCurrentStep, handleAmenityChange, handleAmenityRemove, handleAmenityAdd }) => (
    <div className='lg:w-[750px] w-[350px] md:w-[450px]'>
        <h2 className="text-[18px] lg:text-xl text-rose-600 font-semibold mb-4">Enter Customer Rules and Guidelines</h2>
        {formData.amenities.map((amenity, index) => (
            <div key={index} className="flex items-center mb-2">
                <input
                    type="text"
                    value={amenity}
                    onChange={(e) => handleAmenityChange(index, e.target.value)}
                    className="w-[80%] lg:w-[77%] p-2 border-b border-gray-400"
                />
                <button
                    onClick={() => handleAmenityRemove(index)}
                    className="text-red-700 text-[15px] lg:text-[22px] mb-[-20px] ml-[15px]"
                >

                    <RiDeleteBinLine />
                </button>
            </div>
        ))}
        <button
            onClick={handleAmenityAdd}
            className="bg-green-700 text-[14px] mb-[12px] text-white ml-auto mt-[8px] px-[25px] py-[5px] rounded-lg"
        >
            Add Amenity
        </button>
        <br />
        <button
            onClick={() => setCurrentStep(3)}
            className="bg-gray-600 text-white mr-[10px] mt-auto ml-auto  px-[25px] py-[5px] rounded-lg"
        >
            Back
        </button>
        <button
            onClick={() => setCurrentStep(5)}
            className="bg-gradient-to-r from-rose-600 to-rose-900 text-white ml-auto mt-[8px] px-[25px] py-[5px] rounded-lg"
        >
            Next
        </button>
    </div>
);

const Step5 = ({ uploadMethod, setUploadMethod, setCurrentStep }) => (
    <div className="container lg:w-[630px] w-[335px] md:w-[450px]">
        <h2 className="text-[18px] lg:text-xl text-rose-600 font-semibold mb-4">
            Choose Image Upload Method:
        </h2>

        <div className="flex flex-col items-center justify-center">
            <label
                className={`flex items-center w-[325px] py-[25px] my-[25px] px-2 border-2 text-rose-900 font-[500] rounded-lg cursor-pointer ${uploadMethod === 'url' ? 'border-rose-600 bg-rose-100' : 'border-gray-300'
                    }`}
                onClick={() => setUploadMethod('url')}
            >
                <FaLink className="text-rose-600 mr-2" size={24} />
                <span>Upload Property Info via Image Links</span>
            </label>
            <label
                className={`flex items-center w-[325px] py-[25px]  px-2 border-2 text-rose-900 font-[500] rounded-lg cursor-pointer ${uploadMethod === 'file' ? 'border-rose-600 bg-rose-100' : 'border-gray-300'
                    }`}
                onClick={() => setUploadMethod('file')}
            >
                <FaRegImage className="text-rose-600 mr-2" size={24} />
                <span>Upload Property Info Via Image Files</span>
            </label>
        </div> 
        <button
            onClick={() => setCurrentStep(4)}
            className="bg-gray-600 mt-[45px] text-white mr-[10px] px-[25px] py-[5px] rounded-lg"
        >
            Back
        </button>
        <button
            onClick={() => setCurrentStep(uploadMethod === 'url' ? 6 : 8)}
            className="bg-gradient-to-r from-rose-600 to-rose-900 text-white ml-auto mt-[8px] px-[25px] py-[5px] rounded-lg"
        >
            Next
        </button>
    </div>
);

const Step6 = ({ formData, handleChange, setCurrentStep }) => (
    <div>
        <h2 className="text-[18px] lg:text-xl text-rose-600 font-semibold mb-4">Place Link for Place and Cover Image:</h2>
        <label>Place Picture</label>
        <input
            type="text"
            name="images.placePicture"
            placeholder='Enter image URL for Place Picture'
            value={formData.images.placePicture}
            onChange={handleChange}
            className="w-full py-2 border-b border-gray-400 focus:outline-none mb-4 placeholder:text-[14px]"
        />
        <label>Cover Picture</label>
        <input
            type="text"
            name="images.coverPicture"
            value={formData.images.coverPicture}
            onChange={handleChange}
            placeholder='Enter image URL for Cover Picture'
            className="w-full py-2 border-b border-gray-400 focus:outline-none mb-4 placeholder:text-[14px]"
        />
        <button
            onClick={() => setCurrentStep(5)}
            className="bg-gray-600 text-white mr-[10px] mt-auto ml-auto  px-[25px] py-[5px] rounded-lg"
        >
            Back
        </button>
        <button
            onClick={() => setCurrentStep(7)}
            className="bg-gradient-to-r from-rose-600 to-rose-900 text-white ml-auto mt-[8px] px-[25px] py-[5px] rounded-lg"
        >
            Next
        </button>
    </div>
);

const Step7 = ({ formData, setFormData, handleSubmit, setCurrentStep }) => (
    <div>
        <h2 className="text-[18px] lg:text-xl text-rose-600 font-semibold mb-4">Place Links Property Images:</h2>
        {formData.images.additionalPictures.map((url, index) => (
            <input
                key={index}
                type="text"
                value={url}
                placeholder={`Enter image URL for Image ${index + 1}`}
                onChange={(e) =>
                    setFormData((prevState) => {
                        const updatedPictures = [...prevState.images.additionalPictures];
                        updatedPictures[index] = e.target.value;
                        return {
                            ...prevState,
                            images: { ...prevState.images, additionalPictures: updatedPictures },
                        };
                    })
                }
                className="w-full p-2 border rounded mb-2 placeholder:text-[14px]"
            />
        ))}
        <p className=' mt-[15px]'></p>
        {formData.images.additionalPictures.length < 5 && (
            <button
                onClick={() =>
                    setFormData((prevState) => ({
                        ...prevState,
                        images: {
                            ...prevState.images,
                            additionalPictures: [...prevState.images.additionalPictures, ''],
                        },
                    }))
                }
                className="bg-gradient-to-r from-rose-600 to-rose-900 text-white ml-auto mt-[8px] px-[25px] py-[5px] rounded-lg"
            >
                Add Picture
            </button>
        )}
        <button
            onClick={() => setCurrentStep(6)}
            className="bg-gray-600 text-white mr-[10px] mt-auto ml-auto  px-[25px] py-[5px] rounded-lg"
        >
            Back
        </button>
        <button
            onClick={handleSubmit}
            className="bg-green-600 text-white mr-[10px] mt-auto ml-auto  px-[25px] py-[5px] rounded-lg"
        >
            Submit
        </button>
    </div>
);

const Step8 = ({ setFormData, setCurrentStep }) => {
    const [placeImage, setPlaceImage] = useState(null);
    const [coverImage, setCoverImage] = useState(null);

    const handleFileChange = (e, setImage) => {
        setImage(e.target.files[0]);
    };

    return (
        <div className='lg:w-[750px] w-[350px] md:w-[450px]'>
            <h2 className="text-[18px] lg:text-xl text-rose-600 font-semibold mb-4">Upload Place and Cover Image</h2>
            <label>Place Picture:</label>
            <br />
            <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, setPlaceImage)}
                className='my-[12px]  file:bg-rose-800 file:my-[2px] file:text-red-100 file:text-[15px] file:rounded-xl file:px-[15px] file:mr-[15px]'
            />
            <br />
            <label>Cover Picture:</label>
            <br />
            <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, setCoverImage)}
                className='mt-[15px]  file:bg-rose-800 file:my-[2px] file:text-red-100 file:text-[15px] file:rounded-xl file:px-[15px] file:mr-[15px]'
            />
            <br />
            <button
                onClick={() => setCurrentStep(5)}
                className="bg-gray-600 text-white mr-[10px] mt-[155px] px-[25px] py-[5px] rounded-lg"
            >
                Back
            </button>
            <button
                onClick={() => {
                    setFormData((prev) => ({ ...prev, placeImage, coverImage }));
                    setCurrentStep(9);
                }}
                className="bg-gradient-to-r from-rose-600 to-rose-900 text-white ml-auto mt-[8px] px-[25px] py-[5px] rounded-lg"
            >
                Next
            </button>
        </div>
    );
};

const Step9 = ({ setFormData, handleFileSubmit, setCurrentStep }) => {
    const [additionalImages, setAdditionalImages] = useState([null, null, null, null, null]);

    const handleFileChange = (index, file) => {
        const updatedImages = [...additionalImages];
        updatedImages[index] = file;
        setAdditionalImages(updatedImages);
    };

    return (
        <div className='lg:w-[750px] w-[350px] md:w-[450px]'>
            <h2 className="text-[18px] lg:text-xl text-rose-600 font-semibold mb-6">Upload Additional Images</h2>
            {additionalImages.map((_, index) => (
                <div key={index} className="mb-4 flex ">
                    <label className="block text-gray-700 font-medium mb-2">
                        Image {index + 1}:
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(index, e.target.files[0])}
                        className='ml-[15px]  file:bg-rose-800 file:my-[2px] file:text-red-100 file:text-[13px] file:rounded-xl file:px-[15px] file:mr-[15px]'
                    />
                </div>
            ))}
            <button
                onClick={() => setCurrentStep(8)}
                className="bg-gray-600 text-white mr-[10px] mt-[55px] px-[25px] py-[5px] rounded-lg"
            >
                Back
            </button>
            <button
                onClick={() => {
                    setFormData((prev) => ({ ...prev, additionalImages }));
                    handleFileSubmit();
                }}
                className="bg-green-600 text-white mr-[10px] mt-auto ml-auto px-[25px] py-[5px] rounded-lg"
            >
                Submit
            </button>
        </div>
    );
};


const AddListing = () => {
  const navigate = useNavigate();
    const { showToast } = useAuthContext();
    const [formData, setFormData] = useState({
        name: '',
        summary: '',
        property_type: '',
        maxGuests: 2,
        bedrooms: 1,
        bathrooms: 1,
        category: 'Apartment',
        price: 100,
        address: { street: '', suburb: '', country: '' },
        amenities: [''],
        images: { placePicture: '', coverPicture: '', additionalPictures: ['', '', '', '', ''] },
    });

    const [currentStep, setCurrentStep] = useState(1);

    const [uploadMethod, setUploadMethod] = useState('url');
    const [files, setFiles] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevState) => {
            if (name.includes('address.')) {
                const field = name.split('.')[1];
                return {
                    ...prevState,
                    address: { ...prevState.address, [field]: value },
                };
            }
            else if (name.includes('images.')) {
                const field = name.split('.')[1];
                return {
                    ...prevState,
                    images: { ...prevState.images, [field]: value },
                };
            }
            else {
                return { ...prevState, [name]: value };
            }
        });
    };


    const handleAmenityAdd = () => {
        setFormData((prevState) => {
            if (prevState.amenities.length >= 5) {
                alert('You can only add up to 5 amenities.');
                return prevState;
            }
            return {
                ...prevState,
                amenities: [...prevState.amenities, ''],
            };
        });
    };


    const handleAmenityChange = (index, value) => {
        const updatedAmenities = [...formData.amenities];
        updatedAmenities[index] = value;
        setFormData((prevState) => ({
            ...prevState,
            amenities: updatedAmenities,
        }));
    };

    const handleAmenityRemove = (index) => {
        const updatedAmenities = formData.amenities.filter((_, i) => i !== index);
        setFormData((prevState) => ({
            ...prevState,
            amenities: updatedAmenities,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/hosting/add-listing`,
                formData,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            //alert(response.data.message);
            navigate("/host-listing");
            showToast(response.data.message);
        }
        catch (error) {
            console.error(error);
            alert('Error adding listing');
        }
    };

    const handleFileChange = (e) => {
        setFiles([...e.target.files]);
    };

    const handleFileSubmit = async () => {
        if (!formData.placeImage || !formData.coverImage || formData.additionalImages.length === 0) {
            alert('Please upload all required images');
            return;
        }

        const formDataToSend = new FormData();

        formDataToSend.append('name', formData.name);
        formDataToSend.append('summary', formData.summary);
        formDataToSend.append('category', formData.category);
        formDataToSend.append('property_type', formData.property_type); 
        formDataToSend.append('maxGuests', formData.maxGuests);
        formDataToSend.append('bedrooms', formData.bedrooms);
        formDataToSend.append('bathrooms', formData.bathrooms);
        formDataToSend.append('price', formData.price);
        formDataToSend.append('address[street]', formData.address.street);
        formDataToSend.append('address[suburb]', formData.address.suburb);
        formDataToSend.append('address[country]', formData.address.country);
        formDataToSend.append('amenities', JSON.stringify(formData.amenities));

        formDataToSend.append('placeImage', formData.placeImage);
        formDataToSend.append('coverImage', formData.coverImage);
        formData.additionalImages.forEach((image, index) => {
            formDataToSend.append(`additionalImages`, image);
        });

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/hosting/add-listing-with-images`,
                formDataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            navigate("/host-listing");
            showToast(response.data.message);
            //alert(response.data.message);
        }
        catch (error) {
            console.error('Error submitting listing with images:', error);
            alert('Failed to submit the listing. Please try again.');
        }
    };


    return (
        <main className='bg-gray-100 p-4 min-h-screen flex flex-col justify-center items-center pt-[100px] w-full h-full'>
            <div className='max-w-2xl'>
                <h3 className='text-[38px] text-rose-600 font-[700] text-center'>Add Listing</h3>
                <p className="text-rose-900 mb-[20px] font-[600] px-[25px] lg:px-[85px]  text-center text-[13px]">
                    Create your property listing by providing all the necessary details with accurate information to attract potential guests, include captivating descriptions, amenities, and high-quality images to make your listing stand out.
                </p>

            </div>
            <div className="max-w-2xl overflow-hidden p-6 h-[460px] bg-white shadow border rounded-[25px]">
                {currentStep === 1 && <Step1 formData={formData} handleChange={handleChange} setCurrentStep={setCurrentStep} />}
                {currentStep === 2 && <Step2 formData={formData} handleChange={handleChange} setCurrentStep={setCurrentStep} />}
                {currentStep === 3 && <Step3 formData={formData} handleChange={handleChange} setCurrentStep={setCurrentStep} />}
                {currentStep === 4 && <Step4 formData={formData} setCurrentStep={setCurrentStep} handleAmenityChange={handleAmenityChange} handleAmenityRemove={handleAmenityRemove} handleAmenityAdd={handleAmenityAdd} />}
                {currentStep === 5 && (
                    <Step5
                        uploadMethod={uploadMethod}
                        setUploadMethod={setUploadMethod}
                        setCurrentStep={setCurrentStep}
                    />
                )}
                {uploadMethod === 'url' && currentStep === 6 && (
                    <Step6 formData={formData} handleChange={handleChange} setCurrentStep={setCurrentStep} setFormData={setFormData} />
                )}
                {uploadMethod === 'url' && currentStep === 7 && (
                    <Step7 formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} setCurrentStep={setCurrentStep} />
                )}
                {uploadMethod === 'file' && currentStep === 8 && (
                    <Step8 handleFileChange={handleFileChange} setFormData={setFormData} setCurrentStep={setCurrentStep} />
                )}
                {uploadMethod === 'file' && currentStep === 9 && (
                    <Step9 handleFileSubmit={handleFileSubmit} setFormData={setFormData} setCurrentStep={setCurrentStep} />
                )}
            </div>
        </main>
    );
};

export default AddListing;

/*import React, { useState } from 'react';
import axios from 'axios';

const AddListing = () => {
    const [formData, setFormData] = useState({
        name: '',
        summary: '',
        property_type: '',
        bedrooms: 0,
        bathrooms: 0,
        price: 0,
        address: { street: '', suburb: '', country: '' },
        amenities: [],
        images: { placePicture: '', coverPicture: '', additionalPictures: [] },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.includes('address.')) {
            const field = name.split('.')[1];
            setFormData((prevState) => ({
                ...prevState,
                address: { ...prevState.address, [field]: value },
            }));
        } else if (name.includes('images.')) {
            const field = name.split('.')[1];
            setFormData((prevState) => ({
                ...prevState,
                images: { ...prevState.images, [field]: value },
            }));
        } else {
            setFormData((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    const handleAmenityAdd = () => {
        setFormData((prevState) => ({
            ...prevState,
            amenities: [...prevState.amenities, ''], // Add an empty amenity field
        }));
    };

    const handleAmenityChange = (index, value) => {
        const updatedAmenities = [...formData.amenities];
        updatedAmenities[index] = value;
        setFormData((prevState) => ({
            ...prevState,
            amenities: updatedAmenities,
        }));
    };

    const handleAmenityRemove = (index) => {
        const updatedAmenities = formData.amenities.filter((_, i) => i !== index);
        setFormData((prevState) => ({
            ...prevState,
            amenities: updatedAmenities,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/hosting/add-listing`,
                formData,
                { headers: { Authorization: `Bearer ${token}` }, }
            ); 
            alert(response.data.message); // Alert on success
        } catch (error) {
            console.error(error);
            alert('Error adding listing');
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Add Listing</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-600 mb-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 mb-1">Summary</label>
                        <textarea
                            name="summary"
                            value={formData.summary}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 mb-1">Property Type</label>
                        <input
                            type="text"
                            name="property_type"
                            value={formData.property_type}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 mb-1">Bedrooms</label>
                        <input
                            type="number"
                            name="bedrooms"
                            value={formData.bedrooms}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 mb-1">Bathrooms</label>
                        <input
                            type="number"
                            name="bathrooms"
                            value={formData.bathrooms}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 mb-1">Price</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-gray-600 mb-1">Street</label>
                    <input
                        type="text"
                        name="address.street"
                        value={formData.address.street}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-gray-600 mb-1">Suburb</label>
                    <input
                        type="text"
                        name="address.suburb"
                        value={formData.address.suburb}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-gray-600 mb-1">Country</label>
                    <input
                        type="text"
                        name="address.country"
                        value={formData.address.country}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-gray-600 mb-1">Amenities</label>
                    {formData.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center space-x-2 mb-2">
                            <input
                                type="text"
                                value={amenity}
                                onChange={(e) => handleAmenityChange(index, e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="button"
                                onClick={() => handleAmenityRemove(index)}
                                className="text-red-500 hover:text-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={handleAmenityAdd}
                        className="mt-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 focus:outline-none"
                    >
                        Add Amenity
                    </button>
                </div>

                <div>
                    <label className="block text-gray-600 mb-1">Place Picture URL</label>
                    <input
                        type="text"
                        name="images.placePicture"
                        value={formData.images.placePicture}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-gray-600 mb-1">Cover Picture URL</label>
                    <input
                        type="text"
                        name="images.coverPicture"
                        value={formData.images.coverPicture}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-gray-600 mb-1">Additional Pictures (Up to 5 URLs)</label>
                    {formData.images.additionalPictures.map((url, index) => (
                        <input
                            key={index}
                            type="text"
                            value={url}
                            onChange={(e) =>
                                setFormData((prevState) => {
                                    const updatedPictures = [...prevState.images.additionalPictures];
                                    updatedPictures[index] = e.target.value; // Update the specific index
                                    return {
                                        ...prevState,
                                        images: {
                                            ...prevState.images,
                                            additionalPictures: updatedPictures,
                                        },
                                    };
                                })
                            }
                            className="w-full p-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    ))}
                    {formData.images.additionalPictures.length < 5 && (
                        <button
                            type="button"
                            onClick={() =>
                                setFormData((prevState) => ({
                                    ...prevState,
                                    images: {
                                        ...prevState.images,
                                        additionalPictures: [...prevState.images.additionalPictures, ''], // Add a new empty input
                                    },
                                }))
                            }
                            className="mt-2 px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        >
                            Add Picture
                        </button>
                    )}
                </div>


                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Add Listing
                </button>
            </form>
        </div>
    );
};

export default AddListing;
*/