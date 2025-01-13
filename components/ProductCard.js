export default function ProductCard({ product }) {
    return (
        <div className="bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl p-6 flex flex-col">
            {/* Image Section */}
            <div className="w-full h-60 overflow-hidden rounded-md bg-gradient-to-r from-blue-50 to-blue-100 flex items-center justify-center">
                <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full h-full object-contain"
                />
            </div>

            {/* Content Section */}
            <div className="mt-6 text-left">
                {/* Title and Temporary Info */}
                <div className="grid grid-cols-2 items-center">
                    <h3 className="text-xl font-bold text-gray-800">{product.title}</h3>

                    {product.isTemporary && product.lastDate && (
                        <div className="flex flex-col items-end">
                            <span className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded-full shadow-sm">
                                Temporary
                            </span>
                            <span className="text-sm text-gray-600 mt-1">Until {product.lastDate}</span>
                        </div>
                    )}
                </div>

                {/* Tags */}
                {product.tags && product.tags.length > 0 && (
                    <div className="mt-4">
                        <div className="flex flex-wrap gap-2 mt-2">
                            {product.tags.slice(0, 3).map((tag, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 text-sm bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 rounded-full shadow-sm"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
