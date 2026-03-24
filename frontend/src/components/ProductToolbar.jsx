import { Filter, ChevronDown, Grid, List, RefreshCw } from "lucide-react"
import { Dropdown, Button, Slider, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';

export function ProductToolbar({
    showFilters,
    setShowFilters,
    viewMode,
    setViewMode,
    sortBy,
    setSortBy,
    onReset,
    priceRange,
    setPriceRange
}) {

    const sortItems = [
        { key: "featured", label: "Featured" },
        { key: "price-low", label: "Price: Low to High" },
        { key: "price-high", label: "Price: High to Low" },
        { key: "newest", label: "Newest First" },
    ];

    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center my-6 px-4 max-w-[1400px] mx-auto">
            <div className="flex items-center mb-4 md:mb-0">
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center text-sm font-medium text-gray-700 mr-4"
                >
                    <Filter className="mr-1 h-4 w-4" />
                    Filters
                    <ChevronDown
                        className={`ml-1 h-4 w-4 transition-transform ${showFilters ? "rotate-180" : ""
                            }`}
                    />
                </button>

                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => setViewMode("grid")}
                        className={`p-1.5 rounded ${viewMode === "grid" ? "bg-blue-50" : "bg-gray-50"
                            }`}
                    >
                        <Grid className="h-5 w-5 text-gray-700" />
                    </button>
                    <button
                        onClick={() => setViewMode("list")}
                        className={`p-1.5 rounded ${viewMode === "list" ? "bg-blue-50" : "bg-gray-50"
                            }`}
                    >
                        <List className="h-5 w-5 text-gray-700" />
                    </button>
                </div>
            </div>

            <div className="flex items-center w-full md:w-auto">

                <div className="hidden sm:flex items-center space-x-4 min-w-[250px] whitespace-nowrap mr-10">
                    <span className="text-sm text-gray-500 flex-shrink-0">Price:</span>
                    <Slider
                        range
                        min={0}
                        max={5000}
                        step={100}
                        value={priceRange}
                        onChange={(value) => setPriceRange(value)}
                        className="flex-grow min-w-[100px]"
                    />
                    <span className="text-sm font-medium text-gray-700 flex-shrink-0">
                        ${priceRange[0]} - ${priceRange[1]}
                    </span>
                </div>

                <div className="flex items-center">
                    <div className="text-sm text-gray-500 mr-2">Sort by:</div>

                    <Dropdown
                        menu={{
                            items: sortItems,
                            onClick: ({ key }) => setSortBy(key),
                        }}
                        trigger={["click"]}
                    >
                        <Button className="flex items-center text-sm">
                            {sortItems.find(i => i.key === sortBy)?.label}
                            <DownOutlined className="ml-1" />
                        </Button>
                    </Dropdown>

                    <button
                        onClick={onReset}
                        className="ml-2 flex items-center text-sm text-[#0053A0] hover:underline"
                    >
                        <RefreshCw className="mr-1 h-3 w-3" />
                        Reset
                    </button>
                </div>
            </div>
        </div>
    )
}
