export default function About() {
    return (
        <div className="bg-gray-50 py-12 px-6 sm:px-12 md:px-24">
            <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-4xl font-extrabold text-gray-800 mb-6">About Us</h1>
                <p className="text-lg text-gray-600 mb-8">
                    Welcome to <span className="font-semibold text-green-600">Grocery Store</span>, your trusted source for fresh and quality groceries. We pride ourselves on providing a wide range of products, from everyday essentials to unique finds, all while delivering top-notch customer service.
                </p>
                <div className="flex justify-center space-x-8">
                    <div className="flex flex-col items-center">
                        <h2 className="text-xl font-semibold text-gray-700 mb-2">Our Mission</h2>
                        <p className="text-gray-500">
                            To make shopping for groceries convenient, affordable, and enjoyable while ensuring the highest quality of products for our customers.
                        </p>
                    </div>
                    <div className="flex flex-col items-center">
                        <h2 className="text-xl font-semibold text-gray-700 mb-2">Our Values</h2>
                        <p className="text-gray-500">
                            We believe in integrity, transparency, and sustainability, ensuring that our products meet both your needs and environmental standards.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
