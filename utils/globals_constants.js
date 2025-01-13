const BanglaBazar = {
    FULLNAME: "Bangla Bazar Halal Meat & Grocery",
    NAME: "Bangla Bazar",
    TYPE: "Small business, Grocery store",
    HIGHLIGHTS: [
        "Accepts SNAP/EBT",
        "Accepts credit cards",
        "Accepts debit cards"
    ],
    ADDRESS: "1745 N Broad St, Lansdale, PA 19446",
    PHONE: "(215) 393-8000",
    HOURS: {
        SUNDAY: "10 AM - 10 PM",
        MONDAY: "10 AM _ 10 PM",
        TUESDAY: "10 AM - 10 PM",
        WEDNESDAY: "10 AM - 10 PM",
        THURSDAY: "10 AM - 10 PM",
        FRIDAY: "10 AM - 10 PM",
        SATURDAY: "10 AM - 10 PM"
    }
};


const PAGES = [
    {
        name: "Home",
        path: "/",
        description: "Welcome to Bangla Bazar Halal Meat & Grocery, your trusted store for quality halal products.",
    },
    {
        name: "Product",
        path: "/product",
        description: "Explore our wide range of halal meat, groceries, and specialty products.",
    },
    {
        name: "About Us",
        path: "/about",
        description: "Learn more about Bangla Bazar, our mission, and our commitment to providing the best service.",
    },
    {
        name: "FAQ",
        path: "/faq",
        description: "Find answers to commonly asked questions about our store and services.",
    },
    {
        name: "Admin",
        path: "/admin",
        description: "Access the admin dashboard to manage products, orders, and other store settings.",
    }
];

export { BanglaBazar, PAGES };
