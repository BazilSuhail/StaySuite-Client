import { useEffect } from 'react';
import { FaShieldAlt, FaLock, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { motion } from 'framer-motion';

const headingVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="font-sans w-full overflow-x-hidden pt-[80px] md::pt-[120px] px-[15px] text-gray-900">
      <header className="text-center  py-10  border-b border-gray-200">
        <h1 className="text-[55px] xl:scale-[1.5] space-y-[-15px] xl:text-[75px] font-bold">Privacy <span className='text-rose-600'>Policy</span></h1>

      </header>
      <div className='max-w-4xl mx-auto  p-6'>
 
        <motion.p
          className='text-base text-rose-800 mb-8 leading-relaxed'
          variants={textVariants}
          initial='hidden'
          animate='visible'
        >
          At Airbnb, we value your trust and are committed to safeguarding your personal information. This document outlines how we handle and protect your data to ensure a secure and seamless experience for all our guests and hosts.
        </motion.p>

        <section className='mb-10'>
          <motion.h2
            className='text-2xl font-medium text-rose-700 mb-4'
            variants={headingVariants}
            initial='hidden'
            animate='visible'
            transition={{ delay: 0.2 }}
          >
            <FaShieldAlt className='inline mr-2 text-coral-500' />
            Data Protection Measures
          </motion.h2>
          <motion.p
            variants={textVariants}
            initial='hidden'
            animate='visible'
            transition={{ delay: 0.4 }}
            className='text-rose-600 leading-relaxed'
          >
            Airbnb employs cutting-edge security protocols to prevent unauthorized access and protect your data. Our robust systems ensure the confidentiality of your information, providing peace of mind while using our platform.
          </motion.p>
        </section>

        <section className='mb-10'>
          <motion.h2
            className='text-2xl font-medium text-rose-700 mb-4'
            variants={headingVariants}
            initial='hidden'
            animate='visible'
            transition={{ delay: 0.6 }}
          >
            <FaLock className='inline mr-2 text-coral-500' />
            Secure Transactions
          </motion.h2>
          <motion.p
            variants={textVariants}
            initial='hidden'
            animate='visible'
            transition={{ delay: 0.8 }}
            className='text-rose-600 leading-relaxed'
          >
            Your financial security is our priority. Transactions on Airbnb are encrypted with the latest technology, ensuring your payment details remain safe and secure. We do not store sensitive payment information.
          </motion.p>
        </section>

        <section className='mb-10'>
          <motion.h2
            className='text-2xl font-medium text-rose-700 mb-4'
            variants={headingVariants}
            initial='hidden'
            animate='visible'
            transition={{ delay: 1.0 }}
          >
            <FaCheckCircle className='inline mr-2 text-coral-500' />
            Regulatory Compliance
          </motion.h2>
          <motion.p
            variants={textVariants}
            initial='hidden'
            animate='visible'
            transition={{ delay: 1.2 }}
            className='text-rose-600 leading-relaxed'
          >
            Airbnb strictly complies with global data protection laws, including GDPR and CCPA. We regularly update our policies to align with evolving regulations, ensuring your rights are always upheld.
          </motion.p>
        </section>

        <section className='mb-10'>
          <motion.h2
            className='text-2xl font-medium text-rose-700 mb-4'
            variants={headingVariants}
            initial='hidden'
            animate='visible'
            transition={{ delay: 1.4 }}
          >
            <FaExclamationTriangle className='inline mr-2 text-coral-500' />
            Reporting Issues
          </motion.h2>
          <motion.p
            variants={textVariants}
            initial='hidden'
            animate='visible'
            transition={{ delay: 1.6 }}
            className='text-rose-600 leading-relaxed'
          >
            If you suspect a data breach or encounter any security concerns, contact Airbnb immediately. Our dedicated team will address your concerns promptly to ensure the safety of your data and your trust in our platform.
          </motion.p>
        </section>

        <section>
          <motion.h2
            className='text-2xl font-medium text-rose-700 mb-4'
            variants={headingVariants}
            initial='hidden'
            animate='visible'
            transition={{ delay: 1.8 }}
          >
            <FaShieldAlt className='inline mr-2 text-coral-500' />
            Contact Airbnb
          </motion.h2>
          <motion.p
            variants={textVariants}
            initial='hidden'
            animate='visible'
            transition={{ delay: 2.0 }}
            className='text-rose-600 leading-relaxed'
          >
            For any questions about our privacy practices, reach out to us at <a href="mailto:privacy@airbnb.com" className='text-coral-500 underline'>privacy@airbnb.com</a>. Your concerns are our priority, and we’re here to help.
          </motion.p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;