import { Link } from "react-router-dom";

export function ProductSpecs({ description, categoryName, categoryDescription, updateDate, productId }) {

    const formatToPST = (isoString) => {
        if (!isoString) return "";

        const date = new Date(isoString);

        const formatter = new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
            timeZone: "America/Los_Angeles",
            timeZoneName: "short",
        });

        const parts = formatter.formatToParts(date);

        const get = (type) => parts.find(p => p.type === type)?.value || "";

        return `${get("month")} ${get("day")}, ${get("year")} ${get("hour")}:${get("minute")}:${get("second")} ${get("timeZoneName")}`;
    }

    return (
        <div className="space-y-4">
            <h2 className="mb-4 text-lg font-bold text-blue-600">
                About this item
            </h2>
            <div className="rounded-lg border border-gray-200 bg-white p-6">
                <div className="flex flex-row justify-between mb-10">
                    <div>
                        <p className="whitespace-pre-line text-sm leading-relaxed text-gray-700">
                            Seller assumes all responsibility for this listing.
                        </p>
                        {updateDate && (
                            <p className="whitespace-pre-line text-sm leading-relaxed text-gray-700">
                                Last updated on {formatToPST(updateDate)}
                            </p>
                        )}
                    </div>
                    <div>
                        <p className="whitespace-pre-line text-base leading-relaxed text-gray-700">
                            eBay item number: {productId}
                        </p>
                    </div>
                </div>

                {/* Item specifics */}
                <div>
                    <h2 className="mb-6 text-2xl font-bold text-gray-900">
                        Item specifics
                    </h2>

                    <div className="space-y-4">
                        <div className="flex">
                            <span className="w-48 text-gray-500">Description</span>
                            <span className="text-gray-900">{description}</span>
                        </div>

                        <div className="flex">
                            <span className="w-48 text-gray-500">Category</span>
                            <Link to="/">
                                <span className="text-gray-900 underline cursor-pointer">
                                    {categoryName} - {categoryDescription}
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
