import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import SignupPage from "./components/auth/RegisterForm";
import LoginPage from "./components/auth/LoginForm";
import "./index.css";
import Rooms from "./pages/Rooms";
import Favorites from "./components/listings/Favoritelist";
import FilterSection from "./components/FilterSection";
import ListingForm from "./components/listings/ListingForm";
import { useDispatch } from "react-redux";
import { login, logout } from "./redux/reducers/Auth";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import { Toaster } from "react-hot-toast";
import { useMyprofileQuery } from "./redux/APi/api";
import ForgotPassword from "./components/auth/ForgotPasswordForm";
import ResetPassword from "./components/auth/ResetPasswordForm";
import FAQSection from "./pages/FAQSection";
import MultiStepKYCForm1 from "./components/kyc/MultiStepKYCForm1";
import MultiStepKYCForm2 from "./components/kyc/MultiStepKYCForm2";
import KYC from "./pages/KYC";
import Profile from "./pages/User";
import PaymentPage from "./components/payments/PaymentPage";
import PaymentSuccess from "./components/payments/PaymentSuccess";
import PaymentCancel from "./components/payments/PaymentCancel";
import OTPVerification from "./pages/OTP";
import CreateListing from "./pages/CreateListing";
import RecentListings from "./components/Profile/RecentListings";
import NotificationsPage from "./components/Profile/NotificationPage";
import ChatPage from "./components/Profile/ChatPage";
import ProfileLayout from "./components/Layouts/ProfileLayout";
import ProfileOverview from "./components/Profile/ProfileOverview";
import { ListingFormProvider } from "./context/FormContext";
import RecentBookings from "./components/Profile/RecentBookings";

function App() {
  const dispatch = useDispatch();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const { data, error } = useMyprofileQuery();

  useEffect(() => {
    if (data && data.user) {
      dispatch(login(data.user));
    } else if (error) {
      dispatch(logout());
    }
  }, [data, error, dispatch]);

  return (
    <BrowserRouter>
      <Toaster position="top-left" />
      <div className="relative font-sans">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                showLoginModal={showLoginModal}
                setShowLoginModal={setShowLoginModal}
                showSignupModal={showSignupModal}
                setShowSignupModal={setShowSignupModal}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <SignupPage
                onClose={() => {}}
                setShowLoginModal={setShowLoginModal}
              />
            }
          />
          <Route
            path="/login"
            element={
              <LoginPage
                onClose={() => {}}
                setShowSignupModal={setShowSignupModal}
              />
            }
          />
          {/* nested profile routes */}
          <Route path="/user" element={<ProfileLayout />}>
            <Route index element={<ProfileOverview />} />
            <Route path="listings" element={<RecentListings />} />
            <Route path="bookings" element={<RecentBookings />} />
            <Route
              path="create-listing"
              element={
                <ListingFormProvider>
                  <ListingForm />
                </ListingFormProvider>
              }
            />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="chat" element={<ChatPage />} />
          </Route>

          <Route path="/filtered-listings" element={<FilterSection />} />
          <Route path="/room/:id" element={<Rooms />} />
          <Route path="/favorites/:id" element={<Favorites />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/faq" element={<FAQSection />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/success" element={<PaymentSuccess />} />
          <Route path="/cancel" element={<PaymentCancel />} />
          <Route path="/forget-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/KYC" element={<KYC />} />
          <Route path="/MultiStepKYCForm1" element={<MultiStepKYCForm1 />} />
          <Route path="/MultiStepKYCForm2" element={<MultiStepKYCForm2 />} />
          <Route path="/verify-otp" element={<OTPVerification />} />
        </Routes>

        {/* Modal Overlays */}
        {(showLoginModal || showSignupModal) && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />
        )}

        {showLoginModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <LoginPage
              onClose={() => setShowLoginModal(false)}
              setShowSignupModal={setShowSignupModal}
            />
          </div>
        )}

        {showSignupModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <SignupPage
              onClose={() => setShowSignupModal(false)}
              setShowLoginModal={setShowLoginModal}
            />
          </div>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
