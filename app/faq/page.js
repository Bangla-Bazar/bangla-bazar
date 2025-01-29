// 'use client';  // Add this directive to mark the component as a client component

// import { useState } from "react";

// export default function FAQ() {
//     const [open, setOpen] = useState(null);

//     const toggle = (index) => {
//         setOpen(open === index ? null : index);
//     };

//     const questions = [
//         { question: "What types of meat do you offer at your store?", 
//             answer: "We offer a wide range of halal meat, including beef, chicken, lamb, goat, and specialty meats. All our products are sourced from trusted suppliers and prepared according to halal standards." },
//         { question: "Is all of your meat halal certified?", 
//             answer: "Yes, all the meat sold at our store is halal certified and comes from trusted halal suppliers to ensure it meets the dietary requirements of our Muslim customers." },
//         { question: "Do you carry Bengali spices and grocery items?", 
//             answer: "Yes, we carry a variety of traditional Bengali spices, rice, lentils, and other essential grocery items, along with international products commonly used in Bengali cuisine." },
//         { question: "Are the products at your store organic?", 
//             answer: "While we offer a variety of organic products, not all of our items are certified organic. Please check the labeling for organic certifications." },
//         {question: "Do you offer home delivery for online orders?", 
//             answer: "Currently, we do not offer home delivery for online orders. You can pick up your order in-store during our regular business hours."},
//         { question: "How do I know if the meat is fresh?",
//             answer: "We prioritize freshness and ensure that all our meat is properly stored, regularly rotated, and sourced from reputable suppliers. We also offer a freshness guarantee." },
//         { question: "Can I pre-order halal meat for a special occasion or event?", 
//             answer: "Currently, we do not offer pre-order services for special occasions or events. However, we do our best to accommodate all your needs during regular business hours." },
//         { question: "Are your grocery products suitable for vegetarians?", 
//             answer: "Yes, we offer a range of vegetarian-friendly products, including fresh vegetables, legumes, and vegetarian snacks." },
//         { question: "What should I do if I'm not satisfied with my purchase?", 
//             answer: "We strive for customer satisfaction. If you are not happy with your purchase, please contact us within 7 days, and we will assist with returns or exchanges." },
//         { question: "Do you have frozen halal meat options available?", 
//             answer: "Yes, we carry a selection of frozen halal meats for customers who prefer them. These products are stored in optimal conditions to maintain freshness." },
//         { question: "Can I pay using my credit/debit card?", 
//             answer: "Yes, we accept a variety of payment methods including credit and debit cards, as well as mobile payment options." },
//         { question: "What is our return policy?", 
//             answer: "We offer a 30-day return policy for most products. Product must not be damaged. Please check the product page for specific return instructions." },
//     ];

//     return (
//         <div className="bg-gray-50 py-12 px-6 sm:px-12 md:px-24">
//             <div className="max-w-3xl mx-auto text-center">
//                 <h1 className="text-4xl font-extrabold text-gray-800 mb-6">FAQ</h1>
//                 <p className="text-lg text-gray-600 mb-8">
//                     Find answers to common questions here.
//                 </p>

//                 <div className="space-y-6">
//                     {questions.map((item, index) => (
//                         <div key={index} className="border-b border-gray-200">
//                             <button
//                                 onClick={() => toggle(index)}
//                                 className="w-full text-left py-4 px-6 bg-white text-lg font-medium text-gray-800 hover:bg-gray-100 focus:outline-none"
//                             >
//                                 {item.question}
//                             </button>
//                             {open === index && (
//                                 <div className="px-6 pb-4 text-left text-gray-600 bg-gray-50 mt-2 mb-6">  {/* Added mt-2 and mb-6 for spacing */}
//                                     {item.answer}
//                                 </div>
//                             )}
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// }

'use client';  // Add this directive to mark the component as a client component

import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi"; // Import icons for dropdown animation

export default function FAQ() {
    const [open, setOpen] = useState(null);

    const toggle = (index) => {
        setOpen(open === index ? null : index);
    };

    const questions = [
        {
            question: "What types of meat do you offer at your store?",
            answer: "We offer a wide range of halal meat, including beef, chicken, lamb, goat, and specialty meats. All our products are sourced from trusted suppliers and prepared according to halal standards."
        },
        {
            question: "Is all of your meat halal certified?",
            answer: "Yes, all the meat sold at our store is halal certified and comes from trusted halal suppliers to ensure it meets the dietary requirements of our Muslim customers."
        },
        {
            question: "Do you carry Bengali spices and grocery items?",
            answer: "Yes, we carry a variety of traditional Bengali spices, rice, lentils, and other essential grocery items, along with international products commonly used in Bengali cuisine."
        },
        {
            question: "Are the products at your store organic?",
            answer: "While we offer a variety of organic products, not all of our items are certified organic. Please check the labeling for organic certifications."
        },
        {
            question: "Do you offer home delivery for online orders?",
            answer: "Currently, we do not offer home delivery for online orders. You can pick up your order in-store during our regular business hours."
        },
        {
            question: "How do I know if the meat is fresh?",
            answer: "We prioritize freshness and ensure that all our meat is properly stored, regularly rotated, and sourced from reputable suppliers. We also offer a freshness guarantee."
        },
        {
            question: "Can I pre-order halal meat for a special occasion or event?",
            answer: "Currently, we do not offer pre-order services for special occasions or events. However, we do our best to accommodate all your needs during regular business hours."
        },
        {
            question: "Are your grocery products suitable for vegetarians?",
            answer: "Yes, we offer a range of vegetarian-friendly products, including fresh vegetables, legumes, and vegetarian snacks."
        },
        {
            question: "What should I do if I'm not satisfied with my purchase?",
            answer: "We strive for customer satisfaction. If you are not happy with your purchase, please contact us within 7 days, and we will assist with returns or exchanges."
        },
        {
            question: "Do you have frozen halal meat options available?",
            answer: "Yes, we carry a selection of frozen halal meats for customers who prefer them. These products are stored in optimal conditions to maintain freshness."
        },
        {
            question: "Can I pay using my credit/debit card?",
            answer: "Yes, we accept a variety of payment methods including credit and debit cards, as well as mobile payment options."
        },
        {
            question: "What is our return policy?",
            answer: "We offer a 30-day return policy for most products. Product must not be damaged. Please check the product page for specific return instructions."
        },
    ];

    return (
        <div className="bg-gradient-to-br from-blue-50 to-gray-100 py-16 px-6 sm:px-12 md:px-24">
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Frequently Asked Questions</h1>
                <p className="text-lg text-gray-600 mb-8">
                    Find answers to common questions here.
                </p>

                <div className="space-y-6">
                    {questions.map((item, index) => (
                        <div key={index} className="bg-white/80 backdrop-blur-md rounded-lg shadow-md overflow-hidden transition-all">
                            <button
                                onClick={() => toggle(index)}
                                className="w-full flex justify-between items-center py-4 px-6 text-lg font-medium text-gray-800 bg-white hover:bg-gray-100 focus:outline-none transition-all"
                            >
                                {item.question}
                                {open === index ? (
                                    <FiChevronUp className="text-gray-600 text-xl transition-transform transform rotate-180" />
                                ) : (
                                    <FiChevronDown className="text-gray-600 text-xl transition-transform transform" />
                                )}
                            </button>
                            <div
                                className={`px-6 pb-4 text-left text-gray-600 bg-gray-50 transition-all duration-300 overflow-hidden ${open === index ? "max-h-40 opacity-100 py-3" : "max-h-0 opacity-0 py-0"
                                    }`}
                            >
                                {item.answer}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
