export function ProductSpecs({ description, specifications }) {
    return (
        <div className="space-y-8">
            {/* About This Item */}
            <div>
                <h2 className="mb-4 text-xl font-bold text-gray-900">
                    About this item
                </h2>
                <div className="rounded-lg border border-gray-200 bg-white p-6">
                    <p className="whitespace-pre-line text-sm leading-relaxed text-gray-700">
                        {description}
                    </p>
                </div>
            </div>

            {/* Item Specifics */}
            <div>
                <h2 className="mb-4 text-xl font-bold text-gray-900">Item specifics</h2>
                <div className="rounded-lg border border-gray-200 bg-white">
                    <div className="grid grid-cols-1 divide-y divide-gray-200">
                        {specifications.map((spec, index) => (
                            <div
                                key={index}
                                className={`grid grid-cols-3 gap-4 p-4 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                    }`}
                            >
                                <span className="font-semibold text-gray-900">
                                    {spec.label}:
                                </span>
                                <span className="col-span-2 text-gray-700">{spec.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
