export default function Navbar() {
    return (
        <nav className="bg-primary text-white p-4">
            <div className="container mx-auto flex justify-between">
                <h1 className="text-xl font-bold"><a href="/">Grocery Store</a></h1>
                <ul className="flex gap-4">
                    <li><a href="/">Home</a></li>
                    <li><a href="/product">product</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/faq">FAQ</a></li>
                </ul>
            </div>
        </nav>
    );
}
