import { useEffect } from 'react';

const AboutUs = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className="font-sans w-full overflow-x-hidden pt-[80px] md:pt-[150px] text-gray-900">
            <header className="text-center  py-10  border-b border-gray-200">
                <h1 className="text-[55px] xl:scale-[1.5] space-y-[-15px] xl:text-[75px] font-bold">About <span className='text-rose-600'>Us</span></h1>
                <p className="mt-8 xl:mt-[55px] text-lg text-gray-600">
                    Learn more about our mission, values, and how we aim to make a difference.
                </p>
            </header>
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div>
                        <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                        <p className="text-gray-600 text-lg">
                            At our core, we believe in creating connections and fostering inclusivity. Our platform allows people to share their homes and unique experiences with travelers from all around the globe.
                        </p>
                    </div>
                    <div className="rounded-lg overflow-hidden shadow-md">
                        <img
                            src="https://a0.muscache.com/im/pictures/canvas/Canvas-1727390461611/original/1b918373-2070-41bd-a428-f8f96279f3a9.jpeg?im_w=240&im_format=avif%201x,%20https://a0.muscache.com/im/pictures/canvas/Canvas-1727390461611/original/1b918373-2070-41bd-a428-f8f96279f3a9.jpeg?im_w=480&im_format=avif%202x"
                            alt="Mission"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </section>

            <section className="bg-gray-100 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div className="rounded-lg overflow-hidden shadow-md">
                        <img
                            src="https://images.contentstack.io/v3/assets/bltec2ed8e3c4b1e16d/blt5912675266dfa56f/62619649b9aa584a4e327561/AC_Guests_HG_EN_S@3x.png"
                            alt="Values"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold mb-4">Our Values</h2>
                        <p className="text-gray-600 text-lg">
                            We strive to promote diversity, sustainability, and cultural exchange. We are committed to ensuring safety and accessibility for all our users.
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold mb-4">Meet the Team</h2>
                    <p className="text-gray-600 text-lg mb-8">
                        Behind every great experience, there’s a dedicated team working hard to make it happen.
                    </p>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="bg-white rounded-lg shadow-md p-6 text-center">
                            <img
                                src="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-016HLP_MVP%20Images-Test%20Delivery%2010_2_2024/original/645ccb2f-90cb-4ec0-9fd8-f2b4c0604864.jpeg"
                                alt="Team Member"
                                className="w-24 h-24 rounded-full mx-auto mb-4"
                            />
                            <h3 className="text-lg font-semibold">John Doe</h3>
                            <p className="text-gray-600 text-sm">CEO</p>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-6 text-center">
                            <img
                                src="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-016HLP_MVP%20Images-Test%20Delivery%2010_2_2024/original/29c78d98-4cf5-4afe-8ea3-a65eb520af76.jpeg"
                                alt="Team Member"
                                className="w-24 h-24 rounded-full mx-auto mb-4"
                            />
                            <h3 className="text-lg font-semibold">Jane Smith</h3>
                            <p className="text-gray-600 text-sm">CTO</p>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-6 text-center">
                            <img
                                src="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-016HLP_MVP%20Images-Test%20Delivery%2010_2_2024/original/332516e2-c531-4a35-a9e4-012f1477014a.jpeg"
                                alt="Team Member"
                                className="w-24 h-24 rounded-full mx-auto mb-4"
                            />
                            <h3 className="text-lg font-semibold">Alice Brown</h3>
                            <p className="text-gray-600 text-sm">COO</p>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-6 text-center">
                            <img
                                src="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-016HLP_MVP%20Images-Test%20Delivery%2010_2_2024/original/29c78d98-4cf5-4afe-8ea3-a65eb520af76.jpeg"
                                alt="Team Member"
                                className="w-24 h-24 rounded-full mx-auto mb-4"
                            />
                            <h3 className="text-lg font-semibold">Bob Johnson</h3>
                            <p className="text-gray-600 text-sm">CMO</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
