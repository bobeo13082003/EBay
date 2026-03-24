export function PromoBanner() {
    return (
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 py-12">
            <div className="mx-auto max-w-[1400px] px-4">
                <div className="flex items-center justify-between">
                    <div className="max-w-xl">
                        <h2 className="mb-3 text-3xl font-bold text-white">
                            Get an extra 20% off
                        </h2>
                        <p className="mb-6 text-lg text-white/90">
                            Plus, free shipping on orders over $50. Limited time offer on
                            select items.
                        </p>
                        <button className="rounded-md bg-white px-8 py-3 font-semibold text-purple-600 hover:bg-gray-100">
                            Shop the sale
                        </button>
                    </div>
                    <div className="hidden lg:block">
                        <img
                            src="https://images.unsplash.com/photo-1607082349566-187342175e2f?w=400&h=300&fit=crop"
                            alt="Promo banner"
                            className="h-[250px] w-[400px] rounded-lg object-cover"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
