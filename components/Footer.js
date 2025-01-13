import { BanglaBazar, PAGES } from "@/utils/globals_constants";
import Image from "next/image";
import { FaPhoneAlt, FaMapMarkerAlt, FaClock, FaFacebook, FaInstagram, FaGlobe } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-white text-black py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Top Section */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-black">
                    {/* Store Info */}
                    <div className="text-black">
                        <h2 className="text-lg font-bold text-black">{BanglaBazar.FULLNAME}</h2>
                        <p className="mt-2 text-sm flex items-center">
                            <FaMapMarkerAlt className="mr-2 text-black" />
                            {BanglaBazar.ADDRESS}
                        </p>
                        <p className="mt-1 text-sm flex items-center">
                            <FaPhoneAlt className="mr-2 text-black-400" />
                            <a href={`tel:${BanglaBazar.PHONE}`} className="text-black-400">{BanglaBazar.PHONE}</a>
                        </p>
                        <p className="mt-1 text-sm flex items-center">
                            <FaClock className="mr-2 text-black" />
                            Open Daily: {BanglaBazar.HOURS.SUNDAY}
                        </p>
                    </div>

                    {/* Highlights */}
                    <div>
                        <h3 className="text-lg font-bold ">Highlights</h3>
                        <ul className="mt-2 space-y-2">
                            {BanglaBazar.HIGHLIGHTS.map((highlight, index) => (
                                <li key={index} className="flex items-center">
                                    <span className="text-black mr-2">✔</span> {highlight}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold">Follow Us</h3>
                        <ul className="mt-2 space-y-2">
                            {PAGES.map((page) => (
                                <li key={page.name} className="flex items-center">
                                    <FaGlobe className="mr-2 " />
                                    <a href={page.path} className=" hover:text-gray-400">
                                        {page.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h3 className="text-lg font-bold">Follow Us</h3>
                        <div className="mt-4 flex space-x-4">
                            <a href="#" className=" hover:text-gray-400" aria-label="Website">
                                <FaGlobe size={20} />
                            </a>
                            <a href="#" className=" hover:text-gray-400" aria-label="Facebook">
                                <FaFacebook size={20} />
                            </a>
                            <a href="#" className=" hover:text-gray-400" aria-label="Instagram">
                                <FaInstagram size={20} />
                            </a>
                        </div>
                        <div className="mt-4 ">
                            <Image src="/HALAL-Logo.png" alt="Halal-logo" width={100} height={100} />
                        </div>
                    </div>
                </div>


                {/* Footer Bottom */}
                <div className="flex flex-col sm:flex-row justify-between items-center mt-6">
                    <p className="text-sm">
                        &copy; {new Date().getFullYear()} {BanglaBazar.NAME}. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
