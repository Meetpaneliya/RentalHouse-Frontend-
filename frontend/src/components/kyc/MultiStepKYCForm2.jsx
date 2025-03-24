import React, { useState } from 'react';
import axios from '../../lib/axios';
import Navbar from '../Navbar2';

const MultiStepKYCForm2 = () => {
  const [verificationType, setVerificationType] = useState('');
  const [ssn, setSSN] = useState('');
  const [passportNumber, setPassportNumber] = useState('');
  const [passportDoc, setPassportDoc] = useState(null);
  const [visaDoc, setVisaDoc] = useState(null);
  const [kycExists, setKYCExists] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerificationSelect = (e) => {
    setVerificationType(e.target.value);
    setMessage('');
  };

  const handleSubmit = async () => {
    if (kycExists) {
      setMessage('You have already submitted KYC.');
      return;
    }
    try {
      setLoading(true);
      let response;
      if (verificationType === 'ssn') {
        if (!ssn) {
          setMessage('Please enter your SSN');
          setLoading(false);
          return;
        }
        const body = { verificationType: 'ssn', ssn };
        response = await axios.post('/api/v1/kyc/application', body);
      } else if (verificationType === 'passport') {
        if (!passportNumber || !passportDoc || !visaDoc) {
          setMessage('Please fill all Passport fields and upload documents');
          setLoading(false);
          return;
        }
        const formData = new FormData();
        formData.append('verificationType', 'passport');
        formData.append('passportNumber', passportNumber);
        formData.append('passportDoc', passportDoc);
        formData.append('visaDoc', visaDoc);
        response = await axios.post('/api/v1/kyc/application', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      if (response.data.success) {
        setMessage('KYC submitted successfully');
        setKYCExists(true);
      }
    } catch (err) {
      console.error('KYC submission error:', err);
      if (err.response?.data?.message) {
        setMessage(err.response.data.message);
      } else {
        setMessage('Submission failed. Please ensure you are logged in and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Navbar/>
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-xl p-8">
      <div className="flex justify-between items-center mb-4 border border-gray-300 rounded-lg p-4 bg-gray-50">
        <span className="bg-black text-white text-sm rounded-full px-4 py-2">Section 2 of 3</span>
        <span className="text-gray-500 text-sm">Almost done!</span>
      </div>

      <h2 className="text-xl font-semibold mb-6 text-gray-800">Personal Information</h2>

      {message && (
  <p
    className={`mb-4 ${
      message.toLowerCase().includes('already')
        ? 'text-red-600'
        : 'text-green-600'
    }`}
  >
    {message}
  </p>
)}

      <div>
        {/* Step 1 */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Select Verification Type</label>
          <select
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={verificationType}
            onChange={handleVerificationSelect}
            disabled={loading || kycExists}
          >
            <option value="">-- Select --</option>
            <option value="ssn">SSN</option>
            <option value="passport">Passport</option>
          </select>
        </div>

        {/* SSN Form */}
        {verificationType === 'ssn' && (
          <>
            <label className="block text-gray-700 mb-2">Enter your U.S. social security number:</label>
            <input
              type="text"
              placeholder="XXX XXX XXXX"
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={ssn}
              onChange={(e) => setSSN(e.target.value)}
              disabled={loading || kycExists}
            />
            <button
              className={`mt-4 w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 ${
                loading || kycExists ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={handleSubmit}
              disabled={loading || kycExists}
            >
              {loading ? 'Submitting...' : 'Submit KYC'}
            </button>
            <div   onClick={() => setVerificationType('passport')}
               className="text-sm mt-3 text-center text-blue-600 cursor-pointer hover:underline">
              Don't have an S.S.N?
            </div>
          </>
        )}

        {/* Passport Form - All Fields in One Step */}
        {verificationType === 'passport' && (
          <>
            <label className="block text-gray-700 mb-2">Passport Number</label>
            <input
              type="text"
              className="w-full border border-gray-300 p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={passportNumber}
              onChange={(e) => setPassportNumber(e.target.value)}
              disabled={loading || kycExists}
            />

            <label className="block text-gray-700 mb-2">Upload Passport Document</label>
            <input
              type="file"
              accept="image/*,.pdf"
              className="w-full border border-gray-300 p-3 rounded mb-4"
              onChange={(e) => setPassportDoc(e.target.files[0])}
              disabled={loading || kycExists}
            />

            <label className="block text-gray-700 mb-2">Upload Visa Document</label>
            <input
              type="file"
              accept="image/*,.pdf"
              className="w-full border border-gray-300 p-3 rounded mb-4"
              onChange={(e) => setVisaDoc(e.target.files[0])}
              disabled={loading || kycExists}
            />

            <button
              className={`w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 ${
                loading || kycExists ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={handleSubmit}
              disabled={loading || kycExists}
            >
              {loading ? 'Submitting...' : 'Submit KYC'}
            </button>
          </>
        )}
      </div>

      <p className="text-xs text-gray-500 mt-6 text-center">
        We will never sell, rent, or trade your personal information. Read more in our{' '}
        <span className="text-blue-600 hover:underline cursor-pointer">privacy policy</span>.
      </p>
    </div>
    </>
  );
};

export default MultiStepKYCForm2;
