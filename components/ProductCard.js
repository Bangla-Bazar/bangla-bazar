

export default function ProductCard({ product }) {
    return (
        <div className="bg-white rounded-xl shadow-md transition-transform transform hover:scale-105 hover:shadow-xl p-6 flex flex-col border border-gray-200">
            {/* Image Section */}
            <div className="w-full h-64 overflow-hidden rounded-md bg-gradient-to-r from-blue-50 to-blue-100 flex items-center justify-center relative">
                <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full h-full object-cover rounded-lg transition-opacity duration-300 hover:opacity-90"
                />
                {product.isTemporary && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-3 py-1 rounded-full shadow-md">
                        Limited Time
                    </span>
                )}
            </div>

            {/* Content Section */}
            <div className="mt-6 text-left flex flex-col gap-3">
                {/* Title and Date */}
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-gray-900">{product.title}</h3>
                    {product.isTemporary && product.lastDate && (
                        <span className="text-sm text-gray-500">Ends {product.lastDate}</span>
                    )}
                </div>
                {/* Tags */}
                {product.tags && product.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                        {product.tags.slice(0, 3).map((tag, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 text-sm bg-gradient-to-r from-blue-100 to-blue-300 text-blue-800 rounded-full shadow-md"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
}
