import React, { useEffect } from 'react';

const TrustAndSafetyPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="font-sans w-full overflow-x-hidden pt-[80px] md:pt-[120px] px-[15px] text-gray-900">
      <header className="text-center py-10 border-b border-gray-200">
        <h1 className="text-[55px] xl:scale-[1.5] space-y-[-15px] xl:text-[75px] font-bold">
          Trust and Safety at <p className='text-rose-600 mt-[-8px] xl:mt-[-25px]'>AirBnB</p>
        </h1>
        <p className="mt-8 xl:mt-[55px] text-lg text-gray-600">
          Our commitment to your safety and security.
        </p>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="grid lg:grid-cols-2 gap-8 py-12 items-center">
          <div>
            <h2 className="text-[35px] font-[700]">Verified Hosts and Guests</h2>
            <p className="mt-4 text-gray-600">
              We prioritize trust by verifying the identities of hosts and guests through a robust process, ensuring secure experiences for all users.
            </p>
          </div>
          <div className="flex justify-center">
            <img
              src="https://a0.muscache.com/im/pictures/a78b22a2-e081-4fa4-a7f2-e756d9699801.jpg?im_w=320&im_format=avif"
              alt="Verified Hosts and Guests"
              className="rounded-lg shadow-lg"
            />
          </div>
        </section>

        <section className="grid lg:grid-cols-2 gap-8 py-12 items-center">
          <div className="flex justify-center order-2 lg:order-1">
            <img
              src="https://a0.muscache.com/im/pictures/00069029-9307-48b4-8837-6f18e39a4913.jpg"
              alt="24/7 Support"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-[35px] font-[700]">24/7 Support</h2>
            <p className="mt-4 text-gray-600">
              Our global support team is available around the clock to address your concerns and ensure a seamless travel experience.
            </p>
          </div>
        </section>

        <section className="grid lg:grid-cols-2 gap-8 py-12 items-center">
          <div>
            <h2 className="text-[35px] font-[700]">Community Standards</h2>
            <p className="mt-4 text-gray-600">
              Our community guidelines foster respect and inclusivity, ensuring that everyone feels safe and welcome.
            </p>
          </div>
          <div className="flex justify-center">
            <img
              src="https://a0.muscache.com/im/pictures/7b03a67c-eab4-429c-8764-e691f9ef3ad9.jpg?im_w=320&im_format=avif"
              alt="Community Standards"
              className="rounded-lg shadow-lg"
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default TrustAndSafetyPage;
