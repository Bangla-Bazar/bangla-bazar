'use client';  // Add this directive to mark the component as a client component

import { useState } from "react";

export default function FAQ() {
    const [open, setOpen] = useState(null);

    const toggle = (index) => {
        setOpen(open === index ? null : index);
    };

    const questions = [
        { question: "What is Grocery Store?", answer: "Grocery Store is your trusted source for fresh and quality groceries, offering a wide range of products for everyday needs." },
        { question: "How can I place an order?", answer: "To place an order, simply browse our catalog, select the items you want, and proceed to checkout." },
        { question: "What is your return policy?", answer: "We offer a 30-day return policy for most products. Please check the product page for specific return instructions." },
        { question: "Do you offer delivery?", answer: "Yes, we offer home delivery within selected areas. Check the delivery section for more details." },
    ];

    return (
        <div className="bg-gray-50 py-12 px-6 sm:px-12 md:px-24">
            <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-4xl font-extrabold text-gray-800 mb-6">FAQ</h1>
                <p className="text-lg text-gray-600 mb-8">
                    Find answers to common questions here.
                </p>

                <div className="space-y-6">
                    {questions.map((item, index) => (
                        <div key={index} className="border-b border-gray-200">
                            <button
                                onClick={() => toggle(index)}
                                className="w-full text-left py-4 px-6 bg-white text-lg font-medium text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-600"
                            >
                                {item.question}
                            </button>
                            {open === index && (
                                <div className="px-6 pb-4 text-gray-600 bg-gray-50">
                                    {item.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
