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
                    <p className="text-lg text-center text-gray-700 mb-8">
                        Welcome to Bangla Bazar, your go-to destination for authentic Bangladeshi groceries and specialty foods. At Bangla Bazar, we bring the rich flavors of Bangladesh directly to you. Whether you're looking for traditional spices, fresh produce, or unique ingredients for your meals, we have it all. We are committed to offering a variety of high-quality products, sourced from trusted suppliers to ensure the best quality.
                        We take pride in providing excellent customer service, making every visit to Bangla Bazar a great experience. Whether you’re preparing a family meal or exploring new recipes, we have everything you need to complete your kitchen.
                        Thank you for choosing Bangla Bazar, where you can find both tradition and quality in one place.
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
