import { useEffect } from 'react';

const AccessibilityPage = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className="font-sans w-full overflow-x-hidden  pt-[80px] md::pt-[120px] px-[15px] text-gray-900">
            <header className="text-center  py-10  border-b border-gray-200">
                <h1 className="text-[55px] xl:scale-[1.5] space-y-[-15px] xl:text-[75px] font-bold">Accessibility at <p className='text-rose-600 mt-[-8px] xl:mt-[-25px]'>AirBnB</p></h1>
                <p className="mt-8 xl:mt-[55px] text-lg text-gray-600">
                    Here's how we're making it easier to travel with us.
                </p>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <section className="grid lg:grid-cols-2 gap-8 py-12 items-center">
                    <div>
                        <h2 className="text-[35px] font-[700]">The Adapted Category</h2>
                        <p className="mt-4 text-gray-600">
                            Discover unique homes with verified accessibility features including
                            step-free paths into the home, bedroom, and bathroom. Each home in this
                            category receives a detailed 3D scan to confirm its accessibility
                            features and display key details like doorway widths.
                        </p>
                        <button className="mt-6 bg-rose-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                            Start exploring
                        </button>
                    </div>
                    <div className="flex justify-center">
                        <img
                            src="https://a0.muscache.com/im/pictures/c6c39c3e-baa0-491b-9953-c2e68ebf9a40.jpg?im_w=480"
                            alt="Adapted category"
                            className="rounded-lg shadow-lg"
                        />
                    </div>
                </section>

                <section className="grid lg:grid-cols-2 gap-8 py-12 items-center">
                    <div className="flex justify-center order-2 lg:order-1">
                        <img
                            src="https://a0.muscache.com/im/pictures/76a9086d-f142-4170-924f-f0d9f84834ee.jpg?im_w=480"
                            alt="Search filters"
                            className="rounded-lg shadow-lg"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-[35px] font-[700]">Enhanced search filters</h2>
                        <p className="mt-4 text-gray-600">
                            products that everyone can use. These teams work with engineers, designers, and others across the company to help ensure that our products are built with accessibility in mind.
                        </p>
                    </div>
                </section>

                <section className="grid lg:grid-cols-2 gap-8 py-12 items-center">
                    <div>
                        <h2 className="text-[35px] font-[700]">Accessibility review</h2>
                        <p className="mt-4 text-gray-600">
                            We’re working toward the digital accessibility standards laid out by the Web Content Accessibility Guidelines. We are also investing in automated testing tools to help us catch more issues.
                        </p>
                    </div>
                    <div className="flex justify-center">
                        <img
                            src="https://a0.muscache.com/im/pictures/c6c39c3e-baa0-491b-9953-c2e68ebf9a40.jpg?im_w=480"
                            alt="Accessibility review"
                            className="rounded-lg shadow-lg"
                        />
                    </div>
                </section>
            </main>
        </div>
    );
};

export default AccessibilityPage;
