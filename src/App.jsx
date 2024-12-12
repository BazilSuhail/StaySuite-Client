import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './assets/Navbar';
import Home from './Components/Home/Home';
import Footer from './assets/Footer';
import ListingDetails from './Components/Home/ListingDetails';
import SearchListings from './Components/Home/SearchListings';
import Booking from './Components/GuestBooking/Booking';
import SignUpForm from './Components/Authentication/SignUp';
import SignInnForm from './Components/Authentication/SignIn';
import Profile from './Components/Authentication/Profile';
import AddListing from './Components/Host/AddListing';
import HostedListings from './Components/Host/HostedListings';
import EditListing from './Components/Host/EditListing';
import GuestBookings from './Components/GuestBooking/GetBookings';
import HostBookings from './Components/Host/HostBookings';
import FinalizeBooking from './Components/GuestBooking/FinalizeBooking';
import FavoriteListings from './Components/Authentication/FavoriteListings'; 
import GuestNotifications from './Components/Notifications/Guest_Notifications';
import HostNotifications from './Components/Notifications/Host_Notifications';
import PrivacyPolicy from './Components/FooterPages/PrivacyPolicy';
import FAQPage from './Components/FooterPages/FAQPage';
import TermsOfService from './Components/FooterPages/TermsOfService';
import AccessibilityPage from './Components/FooterPages/AccessibilityPage';
import HelpCenter from './Components/FooterPages/HelpCenter';
import AboutUs from './Components/FooterPages/AboutUs';
import TrustAndSafetyPage from './Components/FooterPages/TrustAndSafetyPage';
import GetBookingHistory from './Components/GuestBooking/GetBookingHistory';

function App() {

  return (

    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchListings />} /> 
        <Route path="/listing/:id" element={<ListingDetails />} />

        <Route path="/booking/:hostId/:listingId" element={<Booking />} />

        <Route path="/signUp" element={<SignUpForm />} />
        <Route path="/signIn" element={<SignInnForm />} />

        <Route path="/profile" element={<Profile />} />
 
        <Route path="/guest_notifications" element={<GuestNotifications />} />  
        <Route path="/host_notifications" element={<HostNotifications />} />  

        <Route path="/add-listing" element={<AddListing />} />
        <Route path="/host-listing" element={<HostedListings />} /> 
        <Route path="/update-listing/:id" element={<EditListing />} /> 
        
        <Route path="/reserved-bookings" element={<GuestBookings />} /> 
        <Route path="/reserved-bookings-history" element={<GetBookingHistory />} /> 

        
        <Route path="/host-bookings" element={<HostBookings />} /> 

        
        <Route path="/finalize-booking" element={<FinalizeBooking />} />

        <Route path="/favourite-listings" element={<FavoriteListings />} />
{/*===================*/}
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/term-of-service" element={<TermsOfService />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} /> 
        <Route path="/accessibility" element={<AccessibilityPage />} /> 
        <Route path="/help-center" element={<HelpCenter />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/trust-and-safety" element={<TrustAndSafetyPage />} />
        
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
