import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import Navbar from "../components/Navbar2";
import Footer from "../components/Footer";

const faqs = [
  {
    question: "Why should I rent with Cozzi Roam?",
    answer: `Ready, set, rent! Cozzi Roam is the simplest, fastest way to rent a home.

    Here’s why renters are choosing Cozzi Roam:
    • Flexible leases:  Enjoy lease terms that range from 1 to 18 months, allowing you to extend your lease at any time without hassle.
    • Furnished or unfurnished spaces:  You get the choice of renting a fully furnished home or bringing your own furniture.
    • Shared or entire homes:  Choose between co-living with roommates or renting the entire space for yourself.
    • Quick move-in:  No long waits! Browse, apply, and move in within a matter of hours.
    • 24/7 support & services:  Our Resident Portal provides seamless maintenance requests, support, and communication.`
  },
  {
    question: "How do I Become a Cozzi Roam resident?",
    answer: `Becoming a Cozzi Roam resident is easy and convenient! Here's how it works:
    • Browse Listings:  Explore our available homes in your preferred city.
    • Apply Online:  Fill out our secure application form and upload necessary documents.
    • Verification & Approval:  Our team will review your application and verify details.
    • Sign Your Lease:  Once approved, sign the lease agreement digitally.
    • Move-In Ready:  Get your keys and move in hassle-free!`
  },
  {
    question: "What cities is Cozzi Roam available in?",
    answer: `Cozzi Roam is expanding rapidly! We currently provide rental solutions in several major cities including:
    •  New York City 
    •  San Francisco 
    •  Los Angeles 
    •  Boston 
    •  Chicago 
    •  Washington, D.C. 
    
    And many more! Check our website for the latest city updates.`
  },
  {
    question: "Does Cozzi Roam offer co-living?",
    answer: `Yes, absolutely! Co-living is one of our most popular options. Here's why people love it:
    • Affordability:  Rent a shared space at a lower price instead of paying full rent for an entire unit.
    • Fully Furnished:  Co-living spaces come with all the necessary furniture and utilities included.
    • Community Experience:  Live with like-minded individuals and enjoy a social living environment.
    • Flexible Leasing:  Whether you need a short-term or long-term stay, we have flexible options for you!`
  },
  {
    question: "Is Cozzi Roam a hotel?",
    answer: `No, Cozzi Roam is  not a hotel . We provide  long-term and short-term rentals  that offer a home-like experience. 
    Unlike hotels:
    • Our properties are  fully equipped apartments  designed for comfortable everyday living.
    • You can  rent for months instead of nights , making it ideal for professionals, students, and travelers.
    • We provide  co-living options  and private residences with a seamless rental experience.
    
    Think of us as the  modern solution for hassle-free renting! `
  }
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-8xl font-bold text-center text-indigo-900 mb-12">FAQ</h1>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`rounded-xl shadow-md border border-gray-300 transition-all ${
                openIndex === index ? "bg-gray-50" : "bg-white"
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center text-left px-6 py-5 text-indigo-900 font-semibold text-lg focus:outline-none"
              >
                {faq.question}
                {openIndex === index ? <FaMinus /> : <FaPlus />}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6 text-gray-700 text-[15px] leading-relaxed whitespace-pre-line">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FAQSection;
