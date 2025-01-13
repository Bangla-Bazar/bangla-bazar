export default function ProductCard({ product }) {
    return (
        <div className="bg-white rounded shadow p-4 flex flex-col ">
            <div className="w-full h-48 overflow-hidden rounded bg-gray-100 items-center">
                <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full h-48 object-contain mb-2 rounded bg-gray-100 center"
                />
            </div>
            <div text-left>
                <h3 className="text-lg font-semibold mt-2">{product.title}</h3>
                <p className="text-gray-600">{product.description}</p>
                <p className="text-gray-500 font-bold">${product.price.toFixed(2)}</p>
            </div>
        </div>
    );
}
