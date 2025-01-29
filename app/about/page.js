export default function About() {
    return (
        <div className="bg-50 flex flex-col justify-between">
            {/* Content Section */}
            <div className="flex flex-col md:flex-row items-center gap-8 px-6 sm:px-12 md:px-24 mb-12">
                {/* Description Section */}
                <div className="md:w-1/2 text-center md:text-left">
                    {/* Title for Description */}
                    <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                        About Us
                    </h1>
                    <p className="text-lg text-center text-gray-700 mb-8 leading-[3]">
                    Welcome to Bangla Bazar, your destination for authentic Bangladeshi groceries and specialty foods. 
                    We bring the rich flavors of Bangladesh to you, offering traditional spices, fresh produce, and unique ingredients. 
                    Our high-quality products are sourced from trusted suppliers, ensuring the best for your kitchen. 
                    We pride ourselves on excellent customer service, making every visit a great experience. 
                    Thank you for choosing Bangla Bazar, where tradition meets quality.
                    </p>
                </div>
                {/* Image Section */}
                <div className="md:w-1/2">
                    <img
                        src="/bangla-bazar.jpg"
                        alt="Store Image"
                        className="w-full h-auto object-cover rounded-lg shadow-xl"
                    />
                </div>
            </div>
        </div>
    );
}
