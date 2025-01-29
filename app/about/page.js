export default function About() {
    return (
        <div className="bg-gradient-to-br from-blue-50 to-gray-100 flex flex-col justify-between py-16">
            {/* Content Section */}
            <div className="flex flex-col md:flex-row items-center gap-12 px-6 sm:px-12 md:px-24">
                {/* Image Section */}
                <div className="md:w-1/2">
                    <img
                        src="/bangla-bazar.jpg"
                        alt="Store Image"
                        className="w-full h-auto object-cover rounded-lg shadow-2xl transition-transform duration-300 hover:scale-105"
                    />
                </div>

                {/* Description Section */}
                <div className="md:w-1/2 bg-white/80 backdrop-blur-md p-8 rounded-lg shadow-lg">
                    {/* Title for Description */}
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center md:text-left">
                        About Us
                    </h1>
                    <p className="text-lg text-gray-700 mb-6 leading-relaxed text-center md:text-left">
                        Welcome to <span className="text-blue-600 font-semibold">Bangla Bazar</span>, your destination for
                        authentic Bangladeshi groceries and specialty foods. We bring the rich flavors of Bangladesh to you,
                        offering traditional spices, fresh produce, and unique ingredients.
                    </p>
                    <p className="text-lg text-gray-700 mb-6 leading-relaxed text-center md:text-left">
                        Our high-quality products are sourced from trusted suppliers, ensuring the best for your kitchen.
                        We pride ourselves on excellent customer service, making every visit a great experience.
                    </p>
                </div>
            </div>

            {/* Map Section */}
            <div className="flex flex-col items-center mt-16 px-6 sm:px-12 md:px-24">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                    Our Location
                </h2>
                <div className="w-full max-w-4xl h-[600px] rounded-lg overflow-hidden shadow-lg">
                    <iframe
                        width="100%"
                        height="600"
                        className="rounded-lg"
                        src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=1745%20N%20Broad%20St,%20Lansdale,%20PA%2019446+(Bangla%20Bazar%20Halal%20Meat%20&amp;%20Grocerys%20Name)&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                    >
                    </iframe>
                </div>
            </div>
        </div>
    );
}
