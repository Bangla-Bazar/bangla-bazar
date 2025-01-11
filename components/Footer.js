export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-8 mt-auto">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    {/* Brand Section */}
                    <div className="mb-4 md:mb-0">
                        <h1 className="text-2xl font-bold">Grocery Store</h1>
                        <p className="text-gray-400 text-sm">
                            Fresh groceries delivered to your door.
                        </p>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex space-x-6 mb-4 md:mb-0">
                        <a
                            href="/about"
                            className="hover:text-gray-400 transition"
                        >
                            About
                        </a>
                        <a href="/faq" className="hover:text-gray-400 transition">
                            FAQ
                        </a>
                    </div>

                    {/* Social Media Icons */}
                    <div className="flex space-x-4">
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-gray-200 transition"
                        >
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-gray-200 transition"
                        >
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-gray-200 transition"
                        >
                            <i className="fab fa-instagram"></i>
                        </a>
                    </div>
                </div>

                {/* Copyright Section */}
                <div className="mt-6 text-center text-gray-400 text-sm">
                    © {new Date().getFullYear()} Grocery Store. All rights
                    reserved.
                </div>
            </div>
        </footer>
    );
}
