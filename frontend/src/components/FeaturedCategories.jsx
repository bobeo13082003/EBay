export function FeaturedCategories({ categories = [], categoryImages = {}, onSelectCategory, selectedCategory }) {
    return (
        <div className="bg-white py-3">
            <div className="mx-auto max-w-[1400px] px-4">
                <h2 className="mb-6 text-2xl font-bold text-gray-900">
                    Explore Popular Categories
                </h2>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] place-items-center">
                    <button
                        onClick={() => onSelectCategory && onSelectCategory(null)}
                        className={`group flex flex-col items-center gap-3 rounded-lg p-4 transition-colors ${selectedCategory === null ? 'ring-2 ring-gray-50 bg-blue-50' : 'hover:bg-gray-100'}`}
                    >
                        <div
                            className="flex h-36 w-36 items-center justify-center rounded-full bg-gray-100 overflow-hidden"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=500&h=500&fit=crop"
                                alt="All Categories"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <span
                            className={`text-base font-semibold ${!selectedCategory
                                ? "text-blue-600"
                                : "text-gray-700"
                                }`}
                        >
                            All Categories
                        </span>
                    </button>
                    {categories.map((category) => (
                        <button
                            key={category._id || category.name}
                            onClick={() => onSelectCategory && onSelectCategory(category._id)}
                            className={`group flex flex-col items-center gap-3 rounded-lg p-4 transition-colors ${selectedCategory === category._id ? 'ring-2 ring-gray-50 bg-blue-50' : 'hover:bg-gray-100'}`}
                        >
                            <div className="flex h-36 w-36 items-center justify-center rounded-full bg-gray-100 overflow-hidden">
                                {categoryImages[category.name] ? (
                                    <img src={categoryImages[category.name]} alt={category.name} className="h-full w-full object-cover" />
                                ) : (
                                    <div className="h-full w-full bg-gray-200"></div>
                                )}
                            </div>
                            <span
                                className={`text-base font-semibold ${selectedCategory === category._id
                                    ? "text-blue-600"
                                    : "text-gray-700"
                                    }`}
                            >
                                {category.name}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}
